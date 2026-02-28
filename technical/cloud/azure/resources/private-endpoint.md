# Private endpoint

> A private endpoint can be seen as a "Ethernet Cable" that physically plugs a public service (like a Storage Account or SQL Database) into that data center

Azure Services usually have a public URL that lives on the internet. Even if you have a firewall, the traffic still "goes out" to hit that public address"

When you create a Private Endpoint:

- Azure creates a **Network Interface** inside one of your VNET subnets
- That NIC is given a **Private IP** from your own range (e.g. 10.0.1.5)
- When the VM talks to `10.0.1.5` is talking directly to the Storage Account over a private, internal connection

This is considered a separate resorce, so you will see three separate things:

1. The target resource (PostgreSQL service)
2. The Private endpoint (i.e. connection logic)
3. The Network Interface NIC (i.e. the actual "virtual hardware" plugged in into your VNET)

## Private DNS Zones

This is the part where everyone gets stuck.

When the code tries to connect to the Azure URL, it tries to connect it through the public internet and gets a Public IP. If you get that IP, you are not using the Private Endpoint. Therefore, you need a Private DNS Zone and link it to your vnet (privatelink.database.windows.net).

When someone asks for the database, do not go to the public internet and say it is `10.0.1.5` instead.

## Differences with Service Endpoint

- Service endpoint uses Public IP, while Private Endpoint uses Private IP.
- Optimized route over Azure backbone for Service Endpoint, while the other remains private.
- Does NOT work from your office VPN, while the other WORKS from your office VPN.
- The cost is free for service, while the other is paid.
- Service Endpoint is just for basic security.