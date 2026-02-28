# Type variables

## Previous lecture

* subtype concept
* relationship between subtypes and subclasses
* consistent and inconsistent types
* covariant (it preserves the type of the hierarchy, matching methods and values), invariant (composite not subtype, as for example List of int cannot append bools), contravariant (callable, as a bool argument can be passed to an int-defined argument)
* cases of `Any`

## TypeVar

### Chamaleonic property (higher in parent hierarchy)

> A type variable is a special variable that can take on any type, depending on the situation.

You can create a type variable that encapsulates the behaviour of `choose()`

```python
from typing import TypeVar
Choosable = Typevar("Choosable")
```

**The TypeVar ranges over all possible types and choose the most specific type possible.**

```python
["Guido", "Jorge"] -> str
[True, 1, 1.5] -> float
[1, 2, 3] -> int
["Python", 3, 7] -> object
```
in the second, `bool` is a subtype of `int` which is a subtype of `float`, so we can be guaranteed it will thought of as a `float`. In the last case, there is no subtype relationship between those two, so the best we can say is that the output returned is going to be an **object**.

### Contraining the allowed types in TypeVar (in case to raise an error)
**Note** that none of these examples raised a type error. Is there a way to tell the type checker that `choose()` should accept both strings and numbers, but not both at the same time?

Yes! You can constrain type variables by listing the acceptable types.

```python
Choosable = TypeVar("Choosable", str, float)
```
Now choosable can be either string or float and not mixed in the `Sequence[Choosable]` type, yielding in the last option an error.

> Note: we can put aliases in the `TypeVar`, making it powerful for **type annotation**.