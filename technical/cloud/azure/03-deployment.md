# Azure Deployments

In azure, the deployment of resources are **idempotent** by design, meaning that if you deploy the same template multiple times to the same environment, the end result should be the same as the first time without creating duplicates or causing errors.

> If you do an incremental (default) deployment, azure add or update resources defined in the template but **ignores** everything else already in the resource group. However, if you go for complete, it will exactly define what is in the template, **deleting** the rest of the resources that are not defined.

Sometimes you can face some errors such as `Conflict` or `409 Already Exists` error when you try to change a property that is **immutable** (Storage Account name or DNS prefix) or the resource name is globally unique and someone has just took it.

## Manual deployment through Azure CLI

If you have declared your resources with the parameters, and have defined the parameters in a `.json` file, you can deploy the resources already using a command.

```bash
# Always login
az login

# How to deploy a bicep script (template) with parameters using the CLI
az deployment group create \
--name <your_deployment_name> \
--resource-group <your_name_rg> \
--template-file <bicep_orchestrator>
--parameters <parameter_file>
--parameters <any_parameter_not_file> 
```

## CI/CD Pipeline

There is another way to deploy azure resources and our application code through Version Control Systems (the so called CI/CD pipeline). For that, we can either use **Jenkins** or **GitHub Actions**. Usually, we can either decide if we deploy manually through github or whenever there is a push in a branch in github. 

The different workflows of a repository are defined inside the folder `.github/workflows` in a `.yml` file.

> If more that one env, you should put inputs and environments for the env to be selected.
> Please, be aware that the ``paths`` environment would only trigger a change on the paths that are being included

What is needed to be defined in the workflow is:
1. Put the name of the Workflow
2. Put on what it is being triggered (`branches` or `workflow_dispatch`).
3. Create the jobs
4. Put on what is running, permissions, and steps
5. Steps usually come with name and uses/run. The most common steps are:
    1. Checkout
    2. Set env vars
    3. Login to azure using federated credentials
    4. Build the image
    5. Validate bicep template
    6. Deploy bicep template
    7. Logs the output of the deployment into the console.

### GitHub Actions Code Snippet

```yml
name: Deploy Infrastructure

on:
    push:
        branches:
            - main
            - qa
            - dev
        paths:
            - "infrastructure/main.bicep"
            - "infrastructure/modules/**"
            - "infrastructure/env/**"

    workflow_dispatch:
        inputs:
            environment:
                ....

jobs:
    deploy:
        runs-on: ubuntu-latest
        permissions:
            id-token: write # IMPORTANT FOR FEDERATED CREDENTIALS
            contents: read
        steps:
            - name: Checkout repository
              uses: actions/checkout@v3
            
            - name: Set Environment Variables
              run: echo "HELLO"
            
            - name: Login to Azure using Federated Credentials
              uses: azure/login@v1
              with:
                tenant-id:
                subscription-id:
                client-id: ${{}}
            
            - name: Validate Bicep Template
              run: azure deployment group validate
```
