# DNS Records

## A Record

An ``A Record`` maps a domain to a `IPv4` address, being the most "primitive" way to connect a name to a server. You use this for your "Apex" or "Root" domain (the one without the `www`). Most DNS standards (RFCs) technically require the root domain to be an A Record.

If the server's IP changes, you need to update all the A record

## CName Record (Canonical Name)

A **CNAME** is an **alias**. Instead of pointing to an IP, it points to another domain name.

`www.example.com` --> `example.com` --> Look up the A record of `example.com` --> `192.0.2.1`

You use this for subdomains (`api`, `www`, `blog`). If you change your server IP in one A record, all CNAMEs pointing to it update automatically. Slightly slower and you cannot have other records on the same name as a CNAME.