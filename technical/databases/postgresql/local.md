# PostrgreSQL + Prisma ORM local development

## Data Dictionary

* Shadow database: temporary database used during development for safely generating and testing schema migrations without affecting your main dev database.

## 1. Prerequisites and tool installation

### Linux

- Postgresql machine

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

- Node.js & npm

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

- Azure CLI

```bash
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

- Additional tools

```bash
npm install -g typescript ts-node
npm install -g node-pg-migrate
```

### Mac

- Postgresql machine

```bash
brew install postgresql@15
brew services start postgresql@15
```

- Node.js & npm

```bash
brew install node
```

- Azure CLI

```bash
brew install azure-cli
```

## 2. Local PostgreSQL Setup

First, refer to [the installation guideline](./installation.md) to setup PostgreSQL in linux.

### Create development user and database

```bash
# 1. Connect as superuser
sudo -u postgres psql
```

```sql
-- 2. Create a dedicated user for Prisma with appropiate permisisons
CREATE USER prisma_dev WITH PASSWORD 'dev' CREATEDB;

-- 3. Create main database for development
CREATE DATABASE <name_database> OWNER <user>;

-- 4. Create shadown database (required for Prisma migrations in development)
CREATE DATABASE <name_database_shadow> OWNER <user>;

-- 5. Create test database (for running tests)
CREATE DATABASE <name_database_test> OWNER <user>;

-- 6. Grant all priviledges on databases
GRANT ALL PRIVILEGES ON DATABASE <name_database> TO <user>
GRANT ALL PRIVILEGES ON DATABASE <name_database_shadow> TO <user>
GRANT ALL PRIVILEGES ON DATABASE <name_database_test> TO <user>

-- 7. Connect to the three databases and create extensions if not exists. This iterates for each database.
CREATE EXTENSION IF NOT EXISTS 'uuid-ossp'

-- 8. Grant schema permissions
GRANT ALL ON SCHEMA public TO <user>
GRANT CREATE ON SCHEMA public to <user>
```

All of this can be automated in a ``bash`` script.  


2. Configure PostgreSQL for Development
3. Setup Connection Pooling (Optional but Recommended)
4. Environment Variables Setup

## 3. Project Initialization

1. Create Node.js Project: `npm init -y`
2. Update `package.json`
3. Typescript configuration: `tsconfig.json`
4. Install dependencies

## 4. Prisma Setup & Configuration

1. Initialize prisma

```bash
npx prisma init --datasource-provider postgresql
```
2. Configure Prisma Schema (database, generator, model)
3. Create Prisma Client Singleton (`lib/prisma.ts`)

## 5. Database Schema Design

1. Migration strategy

```bash
# Create initial migration
npx prisma migrate dev --name init

# Create shadow database for development
createdb myapp_dev_shadow

# Generate Prisma Client
npx prisma generate
```

2. Seed Data Setup

Inside `prisma/seed.ts`

3. Add seed command (inside package.json)

```javascript
{
    "prisma": {
        "seed": npx seed,
    }
}
```

## 6. Development Workflow

1. API Implementation Example

2. Development Commands

## 7. Testing Strategy 

1. Unit Testing Setup

2. Integration Testing

## 8. Azure Preparation

1. Azure Database for PosgreSQL Setup

```bash

# 1. Login to Azure
az login

# 2. Create resource group (or make it in the platform, this is optional)
az group create --name app --location eastus

# 3. Create Azure Database for PostgreSQL (Flexible Server)
az postgres flexible-server create \
    --resource-group app \
    --name app-postgres-prod \
    --location....

# 4. Configure firewall rules
az postgres flexible-server firewall-rule create \
    --resource-group...

# 5. For development access (replace with your IP)

# 6. Enable extensions
az postgres flexible-server parameter set \
    --resource-group app \
```

2. Connection String Configuration

```bash
DATABASE_URL

DATABASE_URL_POOLED
```

3. SSL Certificate setup

```bash
wget https://dl.cacerts.digicert.com/DigiCertGlobalRootCA.crt.pem

DATABASE_URL=""
```

## 9. Migration to Azure

### Pre-Migration Checklist

- [ ] Backup local database
- [ ] Test connection to Azure PostgreSQL
- [ ] Review and optimize schema for production
- [ ] Prepare migration scripts
- [ ] Set up monitoring and alerting
- [ ] Configure automated backups
- [ ] Plan maintenance window

### Migration

- Option 1: Using pg_dump / pg_restore
- Option 2: Using Prisma Migrations
- Option 3: Azure Database Migration Service

### Data Validation

## 10. Post-Migration Configuration

### Application configuration

1. The environment variables must be set up for production.
2. The schema prisma has to be updated accordingly.
3. Performance optimization
4. Azure PostgreSQL Performance Tuning
5. Monitoring setup
6. Backup Strategy

