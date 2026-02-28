# Deployment pipeline

> Remember that deployment is the move of code from one machine to another. This can be moved to different cloud providers (Azure, GCP, AWS...) either orchestrated using **Terraform** or their unique language (e.g. Bicep Language)

In GitHub, whenever we do a trigger (manual, temporal frequency, event-based event), we can start what is so called a **workflow**. It will execute individual jobs with steps inside that to accomplish an specific purpose with it.

Usually this is done for `deploy.yaml` inside the `.git/workflows` (?) folder.

## Deployment pipelines

> There is one deployment pipeline per environment (`dev`, `test`, `prod`). **`main` is the equivalent for `prod`, do not forget. 

### Prerequisites

- Configured Resource Groups (or logical resource cluster space) per environment in your cloud provider. **Ensure permissions in your subscription**
- Federated Credentials for secure authentication from GitHub Actions (kind of a Managed Identity but for external applications)
- RBAC Assigments: permission for deployment in the resource group (RoleDefinition or what can GitHub do in the resource group)
- Set Up of GitHub Actions

GitHub Actions -> Permission to deploy -> Authenticate with Federated Credentials -> Resource Group

## Workflow

The workflow consist in the following

1. Developer makes changes in the code and push it to a `feature` branch, but not `main`, `test`, `dev` branches where those are attached to an Azure Environment. On every single commit:

    * Static analysis (linting, formatting, hinting, test)
    * Compile & Build

2. Whenever there is a merge into `dev`, a PR needs to be created and, at least, another Sika Colleague has to approve this PR to merge it.

3. Once merged the change into the branch, automatically deploys into dev, test, or master branches. **GitHub Actions configured for this** (let's create the deploy workflow in github)

[OPTIONAL]: It supports manual triggers (`workflow_dispatch`) or time-frequency triggers

4. Use Federated Credentials for secure authentication (there is no need to store client secrets in github). RBAC permission to follow the principle of least priviledge, and Resource Group restricts service principal actions

The only limitation is that the Resource Group should be created before running the process. 