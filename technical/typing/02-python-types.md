# Python types

## Previously lecture

* Type annotations on functions: arguments and return values
* Difference between duck, static, dynamic typing programming language
* Access to annotations on high-level module variables or objects
* use of mypy
* commented annotation concept with `# type (float) -> float`

## Typing module

By default, the types are classified into:

* Simple (or primitives)
* Composites. Simple annotation is provided naturally in the language, but composite annotation requires further description (not only if an object is a list, but what it is contained inside that list).

Module `typing` in python provide more advanced types like `List`, `Tuple`, `Dict`. The typing module contain even more advanced data types like: `Counter`, `Deque`, `FrozenSet`, `NamedTuple`, `Set`.

Sometimes you need a sequence, not caring if it should be a `List` or a `Tuple`, then providing a `Sequence`.

## Type aliases

The type aliases goal is to increase readibility and maintainability of our code, providing a name for specific structures without creating a new, distint type.

Consider that `List[Tuple[str,str]]` is a list of coordinates. It can be renamed as:

```python
from typing import Tuple
Coordinate = Tuple[str, str]
List[Coordinate]
```

## NoReturn / None return

> Functions without an explicit `return` statement still return a `None`.

There are two possibilities when function "does not return" something (i.e. None) or when are never expected to return normally (i.e. raise Exception...)

In the first case, if you put a `None` as a type hint and you try to use that value somewhere, `mypy` will detect that and will raise an error of misuse.

In the second case, you can annotate functions with `NoReturn` with typing as it will never return normally.

## Any Type

```python
def choose(items: Sequence[Any]) -> Any: ...
```
`Any` means that we can accept any type in the sequence (we can have in scope two types that we want to accept, or truly something), and that any type will be the output. **This is not useful**

If we have types defined before transforming using that function, then we will loose the information as it goes through an `Any` type.

The case uses of `Any` are the following, and it's related with consistency checking: 

* Fallback to come to dynamic typing
* Too complex structures that are not properly defined
* Describe items in composites (same as above)

