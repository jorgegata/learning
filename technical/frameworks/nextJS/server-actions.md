# Server action

Asynchronous function that executes on a server side (node server). It is usually a POST method. 

## Can run on both Client and Server Component? Or are just those being called there and run on server

They can be called on both Components, but always executes on the server side.

## How it works when called from Client Components vs Server components

Client:

1. Automatically create an endpoint for that action
2. Client makes a POST request to the endpoint
3. Server runs the function
4. Result is back to the client

Server:

1. Next create the endpoint
2. Form submission or call triggers a request to server

## Definition scope

Server Actions can be defined:

* In different modules: reusable action, client component usage, complex/large actions
* Inside Server Components: function specific to component, better DX, closure over component scope

