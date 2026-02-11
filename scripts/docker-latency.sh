#!/usr/bin/env bash
set -euo pipefail

ACTION="${1:-}"
CONTAINER="${2:-}"
VALUE="${3:-}"
IFACE="${4:-eth0}"

usage() {
  cat <<'EOF'
Usage:
  scripts/docker-latency.sh set <container> <none|low|medium|high|ms> [iface]
  scripts/docker-latency.sh clear <container> [iface]
  scripts/docker-latency.sh show <container> [iface]

Examples:
  scripts/docker-latency.sh set my_pg medium
  scripts/docker-latency.sh set my_mysql 35
  scripts/docker-latency.sh clear my_mssql
  scripts/docker-latency.sh show my_pg
EOF
}

fail() {
  echo "Error: $*" >&2
  exit 1
}

require_running_container() {
  local running
  running="$(docker inspect -f '{{.State.Running}}' "$CONTAINER" 2>/dev/null || true)"
  [[ "$running" == "true" ]] || fail "Container '$CONTAINER' is not running."
}

level_to_ms() {
  case "$1" in
    none) echo 0 ;;
    low) echo 5 ;;
    medium) echo 20 ;;
    high) echo 75 ;;
    *)
      if [[ "$1" =~ ^[0-9]+$ ]]; then
        echo "$1"
      else
        fail "Invalid latency value '$1'. Use none|low|medium|high or an integer ms."
      fi
      ;;
  esac
}

has_tc() {
  docker exec -u 0 "$CONTAINER" sh -lc 'command -v tc >/dev/null 2>&1'
}

install_tc() {
  docker exec -u 0 "$CONTAINER" sh -lc '
set -e
if command -v tc >/dev/null 2>&1; then
  exit 0
fi
if command -v apt-get >/dev/null 2>&1; then
  apt-get update >/dev/null
  DEBIAN_FRONTEND=noninteractive apt-get install -y iproute2 >/dev/null
elif command -v apk >/dev/null 2>&1; then
  apk add --no-cache iproute2 >/dev/null
elif command -v microdnf >/dev/null 2>&1; then
  microdnf install -y iproute >/dev/null
elif command -v yum >/dev/null 2>&1; then
  yum install -y iproute >/dev/null
else
  echo "No supported package manager found for installing tc" >&2
  exit 1
fi
'
}

set_latency() {
  local ms
  ms="$(level_to_ms "$VALUE")"
  if [[ "$ms" -eq 0 ]]; then
    clear_latency
    return
  fi

  if ! has_tc; then
    install_tc
  fi

  docker exec -u 0 "$CONTAINER" sh -lc "tc qdisc replace dev $IFACE root netem delay ${ms}ms"
  echo "Applied ${ms}ms latency on $CONTAINER ($IFACE)."
}

clear_latency() {
  if has_tc; then
    docker exec -u 0 "$CONTAINER" sh -lc "tc qdisc del dev $IFACE root >/dev/null 2>&1 || true"
  fi
  echo "Cleared latency on $CONTAINER ($IFACE)."
}

show_latency() {
  if has_tc; then
    docker exec -u 0 "$CONTAINER" sh -lc "tc qdisc show dev $IFACE"
  else
    echo "tc not installed in $CONTAINER. No qdisc information available."
  fi
}

[[ -n "$ACTION" && -n "$CONTAINER" ]] || { usage; exit 1; }
require_running_container

case "$ACTION" in
  set)
    [[ -n "$VALUE" ]] || fail "Missing latency value for 'set'."
    set_latency
    ;;
  clear)
    clear_latency
    ;;
  show)
    show_latency
    ;;
  *)
    usage
    exit 1
    ;;
esac
