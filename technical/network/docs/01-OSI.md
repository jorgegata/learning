# The OSI

The Open-System Interconnection (OSI) model is a standardize ISO concept that allows to understand how the system communicates at different deepness levels.

It is composed of 7 layers, from top to bottom in deep

## Layers

> When **debugging** you start at L7 seeing if it, for example, API is returning 500 and jump to Network Layer / Transport layer to see if you can reach the host/port. Intermediate layers are rarely the root cause in a modern cloud setup unless you are configuring the physical fabric.

| Layer | Description | Protocols |
| ----- | ----------- | --------- |
| 7 - Application | **"What the user sees"** The interface where the code interacts with **network**. It defined *how* the application request data. This is where you spend 90% of your time in APIs. | Websocket, gRPC, HTTPS/3, GraphQL, SSH, DNS, MQTT... |
| 6 - Presentation | **Translation & Encryption**. Ensure the data is in a usable format. It handles serialization (object -> binary), compression, and encryption (TLS) before the application logic processes it | TLS 1.3 (encryption), protobuf/avro (serialization), Gzip/broli (compression) |
| 5 - Session | **Conversation manager**. Maintain the state of the dialogue. It distinguishes between different request streams on the same connection | QUIC streams, RPC Connection Pools, Circuit Breakers |
| 4 - Transport Layer | **Host-to-Host delivery**. Focuses on reliability, order, and error-checking between two machines. It uses **Ports** to direct traffic to the specific processes. | UDP (new standard with QUIC) and TCP (Legacy reliability), ICMP |
| 3 - Network Layer | **Routing & Adressing**. Determines the best path across the Internet using **IP Adresses**, connecting different networks (subnets) together. | IPv4, IPv6, IPSec, WireGuard, BGP, OSPF |
| 2 - Data Link Layer | **Node-to-Node Delivery.** Transfer between two directly connected devices (same local network) using **MAC Addresses.** Switches operate here | Ethernet (802.3), Wi-Fi (802.11), ARP (IP --> MAC mapping), VLANs
| 1 - Physical layer | Actual hardware and raw signals where you do not program here, you just fix the cables | Fiber Optics, Copper (Cat6), 5G/6G Radio Waves |

In modern development (TCP/IP model), layer 5, 6, and 7 are usually lumped together into the "Application Layer". For example, in a `Go` or `Node.js` app, the TLS (L6) and the connection keep-alives (L5) are automatically inside the `http` package (L7): rarely interact unless you are implementing a custom protocol.



