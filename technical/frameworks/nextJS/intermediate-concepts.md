# Intermediate concepts

The real skill is knowing when your code runs (server vs client) and keep **Client Components small**. Everything else is just API surface area you'll Google whenever you need it.

You need to understand more or less the following concepts prior to go deeper here:

1. Rendering pipeline
2. Data Flow
3. High-level files
4. Caching system
5. Client vs Server component
6. React features (components, state, props, hooks)
7. Different runtimes (build runtime, request runtime, client runtime)

## Navigation

You do not use the <a></a> tags as it triggers full reload. You have a component called <Link href="/about"></Link>. You can do programatically navigation with ``useRouter hook`` and ``router.push(/dashboard)``

## API Routes (backend)

Please, refer what is a good API between the application and the persistence layer.
There are some communication protocols (HTTPS - RESTful API with methods GET/POST/PUT/DELETE, gRPC, GraphQL to leverage SQL syntax, WebSocket (real-time communication)). Please, refer to communication protocols to understand a little bit deeper about this concern.

## Data Mutations

The Server Action runs on server, so no API route needed ()

A Server Action is a function that lives on the server, and triggered by user interactions. Designed for mutations
API Routes: HTTP endpoints that accept any HTTP Request from anywhere. General pirpose.

### Before

You have to design the API endpoints (POST HTTP Request) that accept a request, parse it, perform an action, return a response (usually {"success": true}). From a client component, you fetch the API endpoint together with the request in method and body... The handleSubmit was inside the component function (scope, encapsulability, maintenability...)

With server action:

```typescript
async function createUser(formData) {
    `use server`;
    await db.insert( {name: formData.get('name') }); 
}

<form action={createUser}>
    <input name = "name" /> /* This is a component*/
    <button>Submit</button>  
</form>
```

You can fetch data with Server Actions, but it is technically stupid. If it's for client-side fetching, just put an API route that returns a JSON. If it's for server-side, just do it directly and return the component itself.

Fetching with API:

* Webhooks
* Single button clicks
* GET requests / data fetching from client
* Complex HTTP needs (streaming, special headers)
* Public APIs