# Server Side Rendering and Server Component

It is perfectly explained [in this video here](https://www.youtube.com/watch?v=jEJEFAc8tSI).

The page itself is a tree with the root node being the tree. It has NavBar, Footer, Main Page, Header.

In SSR: faster loading time, no interactivitiy, complete rendering of the tree (better for SEO)

React Server Component (dynamically updating certaing parts of the UI of the server without reloading the entire page), it allows specific parts of the UI to be rendered in the server, and update only these parts as needed.

Each component is in charge of fetching its own data. Before that, `getServersideProps` function was used to filter down from root to the components as props.

Server Components does not output HTML, but instead a kind of JSON that a javascript is parsing, then producing the HTML.

## So what is the deal with Hydration?

Client Side Rendering receives a HTML and a Javascript bundle needed to build the app. Once page is rendered, single page app with a smooth experience. DRAWBACK IS TIME WITH BLANK PAGE.

SSR build page in the backend, HTML is rendered and send to the browser (SUPER FAST, NO INTERACTIVITY), it might appear dynamic but now

Hydration: HTML reach the browser, then JS reach the browser, executed, rebuild, event listeners, and store any update with that session. When the process finishes, the app is considered hydrated.

Time between the first render of the app and app interactive - uncanney valley. Less part of the page (components) can be easily hydrated on demand. The JS bundle is also splitted in different parts.

## NextJS + React case

Before interactivity is reached:
* all data must be fetched
* all javascript has to be downloaded in the server
* hydration must complete before anything can be interacted 

React created Suspense, allow for HTML side streaming and selected hydration on the client. By wrapping in <Suspense>, you tell the component to be deprioritized.

