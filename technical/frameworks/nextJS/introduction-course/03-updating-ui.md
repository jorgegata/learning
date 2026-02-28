# Tree generating

You create a simple html code.

```html
<html>
    <body>
    <div id="app"></div>
        <script type="text/javascript">
            const app = document.getElementById('app'); /* Select element */

            // Create a new H1 element
            const header = document.createElement('h1');

            // Create a new text node for the H1 element
            const text = "Develop. Preview. Ship";
            const headerContent = document.createTextNode(text);

            // Append the text to the H1 element
            header.appendChild(headerContent);

            // Place the H1 element inside the div
            app.appendChild(header);
        </script>
    </body>
</html>
```

- Components itself can be given an `id` (or props).
- To write JavaScript, just write a <script></script> tag.
- Inside the javascript, you can use a DoM method (if it's client?)
- The DoM is the updated page with the Javascript, where the HTML is the initial load as it is written.

It is nice to say what you want to show and let the machine build it for you (usually verbose script but better).

## Declarative Programming vs Imperative Programming

With a javascript saying step by step how to build the page, we are using imperative programming. However, it would be nice to describe to order a pizza without being concerned on the steps to make a pizza (declarative programming)

React, thus, is a popular declarative programming that you can use build user interfaces. You can tell react what you want to happen here, and React will figure out the steps of **how** to update the DOM on your behalf.