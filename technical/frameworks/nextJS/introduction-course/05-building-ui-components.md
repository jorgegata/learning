# Building UI with components

There are three main topics to have clear:

* Components
* Props
* State

You create your User Interface with these building blocks, so you can select or update those cherry-picking. This basically affects that if you need to update an specific component or brick, you will make it.

This modularity is key, as you can add, update, and delete components without touching the rest of the application.

## Creating components

In React, the components are functions. To render the component, you pass it as an argument of the ``root.render()`` clause

```html
<html>
    <body>
        <div id="app"><div>
        <script src=""></script> <!-- react core library -->
        <script src=""></script> <!-- reactDoM to update tree-->
        <script src=""></script> <!-- Babel to allow JS + HTML syntax -->
        <script>
            const app = document.getElementById('app');
            const root = ReactDOM.createRoot(app);

            function Header() {
                return <h1>'Hello'</h1>
            }

            function HomePage() {
                return (
                    <div>
                        <Header />
                    </div>
                )
            }

            root.render(<HomePage />);
        </script>
    </body>
</html>
```

1. React Components should be capitalize to distinguish from plain HTML and JavaScript
2. You use React Components the same way you would use regular HTML tags.

## Nesting components

You can next components if you include the components inside the React declared functions. If you keep nesting components, then you form component trees.

This allows you to reuse components in different places inside your app.

**NOTE: YOU END UP RENDERING THE ROOT OF THE TREE**




