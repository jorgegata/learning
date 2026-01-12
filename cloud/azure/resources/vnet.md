# VNET

## Defininition

> VNET offers the infrastructure connectivity for the resources to talk between each other or the internet.

The VNET is a **private data center** in the cloud. With a machine, it is usually linked external or internat through WiFi or Ethernet. 
The resources or the applications need to talk to the internet or local printer. In Azure, the application components (Virtual Machine, Databases, Kubernetes Clusters) needs that same connectivity

- **Security Isolation:** components inside the VNET can talk to each other using a private IPs (i.e. 10.0.0.5) but the outside internet cannot touch them unless you open a port.
- **Segmentation in Subnets:** You can slice a VNET into smaller pieces called Subnets: you might want your frontend web server to be exposed and the database locked-down in "Database subnet" that has no internet access
- **Hybrid Connectivity:** if you have an office server, you can connect the office network physically to your Azure VNET (using VPN), making the cloud look like an extension of your office

Some useful things is to choose IP ranges or divide subnets

## Use cases

The VNET offers connectivity. Sometimes, there is a specific resource group (management, billing, security) that considers this connectivity, and the rest of the components connect to this specific subnet.

