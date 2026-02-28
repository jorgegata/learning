# Network Architectures

## IPs

> If two machines have the same **Network part**, they can talk directly via Layer 2 (Ethernet/MAC). If the network parts are different, the packet must go to a Router (Gateway)

### Definition of IP and Subnet Mask

> The IP is a **hierarchical addressing system** that consists of 32 bits divided into 4 octets (8 bits each, going up to 256 and starting from 0, e.g. `192.168.1.15`). Sometimes you have a `/24` at the end, which is called the CIDR (Classless Inter-Domain Routing)

In linux, you can see the IPs via `ip addr`, but this is not enough. You need to know if the IP is in the house or in the internet, with the **Subnet Mask** comes in. The Classless Inter-Domain Routing (CIDR) is a shorthand for the subnet mask. It tells the computer which part of the address is network and which part is host, saying the number of bits reserved to network.  

> A subnet is a network inside a network

| CIDR Number | Subnet Mask | Total Host | Pragmatic Use Case|
| /32 | 255.255.255.255 | 1 | A single specific machine (often used in firewalls)
| /24 | 255.255.255.0 | 254 | Standard home/office LAN |
| /16 | 255.255.0.0 | 64 534 | Large Corporate Network or AWS VPC |
| /0 | 0.0.0.0 | The Whole Internet | Used in routing table as a "Default Gateway" |

### Reserved IP Ranges

There are some **private IPs** that should never be routed to the public internet.

- 10.0.0.0/8: used by almost all cloud providers (AWS, GCP, Azure) for internal networks
- 172.16.0.0/12: default for **Docker** bridge networks
- 192.168.0.0/16: default for home/small office routers
- 127.0.0.1 (Loopback): the machine itself

In a `192.168.1.0/24` there are two reserved addresses out of the (``/24`` - 256 addresses):

- Network IP: the `.0` in a /24
- Broadcast IP: The `.255` in a /24

## Routing

Linux decudes where to send a packet by looking at its **Routing Table**.

If rou run `ip route` on the terminal, you will see something like: `default via 192.168.1.1 dev eth0 proto dhcp`

Logic flow is:

1. Is it for me? if the IP is assigned to my `eth0` or `lo`, the CPU processes it
2. Is it in my neighbourhood? If I am `192.168.1.15/24`, and I want to talk to `192.168.1.20`, I send an **ARP (Address Resolution Protocol) request** ("who whas this mac address?") and send it directly. 
3. Is it outside? If i want to reach `8.8.8.8`, I dont know where that is. I send a packet to my **Default Gateway** (router, `192.168.1.1`) and it's the router problem now.

## NAT (Network Address Translation) - Translation between Private and Public

> Since we ran out of IPv4 addresses, the router uses **NAT**. It allows multiple internal devices to share one public IP and enabling them to communicate externally, assigning a unique port number. It hide's your internal private IP addresses from the outside world, acting like a basic firewall.

1. Your laptop has a **Private IP** (e.g. 10.0.0.5)
2. Your router has a **Public IP** (e.g. 203.0.113.42)

When you request a website, the router "translates" your private IP to its public one, remembers you ased for it, and sens the respose back to your laptop when it arrives.

## IPv6 in 2026

The IPv6 cannot be ignored:

1. Simplified: 2001:db8:85a3::8a2e:3709:7334 (The `::` replaces consecutive zeros)
2. No NAT: every device has a globally unique IP
3. In linux, if you use `ip -6 addr` to see these. Most modern Go/Python backends bind to `::` (all IPv6) which usually covers IPv4 too (dual-stack)

## Packet lifecycle

Think the **NAT device** as a machine where the processes are another internal machines, acting as ports

1. **Outgoing traffic:** A device want to send a packet to an specific IP (considering the IP is out of our subnet).
2. **NAT Device:** The machine routing table detects this and send it to the default gateway (router)
3. **Translate** Router translate the private IP to a public IP with a port (NAT)
4. **Forwarding**: modify the packet with a public IP and travels the internet
5. **Incoming resposne**: when the internet server replies, it sends the packet back to the router's public IP
6. **Reverse Translation**: Router check the table, swaps the public IP to the original private IP (using the port number), and forwards it to the correct internal device.

Sometimes high-security corporations use "Private VLANs" where even macines in the same subnet are forced to talk through a gateway for inspection (rare in home/standard dev setups)

## Processes inside machines

Imagine you have a machine that has the IP `192.168.1.20:8000` and a machine (kernel) with ip `192.168.1.15` wants to communicate with this. The port is just a **Tranport Layer** problem in the OSI.

- Network wires and switches/routers does not care about port `8000`. The only care about the packets going to your machine
- Once the packet hits the kernel, the kernel looks at the header and say: "This is for Port 8000, which process is listening here?"
- If software (Python server or node.js app) is "bound" to that port, the kernel hands the data to that process.

