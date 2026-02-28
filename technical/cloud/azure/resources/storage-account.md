# Storage account

> You can see that as an **account** that allows you to create buckets within that account to store Blobs.

It is a management boundary and a billing unit to group together different types of data services under one "Identity". When you create it, it generates a unique URL namespace that everything inside follows it:

* Blob: `mystorage123.blob.core.windows.net`
* File: `mystorage123.file.core.windows.net`

It usually hold:

1. Blobs: images and videos (modern web)
2. Files: shared network drives (traditional networking)
3. Tables: simple and cheap NoSQL for small bits of data
4. Queues: a to do list for the app (e.g. App A put "Send Email" message in the queue, and App B picks it up and sends it)

## Problems

If you delete a Resource Group with the Storage Account inside that, you will loose everything. It is a bad practice to store backups in the same Resource Group that the **Development VMs** are placed (that's why the good practice of one resource group per environment)