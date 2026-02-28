# Terraform

> Terraform is an open-source **Infrastructure-as-Code (IaC)** tool to define both cloud and on-premise resource in human-readable configuration files that you can version, use, and share

In the past, the programming of the infrastructure was done manually through clicks. **Terraform substitute those clicks with a configuration file.** The characteristics are:

* Declarative: you indicate "what" you want but not "how" you want it.
* Cloud Agnostic: it works with "GCP", "Azure", "Kubernetes", "Cloudflare" and other cloud services...
* Stateful: Terraform keeps a "State file" that acts as a source of thruth, mapping the code to the real-world resources it **has just created**

## Workflow

1. **Declare the infrastructure in the files** (declarative files, `.tf` and configuration files `.hcl`, kind of parameters to configure these resources defined)
2. `terraform init` to download the "providers" (plug-ins of the cloud instances) needed to talk to the API --> this creates lock files `lock.hcl` that locks provider versions (tools we use)
3. `terraform plan` it compares your current code with the cloud state and tells exactly what it will create, change, or destroy.
4. `terraform apply` it calls provider APIs and build the infrastructure.

## Benefits

1. Idempotency: does not matter how many times you run the code, infra will not change if there is no change.
2. Speed and automation: you can deploy a complex multi-region architecture in seconds by running a script.

