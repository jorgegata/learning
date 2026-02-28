# App Registration

## 1. App Registration

> An application needs to be recognised as a "Technical User" in the system. For that, you need to do "App Registration" to be visible through all tenants, and then create the 'user' called 'Service Principal'

The App Registration needs to be done manually, activating the 'Application Developer' role at Priviledge Identity Management to register it (automation of this is cumbersome as we need to access the **Microsoft Graph Resource**, requiring extra-permissions)

```bash
# Login to Azure
az login

# Create App Registration
APP_REGISTRATION_NAME="d-sp-weu-epdinput"
echo "Creating App Registration: $APP_REGISTRATION_NAME"
APP_ID=$(az ad app create --display-name "$APP_REGISTRATION_NAME" --query appId -o tsv)

# Create Service Principal
echo "Creating Service Principal"
SP_ID=$(az ad sp create --id $APP_ID --query id -o tsv)

echo "App Registration ID: $APP_ID"
echo "Service Principal ID: $SP_ID"

# Create Client Secret
CLIENT_SECRET=$(az ad app credential reset --id $APP_ID --append --query password -o tsv)
echo "Client Secret: $CLIENT_SECRET"
# IMPORTANT: Save these values securely!
```

## 2. Federated credentials

> The **app id** you have just created is the one that we will give a Federated Credentials to in GitHub.

Please, execute the `create-federated-credentials.sh` script in the `scripts/` folder in order to do that.

> **PLEASE NOTE THAT THESE STEPS ARE NOT MANDATORY IF THE ROLES ARE GIVEN THROUGH AN AZURE GROUP INSTEAD OF DOING IT MANUALLY**

## 3. RBAC to Service Principal

Assign a RBAC role to the Service Principal at the Resource Group Level. This is configured through the `.bicep` file.

## 4. Deploy RBAC to Resource Group

We need to deploy to each Resource Group the Service Principal Roles using the `.bicep` module straight away.

> Consider that the three environments (dev, prod, test) where we deploy the application are parameterized in the RG level. 
```bash
# Deploy RBAC to DEV
az deployment group create \
  --name "rbac-dev-$(date +%Y%m%d%H%M%S)" \
  --resource-group "d-rg-weu-epdinput" \
  --template-file modules/rbac-assignments.bicep \
  --parameters servicePrincipalId=f9538408-f60b-4238-82ae-811058197489 \
  --parameters roleDefinitions=@modules/roleDefinitions.json
```

## 5. Add GitHub Secrets to the Environment

1. Repository --> Settings --> Secrets and Variables --> Actions
2. New Repository Secret

| Secret Name | Value | Description |
| ----------- | ----- | ----------- |
| `AZURE_CLIENT_ID` | $APP_ID | App Registration ID |
| `AZURE_CLIENT_SECRET` | $CLIENT_SECRET | App Registration Client Secret |
| `AZURE_TENANT_ID` | Your tenant ID | Get with `az account show --query tenantId -o tsv`
| `AZURE_SUBSCRIPTION_ID` | Your general Subscription ID `azure account show --query id -o tsv`| For general deployment |
