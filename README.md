# ORM Benchmarks comparing Orange ORM and Drizzle ORM

# Project Setup with SQL Server and Remote Containers in VS Code

This guide explains how to run the project with SQL Server using the Remote - Containers extension in Visual Studio Code.

## Prerequisites

- Docker must be installed on your machine.
- Visual Studio Code (VS Code) must be installed.
- The Remote - Containers extension should be installed in VS Code.

## Setup

Ensure your project directory contains the `docker-compose.yml` and `devcontainer.json` files.

## Steps to Run

The github action will always run remotely on push.  
But you can also run it locally with the following steps:  

1. **Start Docker**: Make sure Docker is running on your machine.

2. **Open Project in VS Code**:
   - Open your project folder in VS Code.

3. **Reopen in Container**:
   - Press `F1` to open the command palette.
   - Type and select "Remote-Containers: Reopen in Container".
   - VS Code will build the container based on your configuration files. This may take a few minutes.

4. **Running benchmarks**:
   - Develop within the container. All defined extensions and settings in `devcontainer.json` will be available.
   - Run ```npm install```
   - Run ```npm run init``` to init database 
   - Run ```npm run drizzle```
   - Run ```npm run orange```

## Note

Always use the "Reopen in Container" option in VS Code to work within the Docker container environment for consistency and reproducibility.

Happy Testing!