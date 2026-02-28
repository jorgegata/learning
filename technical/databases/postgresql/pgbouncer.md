# pgBouncer

PgBouncer is a connection pooler for PostgreSQL that improves performance by managing a pool of the above database connections, reducing the overhead of creating new ones for each request. In other words, it allows to handle many more client connections than the database server could on its own.

There are 4 types of connections in PostgreSQL+Prisma:

- Migration
- Query
- Transaction
- Prisma Studio connections

pgBouncer multiplexes many app connections into fewer database connections, not having too many error clients from PostgreSQL.

## When is it needed

1. It is needed when you have serverless functions, where each invocation is a new connection and you hit connection limits fast. 

2. High-scale, where 10 replicas are running simultaneously where each needs multiple connections (Posgres limit is around 100-200)

3. Scale-to-zero, with Container Apps with min replicas = 0 and frequent cold starts with too many connections. 

4. Multiple microservices connecting to same database, so aggregate connections add up quickly.

## When it is not needed

1. Development/testing
2. Always-on containers with few replicas
3. Traditional servers
4. Low traffic

If all of the above is met, the Prisma's built-in connection pooling is enough.