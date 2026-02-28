# DNS Record

> A DNS Record is a line of instruction in a database that tells the server how to handle a request for a domain.

## Types 

| Type | Full Name | Purpose | Example |
| ---- | --------- | ------- | ------- |
| A | Address | Maps a domain to a physical IPv4 address | `example.com` -> `192.0.2.1` |
| AAAA | Quad A | Maps a domain to a physical IPv6 address | `example.com` -> `2001:db8::1` |
| CNAME | Canonical Name | Maps an alias to another domain (an alias) -> `www.name.com` -> `name.com` |
| MX | Mail Exchange | Directs email to a specific mail server | `mail.google.com` |
| TXT | Text | Store arbitraty text (often for security/verification) | `v=spf1 ....` |
| NS | Name Server | Tells the internet which server "owns" the record | `ns1.provider.com` |

- The `A` record is usually the fastest as it does not require more steps that a direct resolution. However, if the server ip changes, you have to update this one. 
- A `CNAME` record points to another domain name ('I dont have my own address, just go wherever ``example.com`` is going'). If target domain IP changes, the service changes as well, but it requires an extra lookup. Also, you cannot use a CNAME for your "root" domain (you can use `www.example.com` but not for `example.com`)

## DNS Record Definition

If we want complete control over our domain traffic, we should define our DNS records in Terraform. If we let Wrangler handle the routing, it creates 'hidden' records for Workers that Terraform will not know about, leading to a messy configuration where one tool does not know what the other is doing.

> Terraform manages the "Static" records (A/CNAME for the main site), while Wrangler manages the "Dynamic" records (mostly CNAME-like aliases for Workers)

We can keep track of all `A` and `CNAME` dns records as we define it in the `.tf` file:

- `A` record would point to `sika.com`
- `CNAME` record would point to `blog.mysite.com`

> Wrangler is specifically for Cloudflare Workers: when you "publish" a worker to a custom domain using Wrangler, Cloudflare needs to route internet traffic to its "Worker Gateway" instead of a traditional server.

## Azure

Container App only allows for `CNAME` and not for `A` records in subdomain (only for APEX domain can be used such as `example.com`). The reason is that a CNAME points to the `azurecontainerapps.io` name which stays the same even if the IP changes behind the scenes.

Under the hood, cloudflare is a reverse proxy as it sits in the middle of the browser and the container app that points to `app.<hash>.<region>.containerapp.io`. 