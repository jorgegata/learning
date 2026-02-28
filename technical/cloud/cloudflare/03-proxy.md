# Cloudflare setup

You can set up cloudflare to control and route the internet traffic into two potential options:

1. Proxy Record: takes the traffic, send it through Cloudflare's anycast IP addresses, and put it to the destination. Origin IP is hidden from the server, DDoS attack protection, caching, latency performance...

2. DNS-only Record: It resolves directly yo tou origin IP's addresses, and it bypasses cloudflare proxy layer (does not benefit from security and performance features of cloudflare).

> Considering the Security Requirements of Sika, **we need to set up Proxy Records**

## Certificates issuance/renewal

Whenever we want to certificate our Azure Container App to verify it belongs to Sika, we can either:

- Generate the certificate with DigiCert
- Bring our own certificate

If we generate it with DigiCert, the CNAME of the DNS record will not be exposed as it gives back an A/AAAA Cloudflare's anycast IP. For dns-only record, this can work but we will not have security and performance requirements.

If you bring your own certificate, you upload it to Azure and add a **TXT** `asuid` ownership record. Azure needs the `asuid` record is to make sure you are not hijacking someone else's domain. In this approach, there is no Azure/DigiCert CNAME restriction, at the cost of having to **issue and store** a certificate.

## Implementation

1. Generate a certificate on Cloudflare for your specific subdomain
2. Set the certificate and domain in Container App
3. Set the subdomain (deploy) on Cloudflare
4. (Optional) Adjust OAuth authentication Redirect URIs