# Typing

> Typing is how language classifies values into types, enforces constraints (rules on those types), checks for type correctness, check for type inference, and optional type annotations.

In some languages, type exist without explicit declaration (meaning dynamic typing). It is just inferred or implicit.

## Importance

There are several reasons:

* Type catch mistakes early: if you try to add a string to an integer (enforcing constraint) or call a method that does not exist, it will flag an error (static typing in compile, dynamic typing in runtime). 
* Documentation: type communicate intentention so you know what a function can expect and return. No need to go through implementation or accurate docstrings.
* Tooling support: it allows the IDE for navigation, refactoring, and autocompletion...
* Optimization: knowing a variable is an specific type allows to handle it without generics 
* Refactoring assurance: when we type variabels and programming elements, we can safely refactor the rest of the codebase. (`mypy` can opt for static or dynamic checking if the benefits are good enough from the dev perspective).

## Recognisition

### Vocabulary

- Type declaration / annotation: explicitly specify the data type of a variable, funcion parameter, return value, or other program element in a programming language
- PEP (Python Enhancement Proposal): design document to provide info to the Python community or propose changes to Python itself.
- Sequence: enumerated collection of objects in which repetition is allowed and order matter.
- Mapping: data structure that associates keys with values, allowing for arbitrary key lookups, and implementing specific methods defined by abstract classes like `Mapping`
- Type aliases: feature that allows to create a new name from an existing type, keeping code easy to read without creating a new, distinct type.
- Simple type: represent a simple, atomic value such as `str`, `int`, `bool`, `date` and does not contain nested elements or attributes
- Composite type: data type constructed from simple types and other composite types.
- Sentinel value: value to indicate end of a sequence or absence of valid data.

## Goal

Understand the importance of the data types, the concrete and abstracted data types, and how data flows in a program from one place to another

From a conceptual point of view:

1. All basic primitive types and primitive data structures
2. Understand more complex data types in the programming language (e.g. typing module in Python)
3. Create custom data types (abstract, nested...)

From a practice point of view in Python:

1. Type annotation and type hints
2. Adding static type to code
3. Running a static type checker
4. Enforce type at runtime

## Good reference

- [General Python type checking](https://realpython.com/python-type-checking/)

