# Benchmarks for Orange, Drizzle, Prisma and MikroORM
The numbers are from the latest run in the Node 22 Bullseye image.  
The computer was 11th Gen Intel(R) Core(TM) i7-1185G7 @ 3.00GHz.   
The CPU had 4 physical cores, and each core supports 2 threads, making a total of 8 logical processors. 
## Results  

<table>
<tr>
<td>


| **PostgreSQL** | Pool size = 1 |
|----------|------|
| Orange | 24.754 s |
| Drizzle | 31.847 s |
| Prisma | 49.419 s |
| Mikro | 2:05.736 min |

</td>
<td>&nbsp;&nbsp;&nbsp;</td>
<td>

| **PostgreSQL** | Pool size = 10 |
|----------|------|
| Orange | 24.541 s |
| Drizzle | 26.013 s |
| Prisma | 33.730 s |
| Mikro | 1:58.967 min |

</td>
</tr>
</table>


**PostgreSQL**
|        | Pool size = 1 | Pool size = 10 |
|--------|---------------|----------------|
| Orange | 24.754 s       | 24.541 s        |
| Drizzle| 31.847 s       | 26.013 s        |
| Prisma | 49.419 s       | 33.730 s        |
| Mikro  | 2:05.736 min     | 1:58.967 min|
  
**SQL Server**
|        | Pool size = 1 | Pool size = 10 |
|--------|---------------|----------------|
| Orange | 2:31.942 min       | 1:11.334s s        |
| Drizzle| N/A        | N/A        |
| Prisma | 1:30.985 min s       | 38.529 s        |
| Mikro  |  min     | 		min| |
  
**MySQL**
|        | Pool size = 1 | Pool size = 10 |
|--------|---------------|----------------|
| Orange | 16.925 s       | 18.858 s        |
| Drizzle| 7:26.233 min       | 7:31.768 min        |
| Prisma | 46.560 s       | 32.646 s        |
| Mikro  | 1:42.455 min     | 1:43.959 min|
  
**SQLite**
|        | Pool size = 1 | Pool size = 10 |
|--------|---------------|----------------|
| Orange | 24.736 s       |  27.396 s        |
| Drizzle| 28.158 s       | 27.500 s        |
| Prisma | 1.05.088 min       | 37.237 s        |
| Mikro  | 2:02.532 min     | 1:56.939 min|
  
## Steps to Run

The github action will always run remotely on push.  
You can run it locally with the following steps:  

1. **Start the database in Docker**  
   Make sure Docker is installed and running on your machine.  
   Start the database of your choice.  
   - ```npm run start:pg```
   - ```npm run start:mysql```
   - ```npm run start:mssql```

2. Install dependencies
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

7. Stop the database containers
   - ```npm run stop:pg```
   - ```npm run stop:mysql```
   - ```npm run stop:mssql```
