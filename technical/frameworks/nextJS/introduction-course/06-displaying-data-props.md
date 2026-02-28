# Displaying data

So the blocks contain data. This data could be hardcoded, or `fetched` from somewhere else. This is where the magic happens. 

What if we dont know the data from ahead, or we want to fetch daa from an external source?

Changing the href of an <a> changes the source link, or the source of <img> changes everything. In the same way, you can pass pieces of information as properties to React components (`props`).

Also, you can change the behaviour of some components putting arguments. You can pass the props from parent components to child components (tree hierarchy).

## Single prop

Imagine we want to add a prop of the Header call 'title'

```javascript
function Header({ title }) { // or props, right now object destructuring
    console.log(title); // { title: "React" }
    return (
        <h1>{'This is a cool${title}!'}</h1>
    )
}
```

Since prop is an object, you can do **object destructuring**. Inside curly bracets, you can put JavaScript expressions there. Cases are

* A dot annotation
* A template literal
* Returned value of a function
* Ternary operators

You can pass any title string to the title prop, or if you do not pass anything, you've just accounted for the default case in your component with the ternary. Now, it accepts any generic title prop, you only have to change it in the Component declaration.

## Iterating through list -> map() 

```javascript
function HomePage() {
    const names = ["Ada", "Jorge", "Manuel"];
    return (
        <div>
            <Header title="Develop, Continue..." />
            <ul>
                {names.map((name) => {
                    <li>{name}</li>
                })}
            </ul>
        </div>
    );
} 
```

You can use the function *map()* to iterate over the array and put a function that transform the name to a list item.

If you run this way it will run a warning about a **key** prop. This is due to React needs something to uniquely identify items in an array, so it knows which elements to update in the DOM. You can use the names since those are unique, but if they were not, then it is a problem.