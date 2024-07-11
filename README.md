# ORM Benchmarks for Orange, Drizzle and Prisma
The numbers are from the latest run in the Node 22 Bullseye image.  
I used computer 11th Gen Intel(R) Core(TM) i7-1185G7 @ 3.00GHz.   
The CPU had 4 physical cores, and each core supports 2 threads, making a total of 8 logical processors. 
## Results  
**PostgreSQL**
|        | Pool size = 1 | Pool size = 10 |
|--------|---------------|----------------|
| Orange | 24.754s       | 24.541s        |
| Drizzle| 31.847s       | 26.013s        |
| Prisma | 49.419s       | 33.730s        |
## Steps to Run

The github action will always run remotely on push.  
You can run it locally with the following steps:  

1. **Start the database in Docker**  
   Make sure Docker is installed and running on your machine.
   - ```npm run db:start```

2. Install dependencies
   - ```npm install```

3. **Running all benchmarks**:
   - ```npm run benchmark```

4. **To run single benchmarks for poolsize = 1**
   - ```npm run drizzle:pool1```
   - ```npm run orange:pool1```
   - ```npm run prisma:pool1```
   - ```npm run mikroorm:pool1``` (Does not work yet)

5. **To run single benchmarks for poolsize = 10**
   - ```npm run drizzle:pool10```
   - ```npm run orange:pool10```
   - ```npm run prisma:pool10```
   - ```npm run mikroorm:pool10``` (Does not work yet)

6. Stop the Docker container
   - ```npm run db:stop```
Happy Testing!
