# Benchmarks for Orange, Drizzle, Prisma and MikroORM
The numbers are from the latest run on Node 22.16.0 on Windows 11 Business.
The computer was 11th Gen Intel(R) Core(TM) i7-1185G7 @ 3.00GHz.   
The CPU had 4 physical cores, and each core supports 2 threads, making a total of 8 logical processors. 
## Results  

| **SQLite** | Pool size = 1 |
|----------|------|
| Prisma | 22.363 s |
| Orange | 28.046 s |
| Drizzle | 29.625 s |
| Mikro | 2:10.166 min |

| **PostgreSQL** | Pool size = 1 |
|----------|------|
| Prisma | 27.660 s |
| Orange | 29.159 s |
| Drizzle | 50.432 s |
| Mikro | 3:07.183 min |

| **PostgreSQL** | Pool size = 10 |
|----------|------|
| Prisma | 28.087 s |
| Orange | 29.951 s |
| Drizzle | 40.430 s |
| Mikro | 2:41.651 min |

| **MySQL** | Pool size = 1 |
|----------|------|
| Orange | 29.070 s |
| Prisma | 34.339 s |
| Mikro | 3:19.943 min |
| Drizzle | 8:50.832 min |

| **MySQL** | Pool size = 10 |
|----------|------|
| Orange | 28.928 s |
| Prisma | 30.116 s |
| Mikro | 3:09.246 min |
| Drizzle | 8:16.993 min |

| **SQL Server** | Pool size = 1 |
|----------|------|
| Orange | 2:03.694 min |
| Prisma | 4:52.575 min |
| Mikro | 4:06.258 min |
| Drizzle | N/A |

| **SQL Server** | Pool size = 10 |
|----------|------|
| Orange | 56.862 s |
| Prisma | 1:10.156 min |
| Mikro | 2:52.443 min |
| Drizzle | N/A |

## Steps to Run

The github action will always run remotely on push.  
You can run it locally with the following steps:  

1. **Start the database in Docker**  
   Make sure Docker is installed and running on your machine.  
   Start the database of your choice.  
   - ```npm run start:pg```
   - ```npm run start:mysql```
   - ```npm run start:mssql```

2. **Install dependencies**
   - ```npm install```

3. **Running benchmarks for Orange ORM**:
   - ```npm run orange:pg```
   - ```npm run orange:mssql```
   - ```npm run orange:mysql```
   - ```npm run orange:sqlite```
4. **Running benchmarks for Drizzle ORM**:
   - ```npm run drizzle:pg```
   - ```npm run drizzle:mssql```
   - ```npm run drizzle:mysql```
   - ```npm run drizzle:sqlite```
5. **Running benchmarks for Prisma ORM**:
   - ```npm run prisma:pg```   
   - ```npm run prisma:mssql```
   - ```npm run prisma:mysql```
   - ```npm run prisma:sqlite```
6. **Running benchmarks for Mikro ORM**:    
   - ```npm run mikro:pg```
   - ```npm run mikro:mssql```
   - ```npm run mikro:mysql```
   - ```npm run mikro:sqlite```

7. **Stop the database containers**
   - ```npm run stop:pg```
   - ```npm run stop:mysql```
   - ```npm run stop:mssql```
