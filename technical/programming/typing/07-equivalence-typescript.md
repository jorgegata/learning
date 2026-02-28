# Python and typescript equivalence

## Previous lecture

* Potential logic attached to classes (Clauses)
* Method annotation and attribute annotation
* Classes as types
* Future/past references in classes and self reference annotation with `''`
* Annotating `self` or `cls` (generally not annotated) with TypeVar cases
* Callable type
* Annotating args and kwargs
* Dataclasses logic (automated `__init__`, `__repr__`, `__eq__`, `__hash__`...)

## Equivalences

In typescript, we define interfaces/types as to 'ensure' contracts within the defined type in different parts of the system. The equivalence in python would be to define the types hints straight, using type aliases, compound types, or even classes.

The `dataclass` equivalence in typescript would be a class with constructor and public attributes.

But we may refer to ``typing.Protocol`` for structural typing as equal as interface. This means that `Protocol` is about defining the shape ('duck typing', if it quacks like a duck and look like a duck, it is a duck) without the need to inherit from anything (so this is a substitute for `abstractclasses`). 

Duck typing does not care about what is the thing, but if it contains a `__len__` method for example. 

```python
# how do you type that?
def get_length(thing: ???) -> int:
    return len(thing)

# Using protocols!
class HasLength(Protocol):
    def __len__(self) -> int: ...

def get_length(thing: HasLength) -> int: return len(thing)

# now anything with a length is acceptable!
```

Equivalent in typescript

```typescript
interface HasLength {
    length: number;
}

function getLength(thing: HasLength): number {
    return thing.length;
}
```

### Protocol vs Abstractclass

The protocol allows to do type checking without inheritance. This is for static checking. However, there with ABC which is a inherited class, there are runtime checkers... so it is not only static.

> Use protocol when you want to accept objects you dont control (i dont care what you are, just if you have an specific attribute or method). You use ABC when you build a class hierarchy that you are controlling.

```python
from typing import Protocol

class Drawable(Protocol):
    x: int
    y: int
    def draw(self) -> None: ...

# These classes know nothing about Drawable:
class Circle:
    def __init__(self, x: int, y: int, radius: int):
        self.x = x
        self.y = y
        self.radius = radius
    
    def draw(self) -> None:
        print(f"Drawing circle at ({self.x}, {self.y})")

class Square:
    def __init__(self, x: int, y: int, size: int):
        self.x = x
        self.y = y
        self.size = size
    
    def draw(self) -> None:
        print(f"Drawing square at ({self.x}, {self.y})")

# But both match the Drawable protocol:
def render(items: list[Drawable]) -> None:
    for item in items:
        item.draw()

render([Circle(0, 0, 5), Square(10, 10, 3)])  # Type-checker is happy!
```