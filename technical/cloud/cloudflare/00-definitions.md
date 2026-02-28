# Cloudlare

## Instance

>... they have a separate instance called `Sika SL AS` which contains the subdomain `apps.sika.com`

This is a semi-technical term that they have partitioned the Cloudflare setup so that one specific team can manage their own area without interfering with the rest of the company.

If someone makes a mistake in the DNS setting, they can only break `apps.sika.com`, and they cannot break the main corporate website or other internal systems as they do not have access to other 'instances'.

This allow the `Web and eCommerce team` to create its own `A records`, `CNAMEs` and `Workers` for that subdomain without needing to ask the main IT department for permission every time.

It should also contain:

- Own API Keys: specific Key/Token that only works for this company
- WAF Rules: they can have high-security firewall rules for the eCommerce apps that are not applied to the rest of the company
- Billing/Limits (might have their own quota for Workers or Page Rules)