# Resource endpoint

## Private Endpoint

> A private endpoint can be seen as a "Network interface endpoint" that physically plugs a resource (like a Storage Account or SQL Database) into a subnet

Azure Services usually have a public URL (public IP through DNS) that lives on the internet. Even if you have a firewall, the traffic still "goes out" to hit that public address.

When you create a Private Endpoint:

- Azure creates a **Network Interface** inside one of your VNET subnets
- That NIC is given a **Private IP** from your own range (e.g. 10.0.1.5)
- When the VM talks to `10.0.1.5` is talking directly to the Storage Account over a private, internal connection

> A **Private Endpoint** is considered a separate resorce

In order to construct a good workflow, these are the items to consider:

1. The target resource (PostgreSQL service)
2. The Private endpoint (i.e. connection logic)
3. The Network Interface NIC (i.e. the actual "virtual hardware" plugged in into your VNET)

### Private DNS problem

The code tries to resolve the DNS and connect it through the public internet, getting Public IP (therefore not using the Private Endpoint). For that, you need a Private DNS Zone and link it to your vnet (privatelink.database.windows.net). When someone asks for the database, do not go to the public internet and say it is `10.0.1.5` instead.

## Service Endpoint

A **Service Endpoint** does not give the resource a private IP, instead, it "tags" your subnet's traffic so the Resource recognizes it coming from a trusted, internal source.

> It tells Azure to keep traffic between yout subnet and a service (like Storage) on the private Azure backbone, rather than routing it over the public internet.

- You would choose Service Endpoint if you want a quick, free way to secure traffic and do not care that the resource still uses its public IP address
- You would choose Private Endpoint if the resource must be invisible to the internet and exist entirely on your private IP space.

