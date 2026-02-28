# Key Vault

> **Azure Key Vault** is the **Safe** inside the building where you keep the things that are not Azure-native.

It is a centralized security system to keep:

- Secrets: API keys for 3rd party services, database connection strings, and passwords
- Keys: cryptographic keys for encrypting your own data
- Certificates: SSL/TLS certificates for your website (it can even handle auto-renewal for you).

## Use Case

> Store it in Key Vault, access it with Managed Identity.

You have an OpenAI API key. You cannot use Managed Identity becuase this is not an azure resource owned. You must use a password key. So you store it in the Key Vault, you create a WebApp Managed Identity, you allow the KeyVault to be accessed by this resource and the code asks KeyVault for the SendGrid key. Therefore, the code never has a password in it.

## Best practices

1. One vault per environment: Dont mix secrets of production with secrets on the development. Even if those are in the same Resource Group, create two different Key Vaults.
2. Common Setup: the keyvault must live in the same resource group, so if you decomission, everything will be decomissisoned
3. Enterprise Setup: the Key Vault is locked-down "Security RG" needed, and only the security team has access to it.

- Soft delete: you move it to a "trash can" for 90 days (saved from breaking production)
- Versioning: you keep track of your key versons
- Network Firewalls: if someone steal the login, they cant see the secrets unless they are inside your private network.

