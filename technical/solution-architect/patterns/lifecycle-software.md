# SDLC


The software development lifecycle are the different phases of a software product the moment it starts until the end-of-life. It starts the moment a demo has been well received and the project is officially sponsored.

It follows these phases:

1. Project Draft + Requirements definition
2. Analysis and Design
3. Code development
4. Testing
5. Deploy
6. Maintenance
7. Decommission

Usually, in an agile way, the point 3 to 5 is looped several times. Then, we accomplish for a Continuous Integration and Cointinous Deployment. In the middle of the dev, point 2 can be revisited.

## Requirements definition

This has to identify both business requirements and technical requirements. Here, a business analyst, a software architect, and a business owner must be included in the meeting for a proper workflow.

Roles and responsibilities must be clearly defined. Risk related to integrations, operations, or complexity should be adressed early, with mitigation measures documented.

## Analysis and design

Now, the business requirements are translated into technical and functional solutions. 

### Data

- Input, processing, output flows defined
- Access Control
- Data Handling

### Software

In a hierarhical way, this is defined as following:

- Infrastructure + Network
- Components
- Modules
- Function definition / classes

This is retrieved to obtain security approval before development starts. Solution must be aligned with Sika Standards in guidelines, strategy, and security.

Design must take into account legal (licenses), regulatory (ISO), and privacy obligations (GPDR), and include a risk review covering areas such as availability, misconfiguration, data exposure. Security-related requirements must be explicitly documented and integrated.

## Code implementation

It is vital to have high-quality code, following language standards, peer review, and static analysis (linting)

Review to check design specs, security requirements, and potential bugs should be done regularly.

Where infrastructure is part of the solution, is must be stored and maintained as code (IaC) where applicable, rather than set manually.

## Testing

All features and security controls must be throughly tested before releasing to production. This considers the appropiation of complexity and criticality of the system.

Way -> Manual/Automated methods
Function -> features/security/regression

If the application faces external internet:
* vulnerability
* penetration tests must be performed

If data is migrated from prod to test env, it should be masked...

## Deployment

> If infra is part of the code, this must be defined and managed using Infrastructure as Code (IaC)

IaC ensure consistency, version control, and traceability across all environments minimizing the risk of errors and misconfigurations.

Deployment should follow a documented an controlled process appropiate to the criticality of the system. For high-impact applications or major releases, formal approval from businesses and IT stakeholders may be required.

Quality and secured checks must be embedded into into deployment pipeline using automated approval gates.

## Maintenance

This has to be a documented maintenance process that covers updates, patches, fix, functional enhancements... to ensure traceability, minimize disruption, and reduce the risk of introducing defects or vulnerabilities.

If there is a security concern, this must be documented and tackled immediately. Those are prioritized based on risks.

## Decommissioning

Responsible: team that owns the system, with support of IT and relevant business stakeholders.

This usually concerns on:
* Archival of data
* System shutdown
* Documentation of the decomission process (another document)

## Miscellaneous

### Defined techs

#### Languages

> Supported languages are Python, JavaScript/Typescript, Go, and Java (only when strictly necessary)

#### API and Authentication Standards

FastAPI is preferred for Python-based APIs, and Next.js is recommended for frotend development. (Based on supportability, community maturity, and aligment with Sika's architecture vision)

Other technologies must ensure long-term support, maintainability, and compliance with Sika vision.

All services must provide OpenAPI (Swagger) (it describes RESTful APIs in a standard way) to support discoverability and integration. 

OAuth 2.0 is the required authentication standard, implemented using EntraID and App Registrations to manage service access securely. 

#### Data and Databases

- **Relational database:** Azure SQL (postgres)
- **Documental database:** Azure Cosmos DB
- **Key-value database:** Redis

> NOTE: SQLite might be used, however, consider the concurrency problem when more than 1 service use the database. 

For data engineering and data analysts, Databricks is the platform used. Parquet files are supported and commonly used storage format. Functionality is included there to perform data science / analytics / data engineering works.

Data Security and Data Privacy approval processes following GDPR must be followed when designing, modyfing, or decomissioning data-driven applications.

#### Azure Monitoring and Logging

Azure Log Analytics and Azure Monitor are the services to monitor the application.

#### Quality Specs

As part of the CI/CD process, all projects are expected to include

* Static analysis of code (linting)
* Automated test (no minimum test coverage yet defined)
* Security scanning
* Deployment pipeline
* Deployment approval gates


