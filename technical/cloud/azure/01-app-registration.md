# App Registration and Service Principal

App Registration is the global blueprint (global record across all tenants) and entity for an application in Microsoft Entra ID (Azure AD), defining its identity and permissions. Here you define application properties (name, client ID, supported account types, redirect URIs, API permissions). It can be seen as a **Technical User**

The Service Principal is the local, tenant-specific instance created from that blueprint representing the app for sign-in and resource access within a specific organization's directory, allowing permissions assignments and consent. It manages access, permissions, consent, and signin detaiils for that tenant.

> The Service Principal is created in the registration tenant automatically when you register it. The moment a user from Tenat B wants to use your App and you give consent, Azure automatically creates a **Service Principal** in **Tenant B**, so it has its own local record of your app.

## Important keys

The most important values when we register an application are:

- APP_NAME, APP_ID, CLIENT_ID, CLIENT_SECRET, TENANT_ID

Although the name is important for humans to find the resource in the Azure Portal, it is **never** used in code or API calls to authenticate. You can change name any time without breaking the application.

> If you are creating an app that users from any company can log into (multi-tenant), you replace the specific **Tenant ID** in our code with the word `common`

## Code Snippet

```bash
# Login to Azure
az login

# Create App Registration
APP_REGISTRATION_NAME="<env>-sp-<datacenter_region>-<project_type>"
echo "Creating App Registration: $APP_REGISTRATION_NAME"
APP_ID=$(az ad app create --display-name "$APP_REGISTRATION_NAME" --query appId -o tsv)

# Create Service Principal
echo "Creating Service Principal"
CLIENT_ID=$(az ad sp create --id $APP_ID --query id -o tsv)

echo "App Registration ID: $APP_ID"
echo "Service Principal ID: $CLIENT_ID"

# Create Client Secret
CLIENT_SECRET=$(az ad app credential reset --id $APP_ID --append --query password -o tsv)
echo "Client Secret: $CLIENT_SECRET"

# IMPORTANT: Save these values securely!
```