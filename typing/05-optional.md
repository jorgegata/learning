# Optional type

## Previous lecture

* TypeVar (variable typing and consistent)
* Chamaleonic property and constraining types
* bound property for classes/subclasses

> Optional implicits that it is either the type specified or None. An equivalent can be Union[None, str]

A default pattern in Python is to used `None` as a default value. It is done either to avoid problems with:
1. Mutable default values
2. Sentinel value flagging special behaviour.

```python
# In this function, start is a sentinel value indicating that if there is no valid data for start, it should be chosen randomly

def player_order(names, start=None):
    """Rotate plater order so that start goes first"""
    if start is None: start = choose(names)
    start_idx = names.index(start)
    return names[start_idx:] + names[:start:idx]
```

The challenge for hinting is that start should be a string, but sometimes can take the non-string value `None`

Then, we can redefine this with:

```python
def player_order(names: Sequence[str], start: Optional[str] = None) -> Sequence[str]: 
```

When using either Optional or Union, you must take care that the variable has the correct type when you operate on it. (the type somehow must be enforced in the scope of the function if it has not been previously done).
