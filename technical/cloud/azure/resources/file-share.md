# Fileshare

> Fileshare is a **serverless Network Drive (NAS)** in the cloud. Similar to a "Common Drive" or a "Z:Drive" but hosted by Azure. There is no need to manage a window server to host it, so Azure manages the hardware and the OS for you.

It solves the problem of shared state across multiple machines (or containers). If you have a website running on three different VM, you have a problem, as VM#2 and VM#3 cannot see this. To fix this, you mount the Azure File Share to the VM and it looks like a local folder, so read/write actions are instant.

## Use Cases

- Legacy system: you dont want to rewrite the code of a system that dont use modern Cloud APIs (like Blob Storage). So, you create a Fileshare and map it to the path.
- Jump box share: basically **VM** and **local laptop** in the same subnet can see the resource simultaneously
- Logs and diagnosis: you write files there so it is not spread across 10 different servers.

## Characteristics

- Performance tier: you might choose between **Standard (HDD)** or **Premium (SSD)**. The performance is also tied to the *size* of the share
- AD / Entra ID integration: if you want "User A" to see Folder A, but not Folder B, you have to sync your Azure File Share with Active Directory (more complex to set up)
- Authentication: you can do Managed Identity, or also with storage account name and the secret key.
- Snapshots: you need enable **Share Snapshots** so you can roll back a file or the entire drive to a state it was, for example, 4 hours ago

## Problems

This uses the Server Message Block (SBM) protocol, communicating over port 445. Most residencial Internet Provider and corporations block this to prevent WannaCry-style malware attacks.

