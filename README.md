# Benchmarks for Orange, Drizzle, Prisma and MikroORM
The numbers are from the latest run on Node 22.16.0 on Windows 11 Business.
The computer was 11th Gen Intel(R) Core(TM) i7-1185G7 @ 3.00GHz.   
The CPU had 4 physical cores, and each core supports 2 threads, making a total of 8 logical processors. 
## Results  

<table>
<tr>
<td>

<table>
<tr>
<th><strong>SQLite</strong></th>
<th>Pool size = 1</th>
</tr>
<tr>
<td>Orange</td>
<td>27.420 s</td>
</tr>
<tr>
<td>Drizzle</td>
<td>28.274 s</td>
</tr>
<tr>
<td>Prisma</td>
<td>1:07.598 min</td>
</tr>
<tr>
<td>Mikro</td>
<td>2:10.166 min</td>
</tr>
</table>

</td>
<td>&nbsp;&nbsp;&nbsp;</td>
<td>

<table>
<tr>
<th><strong>SQLite</strong></th>
<th>Pool size = 10</th>
</tr>
<tr>
<td>Orange</td>
<td>26.359 s</td>
</tr>
<tr>
<td>Drizzle</td>
<td>28.725 s</td>
</tr>
<tr>
<td>Prisma</td>
<td>44.160 s</td>
</tr>
<tr>
<td>Mikro</td>
<td>2:08.812 min</td>
</tr>
</table>

</td>
</tr>
<tr>
<td>

<table>
<tr>
<th><strong>PostgreSQL</strong></th>
<th>Pool size = 1</th>
</tr>
<tr>
<td>Orange</td>
<td>29.159 s</td>
</tr>
<tr>
<td>Drizzle</td>
<td>50.432 s</td>
</tr>
<tr>
<td>Prisma</td>
<td>1:22.673 min</td>
</tr>
<tr>
<td>Mikro</td>
<td>3:07.183 min</td>
</tr>
</table>

</td>
<td>&nbsp;&nbsp;&nbsp;</td>
<td>

<table>
<tr>
<th><strong>PostgreSQL</strong></th>
<th>Pool size = 10</th>
</tr>
<tr>
<td>Orange</td>
<td>29.951 s</td>
</tr>
<tr>
<td>Drizzle</td>
<td>40.430 s</td>
</tr>
<tr>
<td>Prisma</td>
<td>1:01.705 min</td>
</tr>
<tr>
<td>Mikro</td>
<td>2:41.651 min</td>
</tr>
</table>

</td>
</tr>
<tr>
<td>

<table>
<tr>
<th><strong>MySQL</strong></th>
<th>Pool size = 1</th>
</tr>
<tr>
<td>Orange</td>
<td>38.694 s</td>
</tr>
<tr>
<td>Prisma</td>
<td>46.560 s</td>
</tr>
<tr>
<td>Mikro</td>
<td>3:19.943 min</td>
</tr>
<tr>
<td>Drizzle</td>
<td>8:50.832 min</td>
</tr>
</table>

</td>
<td>&nbsp;&nbsp;&nbsp;</td>
<td>

<table>
<tr>
<th><strong>MySQL</strong></th>
<th>Pool size = 10</th>
</tr>
<tr>
<td>Orange</td>
<td>36.624 s</td>
</tr>
<tr>
<td>Prisma</td>
<td>32.646 s</td>
</tr>
<tr>
<td>Mikro</td>
<td>3:09.246 min</td>
</tr>
<tr>
<td>Drizzle</td>
<td>8:16.993 min</td>
</tr>
</table>

</td>
</tr>
<tr>
<td>

<table>
<tr>
<th><strong>SQL Server</strong></th>
<th>Pool size = 1</th>
</tr>
<tr>
<td>Orange</td>
<td>1:56.911 min</td>
</tr>
<tr>
<td>Prisma</td>
<td>2:42.099 min</td>
</tr>
<tr>
<td>Mikro</td>
<td>7:33.216 min</td>
</tr>
<tr>
<td>Drizzle</td>
<td>N/A</td>
</tr>
</table>

</td>
<td>&nbsp;&nbsp;&nbsp;</td>
<td>

<table>
<tr>
<th><strong>SQL Server</strong></th>
<th>Pool size = 10</th>
</tr>
<tr>
<td>Orange</td>
<td>57.463 s</td>
</tr>
<tr>
<td>Prisma</td>
<td>1:06.846 min</td>
</tr>
<tr>
<td>Mikro</td>
<td>4:15.637 min</td>
</tr>
<tr>
<td>Drizzle</td>
<td>N/A</td>
</tr>
</table>

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
