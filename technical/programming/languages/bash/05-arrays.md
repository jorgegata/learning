# Array

> Bash does not only handle scalar values, but also arrays. They are initiated on demand

You can do without declaration or definition of `array[0-2]` and `array[4]`

```bash
my_array[5] = "17*9="
let my_array[3]=17*9 # with let it calculates automatically
```

- When referring to array elements, **braces must be used** `${my_array[5]}`

`echo ${my_array[3]}${my_array[5]}`
