# Prisma Doc

## Word Dictionary

- ORM (Object-Relational Mapper): programming technique that translates data between object-oriented programming and relational databases

## Definition

Prisma ORM is a **next-generation** ORM that consists of these tools:

- Prisma Client: auto-generated and type-safe query builder for Node.js & TypeScript
- Prisma Migrate: declarative data modeling & migrating system
- Prisma Studio: GUI to view and edit data in your database

It can be used in any Node.js or Typescript backend application (including serverless apps and microservices). This can be a REST API, GraphQL API, a gRPC API or anything else that **needs a database**

## Util workflow

First, the relational database is modelled conceptually following your current business logic, with:

1. Entities
2. Attributes (attributos: dtype, constrains, and business logic related topics)
3. Relationships (one-to-one, one-to-many, many-to-many)

Then, the model is declared in a prisma.schema file with the specific prisma syntax. In the physical implementation, two databases can be choose with Prisma:

- PostrgeSQL: always remain the database with ACID transactions, without corrupting data.
- SQLite: not good for concurrent transactions

You can either `add Prisma to an existing project` or `Set up a new project with Prisma from scratch` 

## Couple with PostgreSQL

1. Install Prisma

```bash
npm install prisma --save-dev
npm install @prisma/client
```

2. Initialize Prisma

```bash
npx prisma init
```

3. Configure Database Connection

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/nz_lever_db?schema=public"
```

4. Pull/Push

If you already have a database in place, and you want to create the prisma schema, pull from the existing db

```bash
npm prisma db pull
```

```bash
npm prisma db push
```

5. Generate the Prisma Client + Use it Sigleton mode.

```bash
npx prisma generate
```



## Prisma Schema

It allows the developers to define the application models in an intutive data modeling language. It also contains the connection to a database and defines a *generator*. You configure three things

1. Database
2. Generator 
3. Model

```prisma

// Data source
database db {
    provider = "postgresql"
    url = env("DATABASE_URL")
}

// Generator
generator client {
    provider = "prisma-client-js"
}

// Data model

model Post {
    id Int @id @default(autoincrement())
    title String
}

```

The model has two functions:

* Represent a table in the underlying database
* Provide the foundation for the queries in the Prisma Client API

There are two ways to generate the models:

* Generate the data model from introspecting a database
* Manually writing the data model and mapping it to the database with *Prisma Migrate*

Once the models are written, you can generate Prisma Client which will expose CRUD and more queries for the defined models.

## Important commands

Install prisma

```bash
npm install @prisma/client
```

Generate prisma client (store in node_modules...)
```bash
npx prisma generate
```

Import the prisma client
```typescript
import { PrismaClient } from `@prisma/client`

const prisma = new PrismaClient()
```