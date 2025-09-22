# Benchmarks for Orange, Drizzle, Prisma and MikroORM
The numbers are from the latest run on Node 22.16.0 on Windows 11 Business.
The computer was 11th Gen Intel(R) Core(TM) i7-1185G7 @ 3.00GHz.   
The CPU had 4 physical cores, and each core supports 2 threads, making a total of 8 logical processors. 
## Results  

<table>
<tr>
<td>

| **SQLite** | Pool size = 1 |
|----------|------|
| Orange | 27.420 s |
| Drizzle | 28.274 s |
| Prisma | 1:07.598 min |
| Mikro | 2:10.166 min |

</td>
<td>&nbsp;&nbsp;&nbsp;</td>
<td>

| **SQLite** | Pool size = 10 |
|----------|------|
| Orange | 26.359 s |
| Drizzle | 28.725 s |
| Prisma | 44.160 s |
| Mikro | 2:08.812 min |

</td>
</tr>
</table>  

<table>
<tr>
<td>

| **PostgreSQL** | Pool size = 1 |
|----------|------|
| Orange | 29.159 s |
| Drizzle | 50.432 s |
| Prisma | 1:22.673 s |
| Mikro | 3:07.183 min |

</td>
<td>&nbsp;&nbsp;&nbsp;</td>
<td>

| **PostgreSQL** | Pool size = 10 |
|----------|------|
| Orange | 29.951 s |
| Drizzle | 40.430 s |
| Prisma | 1:01.705 s |
| Mikro | 2:41.651 min |

</td>
</tr>
</table>
<table>
<tr>
<td>

| **MySQL** | Pool size = 1 |
|----------|------|
| Orange | 38.694 s |
| Prisma | 46.560 s |
| Mikro | 3:19.943 min |
| Drizzle | 8:50.832 min |

</td>
<td>&nbsp;&nbsp;&nbsp;</td>
<td>

| **MySQL** | Pool size = 10 |
|----------|------|
| Orange | 36.624 s |
| Prisma | 32.646 s |
| Mikro | 3:09.246 min |
| Drizzle | 8:16.993 min |

</td>
</tr>
</table>

<table>
<tr>
<td>

| **SQL Server** | Pool size = 1 |
|----------|------|
| Orange | 1:56.911 min |
| Prisma | 2:42.099 min |
| Mikro | 7:33.216 min |
| Drizzle | N/A |

</td>
<td>&nbsp;&nbsp;&nbsp;</td>
<td>

| **SQL Server** | Pool size = 10 |
|----------|------|
| Orange | 57.463 s |
| Prisma | 1:06.846 min |
| Mikro | 4:15.637 min |
| Drizzle | N/A |

</td>
</tr>
</table>


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
