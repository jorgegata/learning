# Servers and Client Components 

Two foundational web concepts in top of this:

* The **environments** your application code can be executed in: server and the client
* The **network boundary** that separates server and client code

Client refers to the browser that sends a request to a server for the application code. It turns the response of a server into an interface the user can interact with.

Server refers to the computer in a data center that stores your application code, receives request from a client, do some computation, and send back an appropiate response.

Sometimes there is a tradeoff between performance and interactivity, as moving rendering/data fetching to server or component.

> The code you write for either Server or Client is not the same. Some operatoins are better suited for one environment or the other.

## Network Boundary

It is a conceptual line that separates both environments, and you put in the component tree where to put that boundary. Behind the scenes, the trees are splitted into two module graphs.

* Server module graph.
* Client module graph.

After Server Components are rendered, a special data format called React Server Component Payload (RSC) is sent to the client. It contains:

* The rendered result of Server Components
* Placeholders for where Client Components should be rendered and references to their JS files.

It consolidate both components and update the DOM on the client.