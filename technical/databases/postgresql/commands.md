# Useful commands in Postgres

## Word Dictionary

**Frontend** - part of the application that the user interact with it. It encompasses everything visual and functional in the browser or device. (UI + UX + client-side logic)
**Backend** - part of the application (server-side) that users dont see directly. It handles business logic, database operations, authentication, server configuration, and data processing that powers the frontend

The communication flow is the following

User action -> Frontend -> API request -> Backend -> Database
                   |                         |
            Processing <- API Response <- Processing

API communication: REST API (HTTP-based communcation with JSON/XML), GraphQL (Query language for flexible data fetching), Websocket (real-time bidirectional communication), gRPC (high performance RPC framework)

**Middleware** - checkpoint, software, or service that sits between two services or systems to handle certain operatons, such as authentication, logging, data validation... In the context of authentication, it standarizes authentication so you dont have to check the permissions in all your code (check credentials, validate permissions, make decisions). This ensure reusability, separation of concers, consistency, and easy maintenance


## Commands in the bash

**Enter postgres database**

```bash
sudo -u postgres psql # through sudo user

psql -U postgres -d nz-lever-db # Postgres database
```

**List all databases** -> flag -l

```bash
sudo -u postgres psql -l
```

**Connect a specific database** -> flag -d <name_database>

**Create a database**

```bash
create db -U postgres -E UTF8 -O myuser ... <name>
```


## Commands inside psql

\c -> switch to another database
\l+ -> detailed list of databases (without + no details)
\dn -> list all schemas
\dt -> list all tables

**Create database**

```sql
CREATE DATABASE <name>
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    ...
```

**Create schema**

```sql
\c <name_db> -- Connect to the database
CREATE SCHEMA <name>;
CREATE SCHEMA <name> AUTHORIZATION <user>;
CREATE SCHEMA IF NOT EXISTS <name>;
```

**Create tables**

```sql
-- Simple table
CREATE TABLE <table_name> (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
)
-- Table in a specific schema

CREATE TABLE sales.orders (
    order_id SERIAL PRIMARY KEY
    customer_id INTEGER NOT NULL,
    order_date DATE DEFAULT CURRENT_DATE
    total_amount DECIMAL(10,2)
    status VARCHAR(20) DEFAULT 'pending'
)

```

## GENERAL WORKFLOW FOR A DATABASE DESIGN

### Phase 1: Planning and architecture

Document the entities and the relationship first. It can be in plain text, on a declarative level, trying to understand completely the business logic behind the application. 

### Phase 2: Create a database and its configuration

1. Create the database with proper settings

```sql
CREATE DATABASE <database_name>
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE
    LC_CTYPE
    CONNECTION LIMIT = 100;
```

2. Connect to the database

```sql
\c database_table
```

3. Create extensions you will need

```sql
CREATE EXTENSIONS IF NOT EXISTS 'uuid-ossp'
```

### Phase 3: Schema Organization Strategy

Each schema has a clear purpose, in a logical way

```sql
CREATE SCHEMA core;
COMMENT ON SCHEMA core IS 'Core business entities and transactions'
```

Examples: core business logic, auth, inventory, billing, analytics, static/reference data, audit trails

### Phase 4: Create Shared/Lookup tables first

These tables are referenced many times by other tables

1. Create enum types or lookup table (CREATE TYPE billing.order_status AS ENUM ('pending', 'processing', 'paid', 'shipped'...))
2. Create lookup/reference tables (CREATE TABLE lookups.countries ())
3. Create any domain tables that others depend on
4. Create indexes for lookup

### PHASE 5: Create Core Business tables. 

**In dependency order, this means parents before children**

Inside the tables, generally it is best practices:

1. Create the table with basic structure, enforcing data integrity whenever possible, selecting correct datatypes, good variable naming

2. Create performance indexes based on queries patterns (CREATE INDEX <name_index> ON schema.table(var))

3. Create specialized index (i.e. partial index for available products) (CREATE INDEX <index_name> ON schema.table(var) WHEN (logical_condition))

### PHASE 6: Add Indexes Strategically

Comment: primary key and unique constrains already create indexes.
It is time to create performance indexes by categories

```sql
-- User authentication queries
CREATE INDEX <name> ON schema.table(var) WHERE (logical condition) 
-- Product queries

-- Order queries

-- Composite indexes for common queries

```

### PHASE 7: Add Constraints and Triggers

The check constraints are useful for data integrity. It can be done on a variable level, but also on certain rules inside the table.

A trigger is basically a listener that whenever happends the event, it calls a function.

```sql
-- Add check constraints
ALTER TABLE schema.table
    ADD CONSTRAINT valid_amounts
    CHECK (logic_condition);

-- Create update trigger for updated_at

-- Apply trigger for all tables with updated_at
```

