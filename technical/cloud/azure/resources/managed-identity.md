# Managed Identity

> This is the solution for "password problem", or in other words, authentication.

In the past, username and password was written in a configuration file somewhere in the repository. **Managed Identity** deletes the password entirely.

It is kind of a digital ID card that is provided to the resource (like Virtual Machine or a Web App). When your app wants to talk to postgres or storage account, azure checks this ID card and authorize the connection.

## Types

1. System-assigned (the "soul" of the resource): the identity is created inside the VM or Web App, so it's a 1-1 link. If you delete the VM, the ID card is deleted, good for simple apps where one server does one job.
2. User-assigned (the "access" badge): you create the identity as a **standalone resource** and then you plug it in to one or more VMs, so if you delete the VM, it still continues. This is good when you have a "cluster" of 10 web server that all need exactly the same permissions. You can create **one** User-Assigned Identity and give it to all 10 servers.

## Role inside a Resource Group

This is where "Identity" meets "Permission" (RBAC). In the resources (**Access Control (IAM)**), you give the **Reader** role to the **Managed Identity** of the webapp. Therefore, the resource group just manages the identity, but the permissions can stretch anywhere in the Azure account.

