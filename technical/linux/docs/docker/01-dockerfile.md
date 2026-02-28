# Dockerfile

> You want your image to be as small as possible. You do not need a python compiler or the npm build tools, only the "compiled" app.

## Definition

A `Dockerfile` is a file with a list of read-only layers and instructions. It allows for image construction.

The process of construction of an image is like a sub-filesystem inside your 'Host OS'.

Every time you do an operation like `COPY`, `ADD`, or `RUN`, a new layer is created. It reused the previous layer if it did not change as it has cache.

> If you change Line 3, ``docker`` invalidates everything after it and remove the cache. Put things that change least (e.g. OS updates) at top, and things that change most at bottom.

## Commands

| Command | Explanation |
| ------- | ----------- |
| `FROM` | Foundation that you should always use a specific version instead of latest to avoid breaking when a new version is released |
| `WORKDIR` ¦ Creates a directory and 'teleports' you into it. Never use `cd` in a `RUN` command, as it does not persis across layers. Use `WORKDIR` |
| ``COPY`` vs ``ADD`` | Use `COPY` for 99% of tasks. Only use `ADD` if you need to download a file from a URL or auto-extract a `.tar.gz` |
| `RUN` | Combine the use of `\` and `&&` to reduce the number of layers (e.g. `apt-get update && apt-get install -y ...`) |
| `CMD` and `ENTRYPOINT` | `ENTRYPOINT` is the "Command" (e.g. `python`). `CMD` (e.g. app.py). If you run the container with extra arguments, they overwrite ``CMD`` but keep `ENTRYPOINT` | 

## Multi-stage builds

The idea is the following:

1. Use a heavy image to build the app.
2. Teleport the result to a "tiny" image.

> Keep in mind that the order matters to leverage **layer caching**

```Dockerfile
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# STAGE 2: the production (tiny image, only what is needed)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Best practices

- Just like `.gitignore`, there is a `.dockerignore` that prevents to copy accidentally `node_modules` or `.git` folder into the image
- Always pins the versions, so no ``ubuntu:latest`` but `ubuntu:22.04`

## Example with a NextJS application

For **production** in 2026 is the **Standalone Mode** that tells Next.js to trace your code and only cope the absolute bare minimum files to run

so in ``next.config.js`` you should:

```javascript
module.exports = {
    output: 'standalone',
}
```