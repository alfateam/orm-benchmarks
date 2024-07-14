declare namespace NodeJS {
    interface ProcessEnv {
      ITERATIONS: string;
      ROUNDS: string;
      POOLSIZE: string;
      POSTGRES_URL: string;
      MYSQL_URL: string;
    }
  }
  