# React Node

A react node is any valid thing you could render in Reeat. It in other words, it's a **type** that represents anything that can be displayed.

When you are constructing a component, you want to accept children or any other renderable content as prop, so yyou type it as **Node**.

- **ReactElement** -> ONLY JSX elements (React.createElement())
- **ReactNode** -> *ReactElement* + primitives + arrays + null + undefined

## Use

```typescript

import React, { useState } from 'react' /*With brackets grab the default export, the other is a named export { useStase as use }. ES6 syntax*/

```

## React.FC

The React.FC indicates it's a function component, which is legacy behaviour. It usually created a children, and it was to reference the props in the type. Usually, we mention directly the props

```typescript

const Card: React.FC<CardProps> = ({
    children,
    header,
    footer,
    className,
    ...
}) => {
    /*This is called an arrow function, as we do use name = ({props}) => {body} */
    /* Normal function would be function name ({ props }) { body }*/    
};
```