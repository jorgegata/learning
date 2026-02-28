# Doubts

## Generics

Why would I like to use generics and not `ABC`? So ABC makes the abstraction derived from a higher-level concept that all the rest of the entities (`classes`) have something in common with that. You can also see that as a mathematical **factorization**

We can somehow derive that from protocol, but in this case, **Protocol** is used whenever we want to define a type that contains an specific shape (both data and methods). We can create abstractions out of protocols as these are the example of structure subtyping.

The `Generic` aim to solve one problem: **maintain type information through a container or wrapper.** The problem without generics is that we loose track of the information in classes both for `mypy` or developer information, as the cast of the object is `Any`

```python
class Box:
    def __init__(self, item):
        self.item = item
    def get(self):
        return self.item

box = Box("hello")
value = box.get() # type checker sees Any
value.upper() # there is no autocomplete, so no type checking

class Box(Generic[T]):
    def __init__(self, item: T):
        self.item = item
    def get(self) -> T:
        return self.item  
```

**The Generic type is the type of the contructor actually!!** It can contain a nested type, being a **dataclass**, a **namedtuple**, a **TypedDict**...

You can start combining stuff with this, linking structure and any other important things