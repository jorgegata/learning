# NextJS

NextJS is a framework in top of React Library. React is basically a library that allows to create User Interfaces in a painless way, with these main concepts:

* Components
* Props
* State
* Hooks

NextJS provide the in-top build capabilities, such as rendering the content either client or server side, fetching data... It provides the runtime to perform such action.

## React Concepts

### Components

These are functions that return a Document Object Model (DOM) in the function. Basically an HTML body that could be flat text and/or interactivity with javascript scripts.

The components are building blocks, so it can be composed of other components.

### Props

Parameters that are passed to the components as properties. This basically allow for dependency on the components for some params.

```typescript
function Button( {props} ) {
    return (
        <h1>Hello{props.name}
    )
}

<Button name="hello">
```

### State

State are variables that triggers re-rendering when the value of the variable changes. React handle this for you, and take a diff between the original DOM and the changed DOM. It is triggered with the useState() function

### Hooks

These are pre-defined functions that contains React Components by default. Among the most famous ones, these are: useState (re-render when variable change), useEffect (re-render when dependency change), useMemo (store in cache)... 

## NextJS architecture

### Runtimes

When we execute the React code underneath, we can do either in **Node.js** server (**build time or request time**), or browser **client runtime**. Some code run on the server, some on the client.

The server component is the default in app directory, and cliet component needs `use client` directive. 

The server component:

* Run ONLY on server
* Can access directly the database
* Zero JavaScript shipped to the client
* No hooks (useState, useEffect...) so no interactivity itself.
* Output is pure HTML

The client components

* Run on Server (initial render) AND browser (hydration + updates). Hydration is how React "attaches" to existing HTML that was already rendered by the server.
* Cannot be async
* Need `use client` at top of the file
* Full interactivity, traditional React

### Rendering pipeline

1. Request comes in app.com/products
2. Next.js matches route -> app/products/page.tsx
3. Server renders Server Components -> HTML
4. Server renders Client components -> HTML + JavaScript bundle
5. Send to browser:
    - Complete HTML
    - Javascript for Client Components
    - React hydrate Client Components (makes them interactively)

### Data Flow 

Inside the server component, you go for a constant variable considered as a Promise. You serve that from the server component to the client component, that can be rerendered if products change.

```javascript
function ServerComponent () {
    const products = await getProducts()
    return (
        <div>
            <Header /> /* Server Component */
            <Product products={products}> /* Client Component */
        </div>
    )
}
```
```javascript
function Product ( {products} ) (
    const [filtered, setFiltered] = useState(products);
)
```

### Caching Layers

It caches aggresively in multiple layers:

1. **Full Route Cache:** it is served as at Content Delivery Network (CDN)
2. **Data Cache:** fetch() results cached on server
3. **Router cache**: client-side cache navigation

### Key Files

- `layout.tsx`: persistent UI (navbars, sidebars)
- `page.tsx`: actual page content
- `loading.tsx`: shows while page loads
- `error.tsx`: error boundary
- `route.ts`: API endpoints
- `middleware.ts`: runs before requests (auth, redirect)

### Peformance Trick

Server Components can import Client Components, but not viceversa.
Always think about the Data Flow / Rendering pipeline, so it will be crystal clear for you.