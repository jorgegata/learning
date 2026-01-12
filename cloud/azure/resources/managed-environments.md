# Azure Managed Container Environment

## Definition

> Container App Environment gather one or more containers where the live. It provides the **network**, **security guards**, and **utilities** such as logging in a shared state.

## Capabilities

These are the key considerations.

- Managed **Private VNET** between apps (same network), or custom VNET plugged into the environment with a Service Endpoint/Private Endpoint
- Writes the state into the same **Log Analytics Workspace** (shared utilities)
- Dapr, the environment manages the "state" and "pub/sub" settings for all apps at once
- **FileShare** attach to the environment level. Individual Container Apps can "mount" a folder sharing data within it (`/data`) (please, refer to [fileshare docs](/docs/azure-resources/fileshare.md))
- Env can get its own **Managed Identity** (usually to pull certificates from Key Vault). Each Container App itself gets its own **Managed Identity**
- **Azure Container Registry:** you let the env access for the images stored in the ACR giving the Container's App Managed Identity the `AcrPull` role. 

## Decisions

When to choose one Container App Environment or multiple Environment

| Use Case | Pragmatic Choice | Why? |
| -------- | ---------------- | ---- |
| microservices for 1 app | single environment | need to talk to each other fast and share logs |
| production vs dev | multiple env | dont want a "buggy" dev pipeline eating cpu of the prod env |
| different projects | multiple env | dont want Team A to share the same network, security, and utilities as Team B | 