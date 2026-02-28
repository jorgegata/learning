# Python * and **

It is used to unpack in positional arguments (tuple, list) or in variables (dictionaries) the fields. 

## Power moves with *

1. Combining list 

```python
list_1 = [1,2,3]
list_2 = [4,5,6]
list_3 = [*list_1, *list_2]
```

2. Unpack arguments

```python
def matmul(a,b,c):
    return a @ b @ c

matrices = [A, B, C]
result = matmul(*matrices)
```

3. Splitting first and rest

```python
first, *rest = [1, 2, 3, 4, 5]

# first: 1
# rest: [2,3,4,5]
```

## Power moves with **

1. Merging dictionaries: similar to lists
2. adding to dictionarie (mixed between ** and normal dictionaries)

Geohot:

1. setattr pattern in a class
2. the pass-through pattern when you want to pass along unknown arguments
3. the optional positional pattern (for example, shape can be (1) or (1,2) or (1,2,3)...)
4. Update pattern (you just update a dictionary)
5. Force keyword only: def train(model, *, lr, epochs)
6. Flatten data structures.