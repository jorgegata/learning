# Certificates

A certificate is a **digital passport** for a website or a server.

1. Identity: it proves who you are because a trusted authority verified you.
2. The border agent trust the passport because they trust the authority that issued it.

In modern digital world, an SSL/TLS certificate pursues two main objectives:

1. Creates a "secure tunnel" encryption between the browser and the server to avoid "eavesdrop" on data (like passwords or credit cards). 
2. Proves that `example.url.com` actually belongs to your company and is not a fake site run by a scammer.

- **Root Certificate Authorities**: these are the master authorities and their identity cards are pre-installed in your OS and browser
- **Intermediate CA** to protect the master key, Root CAs use "branches" to issue the actual certificates
- **End-entity**: this is the specific certificate for your website or app. 

## Azure DigiCert

It is the government in azure that issues the certificate. It is a Certificate Authority (CA). It's job is to verify that a company owns a domain before giving the host a certificate.

**Subdomains must have a CNAME that maps directly to the app's generated `*.azurecontainerapps.io`** host. Any intermediate (e.g.) blocks issuance and renewal because CA cannot see the required direct CNAME. This requirement must be true at all times

- For apex domain we could use an `A` record but Cloudflare with Proxy Record would still reply with an anycast IP instead of Azure Container App, blocking issue and renew

Therefore, it needs Cloudflare's DNS-only during issuance and ongoing. Proxying hides the CNAME behind Cloudflare anycast IPs

## Bring your own certificate

> Upload your own certificate to Azure and still add Azure's txt `asuid` ownership record.

No Azure/DigiCert issuance step so no "direct CNAME" restriction. This setup supports Proxy Records and lets you keep full Cloudflare protection enabled.

### Implementation

1. Create a new certificate on Cloudflare for your specific subdomain. Save them into a temporal folder (`ORIGIN_CERTIFICATE`, `ORIGIN_PRIVATE_KEY`) in addition with the Cloudflare's root certificate (`CLOUDFLARE_ORIGIN_CA`). Concatenate the `.pem` and save them on Delinea's Secret Server and Github Environment Secret as a Base64 string.

2. Set the certificate and domain in the **Container App Managed Environment** -> `.bicep` file. Then in the container app you set Certificate ID and the customDomain

3. Set the subdomain in Cloudflare (first certificate, then set) --> contribute in the repository by modifying the DNS record there.

4. [Optional] Adjust OAuth authentication Redirect URIs: this is either `Auth Code Flow with PKCE programmatic setup` or `Hybrid Flow for Container Apps Easy Auth`

The certificates and the keys should be stored on Delinea's Secret Server as `Base64` strings.

The secret names should be set also in GitHub environment secrets in the repo of your project. This will be needed for the deployment of the application.





