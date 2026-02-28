# Fileshare

> Fileshare is a **serverless Network Drive (NAS)** in the cloud. Similar to a "Common Drive" or a "Z:Drive" but hosted by Azure. There is no need to manage a window server to host it, so Azure manages the hardware and the OS for you.

It solves the problem of shared state across multiple machines. If you have a website running on three different VM, you have a problem, as VM#2 and VM#3 cannot see this.
To fix this, you mount the Azure File Share to the VM and it looks like a local folder, so read/write actions are instant.

## Use Cases

- Legacy system: you dont want to rewrite the code of a system that dont use modern Cloud APIs (like Blob Storage). So, you create a Fileshare and map it to the path.
- Jump box share: basically **VM** and **local laptop** can see the resource simultaneously
- Logs and diagnosis: you write files there so it is not spread across 10 different servers.

## Problems

This uses the Server Message Block (SBM) protocol, communicating over port 445. Most residencial Internet Provider and corporations block this to prevent WannaCry-style malware attacks.

