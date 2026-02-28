# PostgreSQL docs

## Word Dictionary

## Definition

PostgreSQL is an open-source, object-relational database management system (ORDBMS) based on POSTGRES. It offers the SQL standard and extend with features:

- complex queries
- foreign keys
- triggers
- updatable views
- transactional integrity
- multiversion concurrency control

It can be extended by the user in multiple ways adding: data types, functions, operators, aggregate functions, index methods, procedural languages.

## Architecture

PostgreSQL Cluster (Instancia)
    ├── Databases
    │   ├── Schemas
    │   │   ├── Tables
    │   │   ├── Views  
    │   │   ├── Functions
    │   │   ├── Sequences
    │   │   └── Types
    │   └── Extensions
    ├── Roles (Users/Groups)
    └── Tablespaces

A cluster is a postgreSQL instance running on a port.
Each cluster has:

* A port (i.e. 5432)
* A data directory
* Own config files (db.config)
* Multiple databases

A ``schema`` is a namespace that organizes objects (like folders)

A ``table`` is an entity that represents something in the business logic

A ``view`` is a "virtual table", which is a saved SQL query that you can use as a table. There are four types (simple views, join views, materialized views, updatable views)

A ``function`` in postgres is a reusable block where always returns a value, it can receive params, and it is used for calculations and transformations. 

A ``procedure`` is similar to a function but it does not return a value (only execute actions), it is used for operations that modify data, and it is called with CALL instead of SELECT


## Verify Installation Health

```bash
pg_lsclusters
```

## Flags

## Commands

Access the server. Please, be aware that PostgreSQL can user "peer authentication" which expects the system username to match the database username. Since I am logged in as "gatajorge" but trying to connect as "postgres" it fails.

**Note** for the commands inside the server, it must end with ;. 

### DB Management

Each cluster can contain multiple databases by default. The common ones are:

- postgres - main db by default
- template0 - immutable database
- template1 - template for new db

```bash
# Inside the cluster

\l - list of databases
\c - connect to a specific database

# command
CREATE DATABASE db;
DROP DATABASE db;

# connect to a specific db
\c db
```

### Schemas Management

```bash
# Access all schemas
\dn

# Commands
CREATE SCHEMA schema
SHOW search_path

SET search_path TO ventas, public;
```

### Table management

```bash
CREATE TABLE ventas.facturas (
    id SERIAL PRIMARY KEY
    amount DECIMAL(10,2)
)

SELECT * FROM ventas.facturas

# See all tables from actual schema
\dt

# See all tables from a specific schema
\dt ventas.*
```

### VIEW MANAGEMENT 

```sql
CREATE VIEW empleados_activos AS
SELECT
    e.nombre
    e.salario
    d.nombre_departamento
    e.salario * 12 as salario_anual
FROM empleados e
JOIN departamentos d ON e.dept_id = d.id
WHERE e.activo = true;
```

### Function Management

```sql
CREATE FUNCTION function_name(params)
RETURNS return_type AS $$
BEGIN
    RETURN value
END;
$$ LANGUAGE plpgsql;
```

### PROCEDURE MANAGEMENT

```sql
CREATE PROCEDURE procedure_name(function)
LANGUAGE plpsql AS $$
BEGIN
    -- your logic here
END;
$$;
```

### User Management (First Level)

Before, in postgreSQL existed USERS (with login) and GROUPS (without login). Now, it migrated to ROLE.

Users and groups are 'alias' inside ROLE.

```sql
-- Equivalent
CREATE USER juan; -- Using user
CREATE ROLE juan LOGIN; -- Using role
```

The architecture follows this:

- ROLES
    - postgres (superuser)
    - user1 (login)
    - user2 (login)
    - group1 (without login)
    - app_readonly (without login)
- DATABASES
    - postgres
    - store
    - blog
        - Permissions specific per object

```sql
CREATE ROLE dev WITH
    LOGIN
    PASSWORD 'dev123'
    VALID UNTIL '2025-12-31' -- password
```

The actions on the user management are basically creating users, see users, modify users, delete users.

The permissions can be given on the hierarchical levels:

- Database
- Schema
- Table
- Column

And those tables can be given permissions on cascade (for future tables)

The best practices for this are basically the following:

- Principle of less priviledges
- Role separation
- Monitor and audit

Cases:

1. Multi-tenant application
2. Development team
3. Application at different levels 

### Establish connection with the system

This only works if the username of linux is the same as the database

```bash
psql -U postgres -h localhost -c "SELECT version();"
```

Then, to enter the user and then execute commands...

```bash
sudo -i -u postgres
```

```bash
sudo -u postgres psql -p <port>
```

```bash
sudo -u postgres psql # Access the database
# ALTER USER postgress PASSWORD 'password';
```

##