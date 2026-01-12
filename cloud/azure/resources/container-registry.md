# Container Registry

> Container Registry is a specialized, high-security vault specifically for **Container Images**

You can think of it as your own **Private Docker Hub**.

When you build a containerized app, you create an image (specific snapshot that containes the code, the runtime, and all dependencies) to run that image on an Azure Server. You first need to park it somewhere secure, where the parking spot is ACR.

## Use case

ACR sits in the middle of your CI/CD pipeline:

1. Build: the CI/CD build the Docker Image
2. Push: the pipeline push the image into ACR
3. Pull: the hosting service (like AKS, Container Apps, or App Service) "pulls" the image from "ACR" to actually run it.

The reason we do this "private docker hub" is for security, speed, and privacy.

In general, you do not need a separate ACR for every app, you just use Namespaces to stay organized. 