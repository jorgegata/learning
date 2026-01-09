# HTTP Layer

HyperText Transfer Protocol (HTTP) layer is a network protocol that allows the transfer of information in a content-agnostic way through the `Content-Type` header (images, media, binary executables, JSON, pickled-objects and in general text) through a client and a server.

The workflow consists on a client sending a request to a server WITH A SPECIFIC DATA FORMAT (signature of the HTTP request), which parse this request and perform an specific action, sending a response back to that client. The information sent is done through the Transmission Control Protocol (TCP) and Internet Protocol (IP) for communications for < HTTP/3 versions.

HTTP has a variation with Transport Layer Security, TLS (HTTPs) that encrypt the information at the moment of the openning connection, so all information sent in this transaction is fully encrypted, avoiding the sniffing or tampering of data.

It has several versions, such as HTTP/1.0, HTTP/1.1, HTTP/2, HTTP/3 (QUIC over UDP, not TCP). The 1.0 used open and closes connections, while in the 1.1 introduced the 'keep-alive' format of the connecctions by default. HTTP/2 even goes further with this, allowing multiplexing.

HTTP listens on port 80, while HTTPs listen on port 443 by default.

---

## Headers Format

### General Headers

| Header | Example | Purpose |
| ------ | ------- | ------- |
| Date | Thu, 19 Dec 2024... | Response Timestamp |
| Connection | keep-alive | Connection management |
| Cache-Control | no-cache | Caching directives |

### Request Headers

| Header | Example | Purpose |
| ------ | ------- | ------- |
| Host | api.example.com | Target server |
| User-Agent | Mozila... | client software identification |
| Accept | application/json | acceptable response format |
| Accept-Language | en-US | Preferred language |
| Accept-Encoding | gzip | supported compression |
| Authorization | Bearer {token} | Authentication credentials |
| Cookie | session_id=abc123 | Stored cookies for this domain |

### Entity Headers

Describe the body

| Header | Example | Purpose |
| ------ | ------- | ------- |
| Content-Type | application/json; charset=UTF-8 | Body format |
| Content-Length | 68 | Body size in bytes

## Request format 

1. Request line: `method`, `path`, `query string`, `http version`
2. Headers (zero or more header lines): `general headers`, `request headers`, `entity headers`
3. EMPTY LINE (CRLF)
4. BODY (optional): format must match the `Content-Type` header

**As an example**

POST /api/v2/users?notify=true&format=json HTTP/1.1 --> REQUEST LINE
Host: api.example.com --> HEADER
User-Agent: Mozilla/5.0
Accept: application/json, text/plain, */*
Accept-Language
...
                --> CRLF LINE
{"username": "alice", "email":"alice@example.com"} --> PAYLOAD (BODY)

---

## Response format

It consists of

1. Status line
2. Headers (zero or more)
3. Empty Line (CRLF)
4. Body (optional)
   
**As a high level example**

HTTP/1.1 201 Created
Date: Thu, 19 Dec 2024...
Server: nginx/1.24.0
Content-Type
...
{"id": 42, "username": "alice", "email": "alice@example.com"...}

### Status Code

| Range | Category | Examples |
| ----- | -------- | -------- |
| 1xx | Informational | 100 Continue, 101 Switching protocols |
| 2xx | Success | 200 OK, 201 Created, 204 No Content |
| 3xx | Redirection | 301 Moved Permanently, 302 Found, 304 Not Modified |
| 4xx | Client Error | 400 bad request, 401 unauthorized, 404 not found |
| 5xx | Server Error | 500 internal server error, 502 bad gateway, 503 service unavailable |

### Response Headers

The **General** are the same as the request

The **Response** headers are:

| Header | Example | Purpose |
| ------ | ------- | ------- |
| Server | nginx/1.24.0 | server software |
| X-Request-ID | ... | Request tracking identifier |
| Location | /api/v2/users/42 | Redirect target or created resource URL |
| Set-Cookie | session_id=123xbc; Path=/; HttpOnly | Cookies to store on client |

The **Entity Headers** are the same, but also with `Content-Encoding` in it.

The **empty line** contains `\r\n`

---

## Tools

### curl (client url)

The potential tools to communicate with other machines hosting a web server are multiple. The packaged used in Unix systems is `curl` that allows you to transfer data from/to a server, sending requests and receiven responses, directly from the terminal without the need of scripts, though many distributions have it pre-installed.

**`curl` can be used both within the terminal and within scripts**. It supports a lot of protocols, such as: HTTPS, FTP, SFTP, SCP, SMTP, LDAP...

Other tools can be:

- **`wget` is usually pre-installed on linux, but focuses more on downloading files**
- **httpie** is a user-friendly HTTP client
- **nc (netcat)** is used for a lower-lever, raw TCP/UDP connections

### requests (Python)

> If you want to use async support, use `httpx` instead.

This does exactly the same as `curl` might do but in a Pythonic way. 

```python
import requests

response = requests.post(
    url="a"
    params={"notify": "true"}
    headers={"Authorization": "Bearer token"}
    auth=("user", "password")
    json={"username": "alice"}
)
```

```bash
curl -X POST \
     -H "Authentication: Bearer xyz123" \
     -H "Accept: application/json"
     -d '{username: "alice"}'
     "https://api.example.com/users?notify=true"
```

> curlconverter.com — paste curl, get Python code. You can also do `uncurl` library in python. 

### fetch (Modern standard in browser and node.js +18 or axios)

### got (node.js only tool with powerful, retry support)

### libcurl (C, lowlevel and library behind the `curl` CLI)