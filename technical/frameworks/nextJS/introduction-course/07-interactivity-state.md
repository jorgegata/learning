# Interactivity with State

Basically, components have **state** and some kind of event happen, call the event handler.  

Let's create a button, if you want it to do something when click, you use onClick event. In React, the events are written in camel case. You could have used for example ``onChange`` for input fields or ``onSubmit`` for forms.

```javascript
<button onClick={}>Like</button>
```

## Handling event

Usually, you want to create a function to handle the events when they occur. Those functions are defined inside the component (scope)

```typescript
function HomePage () {
    // ...
    function handleClick() {
        console.log("increment like count")
    }
    return (
        <div>
        {/* ... */}
        <button onClick={handleClick}>Like</button>
        </div>
    )
}
```
Then you can trigger some function when an event just occurs.

## State and Hooks

React has hooks. Hooks allow you to add additional logic such as **state** to your components. You can think of state as any information in the UI that changes over time, usually triggered by user interaction.

You can manage state to store and increment the number of times a user has clicked the "Like" button (`useState()`). It returns an array that you can access and use using array destructuring

```typescript
function HomePage() {
    // ...
    const [value, setValue] = useState(0) // -> first item is value, second is function to update the value. The arg inside useState is to set the initial value
    // ...
}
```

You can check the initial state in the component as it is a variable, so you can pass it as a 'standard' ``prop``

You can call the function inside the handlerEvent, where you can put an expression changing the value. Clicking the button will now call the `handleClick` function, which calls the `setLikes` updater.

This is just an introduction. Of coure, there is plenty more of options with [Managing State](https://react.dev/learn/managing-state) and [Adding Interactivity](https://react.dev/learn/adding-interactivity)
