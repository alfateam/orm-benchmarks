interface ConnectionParameters {
    server?: string;
    database?: string;
    trusted_connection?: string;
    uid?: string;
    pwd?: string;
    trustservercertificate?: string;
    [key: string]: string | undefined; // To allow additional parameters not explicitly defined
}

function extractParameters(connectionString: string): ConnectionParameters {
    // Split the connection string by semicolon to get each key-value pair
    const pairs = connectionString.split(';');

    // Initialize an object to store the extracted parameters
    const parameters: ConnectionParameters = {};

    // Iterate over each pair
    pairs.forEach(pair => {
        // Split each pair by the first '=' character to separate the key and value
        const [key, ...valueParts] = pair.split('=');
        // Join the value parts back in case the value contains '=' character
        const value = valueParts.join('=');

        // Trim whitespace and add to the parameters object with lowercase keys
        if (key && value) {
            parameters[key.trim().toLowerCase()] = value.trim();
        }
    });

    return parameters;
}

export default extractParameters;