# App Registration and Service Principal

App Registration is the global blueprint (global record across all tenants) and entity for an application in Microsoft Entra ID (Azure AD), defining its identity and permissions. Here you define application properties (name, client ID, supported account types, redirect URIs, API permissions)

The Service Principal is the local, tenant-specific instance created from that blueprint representing the app for sign-in and resource access within a specific organization's directory, allowing controlled permissions and consent. It manages access, permissions, consent, and signin detaiils for that tenant. It creates in the tenatn when you register an app, and in other tenant when a user from that tenant consents to use the app. 

## 

```bash
# Login to Azure
az login

# Create App Registration
APP_REGISTRATION_NAME="Sika-SIS-AS-YourProject-servicetype"
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