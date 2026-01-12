# Blob Storage / Blob Container

> Blob Storage is a bucker for the internet

The fileshare mimics the traditional office hard drive with folders. The Blob Storage is design for modern web. Blob stands for **B**inary **L**arge **OB**ject (fancy say of any kind of file such as video, image, PDFs...)

It follows a hierarchy:

1. Storage Account: warehouse
2. Container: a generic bucket inside the warehouse (e.g. images, logs, backups)
3. Blob: the actual file inside the bucket

## Use cases

- Serving web assets: you dont store large images or documents inside the database, as it will make it slow and huge. So you upload the photo, it is saved in the Blob Container, the App saves the URL, and when the user visits the page the browser automatically loads the image from Azure Blob Storage using the URL.
- Dump Zone for data: as it is cheap, you dump data that it will be needed later (e.g. backups, logs)
- Static website hosting: if you have JS, CSS, and HTML (no server-side code such as TypeScript, C#, PHP), you can host an entire website from a Blob Container.
