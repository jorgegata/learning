# Naming Conventions

## Github

In github, we have to consider the following hierarhy: organisations, repositories, teams (linked to AzureA)

### Naming

- Organizations: `Sika-SUS` / `Sika-SIS-AS`
- Repositories: `cs_epd_automation`
- Teams: `TeamShortname_region_repositoryName` (`sp_global_epdAutomation`, although most of the times the region is skipped) 

### Rules

- Always on **private** while handling users manually
- Always **2 Sika internal employees as Owners**: one is the Head Team, one is the Solution Architect. Remaining are maintainers/contributors
- Default branch is `main`

`_owners` with permission `admin`
`_contributors` with permission `write`
`_readers` with permission `read`

---

## Azure

> In Azure, we have a hierarchy of spaces, such as Azure AD groups, tenants, subscriptions, resource groups, and resources. Each of them has a special naming rule 

### AD Groups

> You always follow this structure `ZZ-AS (this is for global) + -<platform> + -<regional_scope> + -<project> + -<priviledge_group>`. As an example, we can have `ZZ-AS-Github-Global-ContentMigrationTool-Owners/Contributors/Readers`

This rule is described at the official [Confluence Page](https://sika.atlassian.net/wiki/spaces/SDEO/pages/3257171971/Create+a+GitHub+Repository#Azure-AD-Groups).

### Subscription Naming

- Environment tags: p (production), t (test), d (development)
- Company Name removed from subscriptions and moved to ``tags`` (in case an acquisition of a company is made).
- Region is the ``Azure Datacenter Region`` (e.g. weu), NOT SIKA REGIONS. Use ``glo`` for global workloads

structure: `<env>-sub-<datacenter_region>-<projectName>`
example: `d-sub-weu-POCs`

### Resource Group Naming

> In most cases, the purpose is not included in the name of the resource group. 

structure: `<env>-rg-<region>-<projectName>-<purpose(optional)>`
example: `p-rg-weu-roofcalculator-frontend`

> Tags are inherited to resource if the tag is set on RG Level

The following tags are mandatory to be set on resource group level:

- ApplicationOwner
- BusinessOwner
- SLA
- CompanyCode
- CompanyName
- CountryISO
- Creator
- Region
- SystemDescription
- CreationDate

### General Resource Naming

> Container Registry naming and Storage Accounts is fucked up in Azure **(no dashes in the name, only lowcase letter)**

structure: ``<env>-<resourceType>-<name>``

The abbreviations used in Sika for resource types are hardcoded in the `env/<env>.params.json` file. 

| Resource | Name | Comment | Purpose |
| -------- | ---- | ------- | ------- |
| VNET | ``vnet`` | - | 
| fileShare | ``share`` | - |
| BlobContainer | ``blob`` | - |
| StorageAccount | ``st`` | YES |
| ContainerRegistry | ``rg`` | YES |
| ManagedIdentity | ``id`` | - |
| KeyVault | ``kv`` | - |
| Postgres | ``psql`` | YES (SUFFIX) |
| Private Endpoint | ``psql`` | - |
| Log Analytics | ``log`` | - |
| Container App Managed Env | ``cae`` | - |
| Container App Managed Environment Account | ``caes`` | - |
| Container App | ``ca`` | YES |

### Storage Accounts and Container Registry

The names for these two resources need to be unique along the whole Sika tenant. This also does not allow for the usual naming conventions.

Example for the storage account:
structure: `<env><sto><name><randomSuffix>`
example: pstoroofcalculatorfgh54d

### Network Resources

- Security Zone can be ``sc1``, ``sc2``, or ``sc3``
- `sc2-sv-gw` or `sc2-sv-dmz` if a direct connection to the internet is being made
- securityZoneDescription can be `cr`, `ncr`, `prv` or `mgmt`

structure: `<env>-<resourceType>-<securityZone>-<securityZoneDescription>-<name>`
example: `p-vnet-sc2-sv-gw-edmspublicurlsync`