### PHASE 8: Create Views for Common queries

Let's say that the indexes help on queries that are uncommon and unpredictable. However, there are certain queries that are always the same, so we can create a aggregated/organized view starting from a simple query.

### PHASE 9: Set Up Partitioning for Large Tables

```sql
-- Partition large tables by time (moment of creation)
CREATE TABLE <table_name> (

) PARTITION BY RANGE (created_at)

-- Create parttitions
CREATE TABLE <table_name_partition> PARTITION OF schema.table
    FOR VALUES FROM (val_range_1) to (val_range_2);

-- Index
CREATE INDEX name_index ON schema.table(var1,var2,DESC)
```

### PHASE 10: Security and Permissions

The keyword here is GRANT (ALL, CONNECT, USE...)

1. Define and create user roles in postgres
2. Grant **schema** permissions (on those roles)
3. Grant **table** permissions (on these roles)
4. Greant **sequence** permissions (on these roles)
5. Set default privileges for future tables
6. Create application users.

The role is the template and the user usually is an instance of one of these roles. The permissions can be given on a: database, schema, table, column, sequence, function/procedures, views, materialized views, foreign data wraper, domain, languages, types, large objects, table space, extensions. You can even give row level security.

There is a list with possible permissions depending on the **Obejct Type**

Best practices are:

1. Always revoke permissions from public
2. Create roles
3. Aassign permissions on roles
3. Assign user to role
5. Use default privileges for future objects.

### PHASE 11: Documentation and Maintenance

The comments goes on three levels: schema, tables, and columns.

```sql
COMMENT ON SCHEMA <schame> IS 'comment1'
COMMENT ON TABLE <schema.table> IS 'comment2'
COMMENT ON COLUMN <schema.table.column> IS 'comment3'
```

As advance, you can create maintenance procedures...


## EXAMPLE WITH ALL COMMON CONSTRAINS

* SERIAL PRIMARY KEY
* VARCHAR(N) NOT NULL UNIQUE
* DECIMAL(N, M) NOT NULL CHECK (var and logical condition )
* var INTEGER REFERENCES table_name(var_name) ON DELETE SET NULL/CASCADE...

Dtypes - INTEGER, DECIMAL(N,M), VARCHAR(X), TEXT, BOOLEAN, JSONB, TIMESTAMP

CONSTRAINTS 1 - FOREIGN KEY, REFERENCES, ON DELETE CASCADE
CONSTRAINS 2 - CHECK(price > cost)

CREATE INDEX <name_index> ON <schema.table(var)>
CREATE INDEX <name_index> ON <schema.table(var)> WHERE is_active = true;

```sql
CREATE TABLE inventory.products (
    -- Primary Key
    product_id SERIAL PRIMARY KEY

    -- Basic column with constrains
    sku VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    description TEXT

    -- Numeric columns
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    cost DECIMAL(10,2).
    quantity INTEGER DEFAULT 0

    -- Foreign Keys
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    supplier_id INTEGER NOT NULL,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

    -- Boolean
    is_active BOOLEAN DEFAULT true,

    -- JSON Columns
    attributes JSONB,

    -- Constraints
    CONSTRAINT fk_supplier
        FOREIGN KEY(supplier_id)
        REFERENCES suppliers(id)
        ON DELETE CASCADE,
    
    CONSTRAINT price_greater_than_cost
        CHECK (price > cost)
);

-- CREATE INDEX (SCHEMA LEVEL?)
CREATE INDEX idx_products_sku ON inventory.products(sku);
CREATE INDEX idx_products_active ON inventory.products(is_active)
```

### Advanced features

#### Table with Generated Columns

```sql

CREATE TABLE schema.<name> (
    var<name> <dtype> <constraint> (NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT)

    -- Generated columns

    subtotal DECIMAL(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED, -- important the GENERATED ALWAYS AS ... STORED 
)

CREATE INDEX <name_index> ON var_name WHERE (logical_condition)
```

> **NOTE** - indexes belongs to tables, not to schemas.

#### Managing permissions


#### Useful commands

```sql
-- list all tables in current database for a specific schema
\dt store.* 

-- describe table structure
\d store.products

-- Show table with indexes, constraints, etc.
\d+ store.products

-- List all schemas
\dn
```

#### Best practices

1. Use **schemas** to organize tables logically
2. Always define **PRIMARY KEY** for data integrity
3. Add appropiate indexes for columns used in WHERE, JOIN, and ORDER BY.
4. Use constraints to enforce data integrity at the database level.
5. Consider partitioning for very large tables.
6. Use appropiate data types.
7. Add **comments** to document the database.




