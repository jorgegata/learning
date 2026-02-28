# Analysis codebase

General topics that are interesting to revisit in order to learn

## React.FC

It displays a React Function Component in a function variable to indicate is a Function Component. Legacy, usually we declared directly the props, referencing the interface

*Legacy*
```typescript
const Card: React.FC<CardProps> = ({
    prop1,
    prop2,
}) => {}
```

*Modern*
```typescript
const Card = ({
    prop1,
    prop2
}: CardProps) => {}
```

## UseState

React Hook that returns the current Value and it goes from input the initial value (usually a prop). Sometimes you combine it with a setter function of the prop

```typescript
const [isExpanded, setIsExpanded] = useState(defaultExpanded);
```
Order matters here, so revise the concepts of **Destructuring in typescript**

## className

The className is a prop inside the DOM <div></div>. **It is how you assign CSS classes to HTML elements in React/JSX**

## export at the end of the file

Usually, you define everything and at the end, you include a line with **export** exporting all the function variable names, and **export default** to define the real default export.

## Tailwind CSS High-Level

The tailwind is basically an utility-first CSS framework (all the CSS effects are pre-defined, customizable, and tree-shaken by default in the library, you just concatenate the name of the utilities with spaces).

## className prop

To have a centralized component that allows for customizable CSS with a className Prop.

## When to use <a> vs <Link>

We use <a> for external navigation, downloading, anchors on same page...
When it is for internal navigation, we use the React Component <Link>

## What is a <div>

This is the most general container element in HTML. Think about it as a container. It literally stands for "division" or "divider". It's a blank box with no semantic meaning, no default styling. You use it to **group other elements** and apply styling/layout to them.

Other elements are <div> (generic container, no semantic meaning), <section> (semantic section of content), <article> (self-contained content), <header> (header section), <main> (main content are), <span> (inline container, does not break to new line.)

## Can we use async function for Server Components? And for Client Components?

In Server Components, it can be used. It is run on the server only. Remember the **Rendering Pipeline**. 

In Client Components it cannot be. They need to be re-rendered at any time, as well as hanlde interactivity, state, effects... React cannot suspend the rendering tree.

Async data in Client Components, you either useEffect + useState, or you fetch in in a Server Component and pass it as a prop.

## Arrow function or keyword function

arrow function -> const functionName = ({props}) => {body}
keyword function -> functionName ({ props }) {body}

Best practice is that you define the components with `export + default + function`, and the helpers/handlers you define `arrow function`

## Differences between App Router and Pages Router

| Feature | Page Router | App Router |
| ------- | ----------- | ---------- |
| Directory | pages/ | app/ |
| Route files | pages/about.tsx | app/about/page.tsx |
| Layouts | manual with _app.tsx | layout.tsx |
| Server Components | No | Yes (default) |
| Client Components | Default | Need `use client` |
| Data Fetching | getServerSideProps | async components, fetch() |
| Loading States | Manual | loading.tsx |
| Error Handling | Manual | error.tsx |
| API routes | pages/api/hello.ts | app/api/hello/routes,ts
| Streaming | No | Yes |
| Nested Layouts | Difficult | Easy |

