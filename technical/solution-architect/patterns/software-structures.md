# Software Structures

Also known as software architectures. Most common patterns to build software are described here as in structure and workflow sense.

## Layer Type Pattern

Application divided into horizontal layers, with each layer handling a specific responsibility:

1. Presentation Layer (frontend)
2. Business logic Later (backend)
3. Data Layer (persistence)

### Frontend layer

The elements on this layer are:
* User interface components
* Client-side routing and navigation
* State management
* API communication logic
* Form validation and user input handling

### Backend layer

Elements on this layer are:
* API endpoints and controllers
* Business rules and workflows
* Authentication and authorization
* Data validation and transformation
* Integration with external services

### Persistence layer

* Database systems (SQL/NoSQL)
* Data access objects (DAOs/repositories)
* ORM mappings
* Caching layers
* Data migration and schema management

Easier to manage, test, and update the application by isolating changes. Communication flows from the top (presentation layer) down to the bottom (data) layers.

A typical example would be, from general to specific:

1. Database entity model - *simple logical description of the entities*
2. Domain model with simple relations - *fields describing the relation between business entities*
3. Domain model with detailed relations - *all potential fields: pk, fk, mandatory business attributes, optional business attributes, auditing/logging attributes*
4. DTO for specific UI needs - *containers that carry the data that is needed for a particular task or view, usually defined as a interface or type*

**Why do we use validation schemas in our applicaitons?**

Validation types are like `types` or `interface` class in typescript. These are good as it can check typing problems at compile step.
However, there is no validation at runtime, so if someone else (API, form...) tries to introduce wrong data, it will be accepted.

For the validation, in typescript we use Zod. The dev creates and schema, and you type inferred from the schema.


## Domain-Driven Design (DDD)

Philosophy that emphasizes a deep understanding of the business area for which software is built.

**The idea is to create software that closely aligns with real-world processes and needs**. It oadvocates for a clear and organized structure

### Database Model

Declarative, blueprint for your database. It tells how data is stored, organized, and manipulated. Efficient store and retrieval of data

### Domain Models

Conceptual representation of the business itself. It contains the rules and the behaviours. In a e-commerce, it would define what a "Product" and an "Order" is, and the rules around how they interact. It is independent of any database here.

Flexibility here is key, as only you can make specific changes to specific parts without changing everyting

### Application-Specific DTOs (Data Transfer Objects)

Specialized containers that move data between different part of the application. These are application specific as those are designed to carry only the data that is needed for a particular task or view.

A DTO might contain only name and price, omitting other details like the supplier info to make the data transfer more efficient. **Significant role in security here as you only send necessary data to the user interface.**



