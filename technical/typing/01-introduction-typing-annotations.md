# Introduction to type

> Dynamic typed programming language means that the types are **only checked during runtime**, and the **type is able to change during runtime**

Python is a dynamic typed programming language.

In Java or C the language is static typed, meaning that types are **checked at compile time** and variables are *generally* not allowed to change types, although there are some mechanism to cast a variable to a different type.

There is a third type of typing called **duck typing** by the premise that if "it walks like a duck and quacks like a duck, then it must be a duck". This typing is based on check presence of **methods**, showing that the type of the class of an object is less important than the methods it defines. Duck typing is supported when doing static type using *structural subtyping*

At last, PEP 484 provides a way to annotate, and there are annotation comments if we must do that (e.g., `# type (float) -> float`)

## Python

> Rule of thumb: "typing is worth whenever unit tests are worth writing"

**PEP 484** introduced type hints, allowing for static typing in Python.

### Type hints (annotations)

These does not break runtime, so those are not enforced and any problem with not yield an "error" or "warning"

```python
def headline(text: str, align: bool) -> str: ...
```

Not only arguments and return values are annotated, but variables and other programming language elements. Annotations of variables are stored at module level.

To catch errors, you would use a static type checker. You might have a type checker already in your ide (i.e. PyCharm). `mypy` is a tool that allows for that, having to run it on the `src/` files.

Annotations can be checked using the `.__annotations__` function.





