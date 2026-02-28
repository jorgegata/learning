# Server and Client Components

## Concepts

- **Bundling** -> Packaging content to be shipped to somewhere (Sever bundles JavaScript to ship it to the browser)
- CSR (Client side rendering) -> When you visit, you download JavaScript that creates the HTML in your browser
- SSR (Server Side Rendering) -> Server construct the page and send it to you 

## What React Components Do

The server is smart enough to understand which parts are just for displaying (SSR) and which part you need to interact to construct (CSR)

## Server Components

### What is a Server Component

1. It is a component that executes on the server-side and renders ahead of time, before ``bundling``, in an environment separate from your client app or SSR server.

2. Node server that processes your code, figures out the final HTML, and sends it to the user (browser)

### How does look like a Server Component

* Pure server component (just ``async`` function with ``await``) that returns pure HTML
* Server component with a child client component that returns HTML + a javascript function
* Server component with Server Action defined inside server component (encapsulation layer) - returns pure HTML body


```jsx
// no specific `use client`
async function ProductsPage() {
    const product = await db.query('SELECT * FROM products');
    const data = await fetch('https://api.example.com') {
        headers: {'API-Key': process.env.SECRET_API_KEY}
    }

    // Cant use useState, useEffect, onClick...
    // Cant access browser APIs (window, localStorage...)

    // it returns a HTML rendered direcly
    return (
        <div>
        <h1>Products</h1>
        ...
    )
}
```


## Client Components

### What is a Client Component

1. Client side rendering that process is done on the user's browser instead. This are usually JavaScript blocks (React Components) that are necessary for interactivity.

> Usually, you ship the static component that is rendered with a Server Component part (Server Component) and you ship the interactive component that is rendered with a Client Component (Client Component)

## How a Client Component does look like?

```jsx

'use client'
function Component({ params }) {
    return ( 
    <div>
        HAHA
    </div>
    )
}

```
