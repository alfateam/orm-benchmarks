interface ConnectionParameters {
    host?: string;
    port?: string;
    database?: string;
    user?: string;
    password?: string;
    connectionLimit?: string;
    [key: string]: string | undefined; // Allow additional params
}

function extractParameters(connectionString: string): ConnectionParameters {
    if (!connectionString.startsWith("mysql://")) {
        throw new Error("Invalid MySQL connection string: must start with mysql://");
    }

    const url = new URL(connectionString);

    const parameters: ConnectionParameters = {
        host: url.hostname,
        port: url.port || "3306",
        database: url.pathname ? url.pathname.replace(/^\//, "") : undefined,
        user: url.username || undefined,
        password: url.password || undefined,
    };

    // Parse query parameters (e.g., ?connectionLimit=10)
    url.searchParams.forEach((value, key) => {
        parameters[key] = value;
    });

    return parameters;
}

export default extractParameters;
