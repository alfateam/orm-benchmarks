# Benchmarks for Orange, Drizzle, Prisma and MikroORM
The numbers are from the latest run in the Node 22 Bullseye image.  
The computer was 11th Gen Intel(R) Core(TM) i7-1185G7 @ 3.00GHz.   
The CPU had 4 physical cores, and each core supports 2 threads, making a total of 8 logical processors. 
## Results  
**PostgreSQL**
|        | Pool size = 1 | Pool size = 10 |
|--------|---------------|----------------|
| Orange | 24.754 s       | 24.541 s        |
| Drizzle| 31.847 s       | 26.013 s        |
| Prisma | 49.419 s       | 33.730 s        |
| Mikro  | 2:05.736 min     | 1:58.967 min|
  
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
| Orange | 42.596 s       |  32.382 s        |
| Drizzle| 27.646 s       | 24.495 s        |
| Prisma | 42.265 s       | 23.117 s        |
| Mikro  | 1:50.084 min     | 1:46.310 min|
  
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

4. **To run single benchmark for poolsize = 1**
   - ```npm run drizzle:pool1```
   - ```npm run orange:pool1```
   - ```npm run prisma:pool1```
   - ```npm run mikro:pool1```

5. **To run single benchmark for poolsize = 10**
   - ```npm run drizzle:pool10```
   - ```npm run orange:pool10```
   - ```npm run prisma:pool10```
   - ```npm run mikro:pool10```

6. Stop the Docker container
   - ```npm run db:stop```
