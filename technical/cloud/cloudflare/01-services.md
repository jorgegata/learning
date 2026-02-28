# Cloudflare services

> A "service" is not an official Cloudflare term, but a **logical grouping of resources** that you manage as a single unit.

At Sika, we split the services into multiple declarative terraform files `.tf` and configuration files `.hcl`.

## Benefits of state splitting

- **Reliability:** if you have several websites (Zones) in one state file and you make a syntax error or a provider bug occurs during `terraform apply`, you could corrupt or delete all of them. If you split them, they cannot touch phisically
- **Performance:** if you need to plan and make API calls for every single resource in that file, you end up with rate limits.
- **Team Concurrency**: terraform locks the state during an update. With separation, multiple people can work on multiple services in parallel.

## Technical trade-off of splitting

1. Run every time `terraform init`
2. Manage multiple repositories or backends
3. Duplicate code can creep in (solved by using **Terraform Modules**)

## Worker

> Serverless function that runs code (TypeScript, Python...) and is deployed on the Cloudflare's edge network. It is right near your users, enabling low-latency applications by executing tasks like API gateways... it integrates with other Cloudflare features.

To make a Worker reachable at a URL like `api.example.com`, you have two technical paths: 

> If Wrangler creates a record and Terraform tries to manage the same record, it fails.

1. The Wrangler Way (automated): when an engineer writes code and use `wrangler deploy`, Wrangler can automatically create a "Worker Route" or a "Custom Domain", it is fast and lives inside the application code (`wrangler.toml`)
2. Terraform Way (Managed): you manually define a DNS `CNAME` or `A` record in a `.tf` file that **points to the Cloudflare edge**