## Linux tools

### Networking 

The `net-tools` package that contains `ifconfig`, `route`, `arp` is officialy legacy.

You should use the `iproute2` suite, which is kernel-native and much faster.

| Task | `iproute2` | Legacy |
| ---- | ---------- | ------ |
| View/Set IPs | `ip addr` | `ifconfig` |
| Manage routes | `ip route` | `route` |
| Check ARP tables | `ip neigh` | `arp` |
| Interface Stats | `ip -s link` | `ifconfig` |
| Socket stats | `ss` | `netstat` |

> use `ss -tulpn` to see all listening ports and the exact Process ID (PID) owning them. It is the most common command you will run as a Systems Engineer

**What does it mean socket here?**

### Connectivity and diagnosis

When the network is "slow" or "down", you use these tools

- `mtr` (My Traceroute): the gold standard in 2026, combines `ping` and `traceroute` into a live, updating display

- `ping` still useful to see 'is it alive'? (`gping`) for visual, real-time graph

- `tracepath` is a faster version of `traceroute` that does not require sudo privilages and automatically detects MTU (Maximum Transmission Unit) sizes.

### DNS & Domain Troubleshooting

- `dig` (Domain Information Groper): use `dig +short` for just the IP or `dig +trace` to see the entire resolution path from the Root servers down

### Packet Analysis (Truth tools)

If you cannot see the bug in the logs, you look at the raw packets.

- `tcpdump`: cli workhorse, you can capture traffic on a remote server and save it to a file (`.pcap`)

- `tshark`: command-line version of Wireshark. Powerful for filtering and analyzing captures directly in the terminal without GUI

- `wireshark`: move the `.pcap` file from your server to your local machine and open it in Wireshark for deep, visual protocol analysis

### Application-Level Testing

- `curl` essential for API in 2026 (`curl --http3` for modern web stacks)
- `nc` (Netcat) / `socat` use them to test if a raw port is open (`nc -zv 192.168.1.15 8000`)
- `iperf3` to test **bandwidth** between two machines. If you need to know if your network is actually capable of 1Gbps, you run `iperf3`

### Subnetting and planning

`ipcalc` so you never do CIDR math in your head

`ipcalc 192.168.1.15/26` -> Address / Netmask / Wildcard / Network / HostMin / HostMax / Broadcast / Hosts-net.

> The broadcast is the **very last possible address** in a subnet. It is created by taking the network prefix and setting all the "Host" bits to 1.

You rarely send data to a broadcast address manually, but the protocols your apps rely on use it constatnly.

- ``dhcp`` (getting an IP): when you plug a linux machine into a new network, it has no IP. It sends a "dhcp" discovery packet to the `255.255.255.255` (the "global" broadcast) saying: 'Im here, is there a router that can give me an IP?"
- ``arp`` (Finding MAC Address): it sends to the broadcast "Who has 192.168.1.250?
- ``service discovery``: older protocols use broadcast to announce their presence to everyone on the Wi-Fi

In 2026, we are moving from 'broadcast' (one-to-everyone, IPv4) to 'multicast' (one-to-many) so only devices interested listens. IPv6 has no broadcast address, it uses multicast for everything.

## Miscellaneous

### Socket

Technically, a socket is an **internal endpoint** for sending or receiving data.

In a pragmatic way, it is the combination of 5 specific values (often called the **5-tuple**):

1. Source IP
2. Source Port
3. Destination IP
4. Destination Port
5. Protocol (TCP or UDP)

If any of these 5 values changes, it is a different socket. This is how a single web server (on port 443) can talk to thousands of different browsers simultaneously: each connection creates a unique socket "tuple".

When you run `ss -s` you are asking for a "snapshot" of all active network endpoints. The key terms are:

- TOTAL: total number of "network files" currently in the kernel memory
- ESTAB: active connections
- TIMEWAIT: socket closed but kernel is keeping them "alive" for a minute or two to ensure delayed packets on the internet are handled.
- ORPHANED: socket that are no longer associated with a PID, still being cleaned
- LISTEN: sockets waiting for incoming connections

> Linux treat sockets as files, so you can see in the **networking view** using `ss -tulpn` or **system view** `ls /proc/self/df` or `lsof` seeing entries like ``socket:[12345]``

The types are TCP, UDP, and Unix Domain Sockets (they dont use IPs or Ports, they use **files**, making it much faster within the same machine because they skip the entire network stack logic)

- When you do `server.listen(8000)`, the OS creates a socket in the `LISTEN` state
- There is a linux limit of sockets opened
- a port is a number, while a socket is a live, active connection using that port.

NEXT: TCP 3-way handshake (process that actually creates an "Established" socket in your `ss -s` output)
