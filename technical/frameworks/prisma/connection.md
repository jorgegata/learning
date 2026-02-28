# Connection Pooling with PgBouncer

Prisma creates multiple connections for:

* Migration connections
* Query connections
* Transaction connections
* Prisma Studio connections

PgBouncer is a connection pooler for PostgreSQL that improves performance by managing a pool of the above database connections, reducing the overhead of creating new ones for each request. In other words, it allows to handle many more client connections than the database server could on its own.

## Install and configuration

1. Install the dependencies

```bash
sudo apt-get update
sudo apt-get install pgbouncer
```

2. Configure postgres to use md5 hash

```bash
#1. Connect to PostgreSQL
sudo -u postgres psql
```

```sql
-- 2. Change encryptation method to MD5
ALTER SYSTEM SET password_encryption = 'md5';
SELECT pg_reload_conf();

-- 3. Change password to generate new hash MD5
ALTER USER postgres PASSWORD 'postgres';

-- 4. Obtain new hash MD5
SELECT usename, passwd FROM pg_shadow WHERE usename = 'postgres';

-- You should look something like: md5xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
-- i.e. md53175bce1d3201d16594cebf9d7eb3f9d
```

La base de datos `pgbouncer` es una base de datos virtual especial para la administración. Para administrar pools, clients, servers, starts...

```bash
psql -h localhost -p 6432 -U postgres pgbouncer 
```

```sql
SHOW POOLS;
SHOW CLIENTS;
SHOW SERVERS;
SHOW STARTS;
```

**ERROR COMUN** distintos tipos de autenticación:  FATAL:  server login failed: wrong password type



2. Configure pgbouncer for prisma.

Modify the ``pgbouncer.ini`` configuration file with the template in [pgbouncer-configuration](#pgbouncer-configuration). The standard is to configure the ``userlist.txt`` file with a md5 password

```bash
sudo nano /etc/pgbouncer/pgbouncer.ini
```

Generate MD5 password for PgBouncer:

```bash
# Output the password
echo -n "prisma_dev_password" | md5sum
# Create userlist.txt and copy there the output
sudo nano /etc/pgbouncer/userlist.txt
```

Start the system:

```bash
sudo systemctl start pgbouncer
sudo systemctl enable pgbouncer
```

Test out if you can connect and retrieve the password from PostgreSQL

```bash
sudo -u postgres psql -U postgres -d nz_lever_db -c "SELECT usename, passwd FROM pg_shadow WHERE usename = 'prisma_dev';"
```

Test the connection and monitor PgBouncer

```bash
psql -h localhost -p 6432 -U prisma_dev -d nz_lever_db -c "SELECT 1;"

psql -h localhost -p 6432 -U prisma_dev -d pgbouncer -c "SHOW POOLS;"
```

## PgBouncer Configuration

### Auth_query solution

Instead of maintaining a userlist.txt, you can configure PgBouncer to authenticate directly against PostgreSQL. For that, you edit the `/etc/pgbouncer/pgbouncer.ini` file and create a pgbouncer user in PostgreSQL:

```sql
-- Run in PostgreSQL
CREATE USER pgbouncer WITH PASSWORD 'pgbouncer_password';
GRANT CONNECT ON DATABASE myapp_dev TO pgbouncer;
-- Grant ability to read user info
GRANT SELECT ON pg_shadow TO pgbouncer;
```

[databases]
your_database = host=localhost port=5432 dbname=your_database auth_user=pgbouncer

[pgbouncer]
listen_addr = 127.0.0.1
listen_port = 6432
auth_type = md5
auth_query = SELECT usename, passwd FROM pg_shadow WHERE usename=$1
auth_user = pgbouncer  # Special user for authentication


### Auth

```ini
# /etc/pgbouncer/pgbouncer.ini

[databases]
# Prisma connection pools
# Transaction mode for main app (recommended for Prisma)
myapp_dev = host=localhost port=5432 dbname=myapp_dev
myapp_dev_shadow = host=localhost port=5432 dbname=myapp_dev_shadow
myapp_test = host=localhost port=5432 dbname=myapp_test

# Session mode for migrations (required for Prisma migrations)
myapp_dev_session = host=localhost port=5432 dbname=myapp_dev pool_mode=session
myapp_dev_shadow_session = host=localhost port=5432 dbname=myapp_dev_shadow pool_mode=session

[pgbouncer]
listen_addr = 127.0.0.1
listen_port = 6432

# Authentication
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt

# Pool settings optimized for Prisma
pool_mode = transaction                 # Default mode for Prisma
max_client_conn = 1000                  # Total client connections
default_pool_size = 25                  # Per-database pool size
min_pool_size = 5                       # Minimum connections maintained
reserve_pool_size = 5                   # Reserve for super users
max_db_connections = 100                # Max connections to PostgreSQL

# Prisma-specific timeouts
server_idle_timeout = 600               # 10 minutes
server_lifetime = 3600                  # 1 hour
server_connect_timeout = 15
query_wait_timeout = 120               # Important for Prisma transactions
client_idle_timeout = 0                # Don't disconnect idle clients

# Logging
logfile = /var/log/pgbouncer/pgbouncer.log
pidfile = /var/run/pgbouncer/pgbouncer.pid
log_connections = 1
log_disconnections = 1
log_pooler_errors = 1

# Admin access
admin_users = postgres, prisma_dev
stats_users = prisma_dev
```