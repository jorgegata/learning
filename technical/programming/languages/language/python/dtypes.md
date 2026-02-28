# DTypes in python

In python, everything is an object, including the datatypes:

* It has methods
* It has properties
* It can be compared (dunder methods...)

## Create Structure without classes

### TypedDict

Closes to typescript types.

```python
from typing import TypedDict

class User(TypedDict):
    name: str
    age: int
    email: str

user: User = { "name": "John", "age": 30, "email": "john@example.com" }
print(type(user)) # dict
```

No runtime validation, can still do ``user["typo"]`` without error at runtime

### NamedTuple - Lightweight immutable structure

```python
class User(NamedTuple):
    name: str
    age: int
    email: str = "no@email.com"

user = User("Jorge", 25, "allo@gmail.com")
```

### Pydantic BaseModel - Runtime validation + Types


```python
class User(BaseModel):
    name: str
    age: int
    email: str = "no@email.com"

user = User(name="John", age=30, email="john@example.com") # Raises validation error if required attrs are not properly done.

```

### attrs library - pre-dataclass era champion

```python
import attr

@attrs.s(auto_attribs=True)
class User:
    name: str
    age: int
    email: str = "no@email.com"

# Like dataclass, but came first and has more features
user = User("John", 30)
```

### Comparison table

| Method | Mutable | Type Hints | Runtime validation | Exists at runtime | Use case |
| --- | --- | --- | --- | --- | --- |
| `dataclass` | yes | yes | no | yes (class) | general purpose structured data |
| `TypedDict` | yes | yes | no | no (just dict) | API responses, JSON-like data. Works well with `json` python library |
| `NamedTuple` | no | yes | no | yes (tuple) | immutable data, return multiple values |
| `pydantic` | yes | yes | yes | yes (class) | External API validation, external data |