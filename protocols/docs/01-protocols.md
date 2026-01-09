# Standard protocols engineering

The 7-layer Open Systems Interconnections (OSI) establishes a framework to understand and describe how communication happens at multiple levels. There are some common standards protocols in Engineering.

It is imperative to dominate these protocols as we enter in the world of 5G, AI, and edge computing.

## Internet Protocol (IP) - network layer

Assigns unique addresses to **devices** communicating over the network and routes data packets across the network. It ensures data is delivered to correct destination.

There are two versions (IPv4 and IPv6). This is foundational to all internet-based communications, including web, cloud, and Internet of Things (IoT). 

## Transmission Control Protocol (TCP) - transport layer

Establish a connection between devices, verifies data integrity, and retransmits lost packets. It ensures reliable and ordered data delivery with acknowledgments. TCP works IP to ensure that packets arrive in the **correct order** and are not corrupted during transmission.

Sender -> IP Packets -> Server -> Receiver
<----------------------------------------> (TCP/IP)

Is the standard protocol used everywhere, including web browsing, file transfer, and remote logins

## User Datagram Protocol (UDP)

Core protocols of IP. It sends data without error checking or delivery confirmation. Unlike TCP, UDP is connectionless and does not guarantee delivery, order, or error checking. UDP is lightweight and efficient option uses in cases that you need time-sensitive transmissions.

## Hypertext Transfer Protocol (HTTP/HTPPS)

Foundation for transferring web pages and other resources (hypertext) to the World Wide Web (WWW). HTTPS is a secure version of HTTP and uses SSL/TLS encryption to protect data transmitted between a web browser and a HTTP server (Request to server -> Response from server). It is transmitted over the TCP/IP protocol (HTTP on port 80, HTTPS on port 443)

## File Transfer Protocol (FTP/SFTP)

SFTP is a secured protocol of FTP that transmit using the SSH.

You have two TCP connections, one for control (port 21) and one for data (port 20). The connection is done through TCP/IP connection. You have a Client and a FTP server that operates over a TCP/IP connecion.

The client request a file, and the server transfer it to the client. Before the request, a connection has to be established between the client and the FTP server using credentials. 

Mainly used for firmware updates and data backups from embedded systems.

## Domain Name System (DNS)

DNS translate human readable domain name (`jorgegata.com`) to numerical IP addresses that computers use to identify each other. DNS used in systems that dinamically connect to cloud resources. 

## WebSocket

A communication protocol that provides full-duplex, bidirectional real-time communication between a client and a server over a single, persistent TCP connection. Unlique HTTP that has a request-response model, WebSockets enable real-time, continous data exchange.

Used in protocols that need low-latency, two-way communication such as chat applications, online games, or live dashboards.

## GraphQL protocol

GraphQL is both:
* A query language for API
* A runtime to execute those queries

There are very important aspects:
1. It only has one endpoint (instead of multiple such as HTTP/S that can have `/users`, `/sales`).
2. The client defines the shape of the response

```graphql
query {
    user(id: "123) {
        name
        posts {
            title
        }
    }
}
```

You get back exactly `name` and `posts.title`, nothing more and nothing less from User type.
3. Schema and strong typing -> server define a schema with type (contract between the server and the client)
4. Resolvers - server-side function that fetch actual data for each field in the schema

Very useful when:
* Want to minimize data transfer by questing only needed fields
* Fetch related entities in one request (avoid REST N+1 problem)
* Single GraphQL in front of multiple backend (service aggregation)
* Rapid evolving frotend (they can request new field combinations wihtout backend changes)

Instead of the server deciding the structure to send back, the user desribe exactly what it wants. It has more flexibility for clients but more complexity in server implementation and query optimization.

## gRPC

Google Remote Procedural Call (gRPC) used for service-to-service communication, highly used for communication in a microservice structural architecture. It is over HTTP/2 protocol, allowing for unary, client-streaming, server-streaming, or bidirectional communication (streaming). Poor browser capabilities

## Webhook

Server makes an HTTP request (not the client) to the client when an event happends.

1. Client registers a URL with the server ("call me here when X happens")
2. Server stores that URL
3. When event X occurs, sever sends an HTTP POST to that URL
4. Client endpoint receives it and proccesses it.

This is good for payment notifications, git push events, messaging, or any "notify me when something happens" scenario. 