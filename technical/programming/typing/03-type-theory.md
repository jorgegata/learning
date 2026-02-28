# Type theory

## Previous lecture

* Type aliases
* Types of data types in python (simple, composites, from typing (list, dict, tuple, set, frozenset, counter, deque/queue))
* assing none type in `mypy` and NoReturn value (when exceptions are raised mainly)
* `Any` higher tier type. Lack of traceability and **not useful**. Use cases.

## Subtypes

> T type is a subtype of U type if: every value of T is also in the set of values of U, and every function from T is also in the set of functions of U.

In type is a subtype of other if it is in the subset of **values and functions**. 

A common subtype of `int` is `bool`, as bool are at the end values of 1 and 0, and the functions are in the set of functions of `int`. (e.g. you can check with the `issubclass()` function).

> The importance of subtypes is that it can always pretend to be its supertype!

Subtypes are somewhat related to subclasses.

### Relation between subtypes and subclasses.

Bool is a subtype of int because it is a subclass of int. Int is a subtype of float, but not a subclass of float.

### Covariant, contravariant, and invariant

But what if you use subtypes in composite types. Is now `Tuple[bool]` a subtype of `Tuple[int]`?

- Tuple is covariant, meaning that preserve the type hierarchy of its item, so `Tuple[bool]` is a subtype of `Tuple[int]` because `bool` is a subtype of `int`-
- List is invariant. `List[bool]` is not a subtype of `List[int]` since you cannot append int to a list of booleans, thus not meeting the second condition.
- Callable is `contravariant` in its argument. It means that a function operating on a bool is expected, then a function operating on an int would be acceptable.

These definitions are to ensure that composite types may not be that simple and intuitive.

### Gradual typing and Consistent Types

> Type T is consistent with type U if T is a subtype of U or either T or U is Any.

We allow gradual typing as `Any` type sits at top and bottom. This means that any type is a subtype of `Any` and `Any` is a subtype of any types. But this does not match the conditions of subtypes in top, so we talk about **consistent types**

Type checker will only complain about **inconsistent types**, then you will never see type errors arising from the `Any` type. Therefore, you:

* Any to explicit fallback to dynamic typing
* Describe types that are too complex to define in Python type system
* Describe items in composite types
