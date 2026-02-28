# Naming Conventions

Please, follow the naming conventions described in the [Confluence Page](https://sika.atlassian.net/wiki/spaces/SDEO/pages/3257171971/Create+a+GitHub+Repository#Azure-AD-Groups).

## Summary

### Naming

- Organizations: `Sika-SUS` / `Sika-SIS-AS`
- Repositories: `cs_epd_automation`
- Azure AD Groups: `ZZ-AS-GitHub-Global-Sus-EpdAutomation-Owners` / `...-Contributors` / `...-Readers`
- Teams: `TeamShortname_Region_RepositoryName`

### Visibility

Always on private while handling users manually

### GitHub Permission

When a new repository and teams are created, always 2 Sika internal employees are Owners:

- One is the Head Team (e.g. Jozsef)
- One is the Solution Architect (e.g. Marco)
- Remaining are maintainers of ther repository

`_owners` with permission `admin`
`_contributors` with permission `write`
`_readers` with permission `read`

Default branch is `main`

---

### Azure

> Container Registry naming and Storage Accounts is fucked up in Azure (no dashes in the name, only lowcase letter)

Latest, unfinished blueprints can be found here with already naming conventions to be [found here](https://github.com/Sika-SIS-AS/web_infrastructure_blueprints/tree/feature/container-app-postgresdb/blueprints/container-app-postgresql)

#### Subscription Naming

- environment tags: p (production), t (test), d (development)
- Company Name removed from subscriptions and moved to ``tags``
- Region is the ``Azure Datacenter Region`` (e.g. weu), NOT SIKA REGIONS. Use ``glo`` for global workloads

structure: `<env>-sub-<region>-<projectName>`
example: `d-sub-weu-POCs`

#### Resource Group Naming

structure: `<env>-reg-<region>-<projectName>-<purpose(optional)>`
example: `p-reg-weu-roofcalculator-frontend`

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

Tags are inherited to resourvces if the tag is set on Resource Group Level

#### General Resource Naming

structure: ``<env>-<resourceType>-<name>``

The abbreviations used in Sika for resource types can be found in `naming-param.json` file located in your repository when using a Azure Landing Zone

Location: `<Repository>\_parameters\naming-params.json`

| Resource | Name | Comment | Purpose |
| -------- | ---- | ------- | ------- |
| VNET | vnet | - | 
| fileShare | share | - |
| BlobContainer | blob | - |
| StorageAccount | st | YES |
| ContainerRegistry | rg | YES |
| ManagedIdentity | id | - |
| KeyVault | kv | - |
| Postgres | psql | YES (SUFFIX) |
| Private Endpoint | psql | - |
| Log Analytics | log | - |
| Container App Managed Env | cae | - |
| Container App Managed Environment Account | caes | - |
| Container App | ca | YES |

#### Virtual Machines

It follow the usual **Naming Convention from the Working Instruction**

#### Storage Accounts

structure: `<env><sto><name><randomSuffix>`
example: pstoroofcalculatorfgh54d

#### Network Resources

- Security Zone can be ``sc1``, ``sc2``, or ``sc3``
- `sc2-sv-gw` or `sc2-sv-dmz` if a direct connection to the internet is being made
- securityZoneDescription can be `cr`, `ncr`, `prv` or `mgmt`

structure: `<env>-<resourceType>-<securityZone>-<securityZoneDescription>-<name>`
example: `p-vnet-sc2-sv-gw-edmspublicurlsync`
