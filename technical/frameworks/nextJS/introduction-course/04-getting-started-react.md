# Getting Started with React

To get started with it, you can download two scripts using the <script src=""></script> tags. Remember you also have the `type` tag to manually create your own script.

* react is the core react library
* react-dom provides DOM-specific methods that enable you to use React with the DOM.

```html
<html>
    <body>
        <div id="app"></div>
        <script src=""></script>
        <script src=""></script>
        <!-- Babel Script -->
        <script src=""></script>
        <script type="text/jsx">
            const app = document.getElementById('app')
            const root = ReactDOM.createRoot(app);
            root.render(<h1>Develop</h1>)
        </script>
    </body>
</html>
```

This will fail as it is not javascript, but JSX (or TSX) -> typescript + XML.

Browsers do not understand either JSX or TSX, so you will need a compiler (babel, new script) to act as the compiler
