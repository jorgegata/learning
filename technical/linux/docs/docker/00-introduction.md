# Docker / Podman

## Definition

> `docker` and `podman` are the same thing: tools that run "containers". The difference between them is the engine run under the hood.

`docker` is daemon, meaning that there is constantly a process running in the background (`dockerd`) and when you type in a command, you are talking to that process. This process has by its own sudo priviledges, so if someone "breaks out" a container and compromise the process, they have the keys for the entire server.

`podman` use daemonless architecture. The process start under the user account like opening a text editor. If someone hacks this, it has the same level permissions as your specific user account in the system

A container is a isolated environment for your code. It can be seen as a kind of virtual machine.

## Difference between image, container, and virtual machine

An **image** is a static, read-only file that contains everything needes to run an application: code, libraries, configuration, and the environment variables. This is a snippet, so if you want to change it, there is a completely new image.

A **container** is the actual process running on your CPU. You can start 10 containers from the same image, but once started, those are isolated.

A **Virtual Machine** is a completely emulation of a physical computer, including its own separate OS. 



