# Architectural diagrams

For ``solution engineers``, architectural diagrams are key for successful project design, development, and maintenance. This serves as a blueprint for a complex system, ensuring alingment and clarity among the team.

As Sika convention, the diagrams are stored are either stored in the ``root README.md`` or in the `docs/assets` folder.

## What is an architectural diagram

Visual representation of a system's structure. It illustrates the various components of the system, relationship, and how they interact with each other. It is a blueprint from high-level system landscape to detailed flow and infrastructure.

At last, it bridges the communication between technical and non-technical stakeholders. 

## Why do we need those

* Improve collaboration
* Identify and enhace decision-making for architectural characteristics
* Risk reduction in development
* Increase efficiency and maintainability: as it provides clear representaiton

## How many types of Architecture Diagram

| System | Description | Example |
| ------ | ----------- | ------- |
| System architecture | provides whole system, including hardware and software, and network | ``draw.io`` Multiple Apps connecting among each other... |
| App Architecture | Specific app, detailing components, their interaction, and data flow | `draw.io` diagram, with boxes as components in their domains and communication protocol between parts |
| Integration Architecture | How different system and components connect and communicate between each other, including the protocols | `draw.io` diagram showing how the user authenticates (Resource Group with API Management and Workflow+orchestration) and Backend systems (Azure services, SaaS services, Web services...) |
| Deployment Architecture | Cloud-based deployment of the system, showing how the components are mapped to infra. Scalability and network | `draw.io` diagram visualizing the Network, Github Actions, Subnets, and Resources... |
| DevOps Architecture | How continuous integration and continuous delivery pipeline and interaction of various development and operations tools. | 

## Which type of diagrams

| Diagram | Description |
| ------- | ----------- |
| UML | How object in a planned database will function, and what relationships they have with each other |
| Class | Structural and behavioral. Great to use thoughout the planning process, as it shows a static representation of a system with all components and relationships |
| Sequence | Show in what order the operations occur. As an example, it can show the flow of activities in a database |
| State diagams | What happens to objects in a system under different circumstances, used best when modeling reactive systems |
| ER daigram are one of the most useful diagram types for developers |

## How it is done

1. Define scope and audience
2. Identify components and Relationship
3. Choose a Modeling Language and a Tool -> UML model or C4 model / draw.io / excalibur
4. Create and Refine: it is an iterative process, so you start from the very beginning

## When do you have to make an architectural diagram

1. Initial planning: critical to establish overall vision and structure of the system
2. During Development: more detailed diagrams can be created to guide implementation of specific features and components
3. Onboarding New Members: perfect to speed up the integration of new members.
4. System Maintenance and Evolution: updating or creating diagrams help to assess the impact and plan the work.
5. Stakeholder and communication

## Who creates an architectural diagram

1. System Architect / Lead Engineer: responsible for high-level system architecture and ensuring consistency across different diagrams
2. Software and Data Engineers: create more detailed diagrams for the specific components and systems they are working on. 

## Where is it stored

1. Centralized Knowledge Base -> Confluence
2. Version Control: this is stored for "diagram as code"
