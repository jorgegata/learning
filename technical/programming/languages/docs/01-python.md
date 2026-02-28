# Python code

Python is a popular language framework distinguished by its easiness to understand, big package environment, and medium performance to do tasks such as Machine Learning, Data Science, Scripting, Data Transfer, and Logic development. It is a OOP that allows for high customization. It also allows for multi-processing, multi-threading, async functions

> Although its interpreter is purely sequential (GIL) by definition, we can I/O bound the operations instead of CPU-bound them.

**In python, most of these builtin functions can be changed within the objects defining the proper *dunder methods***

## 1. Primitive data types and data structures

It is fundamental to understand the primitive, the attributes and its methods associated with it. The most important are `float`, `integer`, `bool`, `complex`, `string`, `unicode`

The main data structures can be accomplished in three: `list` (mutable, indexable, with several methods associated with it), `tuple` (immutable and occupying low space in memory), `dict` based on key-value pairs of all primitive kinds (hashable), and `sets` with common sets operations such as `union`, `intersection`, `difference`.

## 2. Control loops

We do have the `if-elif-else` clause, the `match` clause with default options sitting at `_`, ternary operations on definition of variables `result = 10 if a==25 else 15`. We do also have loops like `for` that can be coupled with `range`, `enumerate`, `items`, `zip`. Also we have `while` loops that can be combined with `break`, `continue`, `pass` (do nothing there), `else` if we did not enter in the `break`

## 3. Functions

> `1` default signatures with arguments, *args, keywords, **kwargs, and `2` decorators and decorators with arguments
> 
- Default function signature: we do have multiple definitions here **proper function definition** `def function(x,y): return x+y` or with **lambda function** `lambda x, y: x + y`

```python
def function(pos, *args, keyword=default, **kwargs):
    """Docstring"""
    return resultado

# if we call it, there are several parts of the function to be considered
function(1, 2, 3, keyword="x", otro="y") # 1 is an positional argument, (2,3) are args, default is a keyword, and otro is a keyword -> {"otro":"y"}

# lambda function can be stored in a variable to be passed as a callable. Also with type hints 
f = lambda x, y: x + y
```

- We do have decorators as well, where you can perform actions before (setting up a resource) and after (cleaning a resource) when a function is called

```python

def decorator(func):
    def wrapper(*args, **kwargs):
        # do something before
        result = func(*args, **kwargs)
        # do something after
        return result
    return wrapper

@decorator
def mi_funcion(): pass

# We do have decorators with arguments, but let's not go inside that.
# We do have important decorators such as @classmethod, @abstractmethod, @staticmethod...
```

## 3. Comprehensions and generator

> `1` We can make comprehensive lists, sets, and dicts. We can make comprehensive generators. `2` we can make custom generators out of iterables

```python
comprehensive_list = [x for x in range(5) if x % 2 == 0]
comprehensive_generator = (x**2 for x in range(2)) # lazy, memory efficient
comprehensive_dict = {k: v for item in items}
comprehensive_set = {x for x in range(2)}
```

The **generator** is a special kind of function that uses the `yield` keyword to return an iterator, producing values one at a time and conserving memory by not storing the entire sequence at all

```python
def gen():
    for i in range(10): yield i

generator = gen()
next(generator)

# you can also yield from another generator
yield from another_generator
```

## 4. Classes and OOP

- The class has a kind of critical signature. We consider `class atrributes`, `instance attributes (public, protected, private)`, `classmethods`. `staticmethods`, `setters`, `getters`

```python
class MyClass:
    class_attribute: int = "shared state"

    def __init__(self, value: int): # it is specific to the instance
        self.value = value # property of the instance
        self._value2 = value2 # protected attribute (it can be accesses within this class and inherited ones)
        self.__value3 = value3 # private attribute (it can be only accessed with the class that bounds it)
    
    def method(self): pass

    @classmethod
    def from_string(cls, value: string): # generally used for custom constructors
        return cls(int(value))
    
    @staticmethod
    def utility_function(): pass # usually for utility functions related to the particular class

    @property
    def valor_doble(self): # also called as a getter, and accessible through the normal class.attribute nomenclatue. You return a special value with a special business logic
        return self.valor * 2
    
    @valor_doble.setter
    def valor_doble(self, v): # you change an attribute with a special business logic with it
        self.valor = v // 2
```

- Class can be inherited, only we need to initialize the instance and the father. You can also have `multiple inheritance`

```python
class Child(Father):
    def __init__(self):
        super().__init__()
```

- You can have abstract classes with `ABC` and `abstractmethod`

```python
class Base(ABC):
    @abstractmethod
    def method(self): pass
```

- All related to the methods are the `dunder methods` to personalize our classes!! but this is very advanced for custom classes.
- You can also have the `dataclass` which is packages of data with already initialized dunder methods. You can put them as frozen to have `hasable` classes.

## 5. Error handling

We can hand unexpected behaviours based on the `Contract model` described when designing functions. We can handle it in context, we might not handle it and just raise an error (it is something more critical upstream to be considered)

```python
try:
    # code you want to try
except ValueError as e:
    # handle
    raise # or re-raise with a wrapper error and a more descriptive error message
except (TypeError, KeyError):
    pass # handle multiple errors
except Exception as e:
    # general all-catch error, to avoid as much as possbile
else:
    pass
    # if there has not been any exception
finally:
    pass
    # always even if there is an exception or not
```

We can create exceptions out of this inheritng from `Exception`, always with a message and a code

```python
class MyException(Exception):
    def __init__(self, message, code):
        super().__init__(message)
        self.code = code

raise MyException("something failed", 500)
```

There can be theory on `context managers` (opening a resource, doing something, cleaning it up), but it might be too much

## 6. Modules and packages

From a package, you can reference multiple modules. Everything that containst the `__init__.py` is considered a package or a subpackage. We can control with `__all__` inside the init file to control the `from module import *`.

You have three types of packages in **Python** actually:

1. Your own repository (let's call it your package). It works if you call/import from the highest level-down here.
2. Standard library (comes with Python): there is no installation needed but it comes as a standard-separate library (`os`, `library`, `json`, `math`, `datetime`...)
3. Third-party packages (need installation) (`requests`)

The search order for python is:

1. current directory
2. PYTHONPATH env variable
3. Standard library
4. `site-packages` where pip install things

> Absolute paths are less probably to have errors. However, if you have a complicated nested structure in the logic, you might want to use relative paths.

```python
import module
import module as alias
from module import Class, function
from module import function as alias
from package.subpackage import module

# relative import inside packages (you need to run it as a package, not as a script)

from . import sibling
from .. import parent
from ..other import something
```

The difference between running as a package

```bash
# this runs it as a script
python script.py
# this runs it as a package
python -m repo_name.main
```
Relative imports only make sense when Python knows the package structure, otherwise it does not understand it.

## 7. Itertools, functools, operator functions, collections

### Definitions

- The **itertools** is a built-in function that provides a collection of fast, memory-efficient tools for working with iterators. It is designed to manipulate iterators to perform complex iteration tasks. Used to manage large datasets or generating sequences without consuming excessive memory (done in C and operating as generators)
  
- The **functools** is a standard library that provides higher-order functions and operations on **callable objects**, enabling to rewrite the behaviour of functions and methods without rewriting the core logic.

- An **operator functions** is a type of function used to redefine or extend the behaviour of existing operators. It allows operator to be overloaded so that they can work with custom data types, giving them a meaning specific to that class.

- A **collection** is something that stores and organize items (data), including list, dictionaries, tuples, sets, and specialized data types... It contain functionality related to the specific data type.

### Itertools

It is normally imported as `import itertools as it`. It always return iterators, where you can think about as normal collections but it will only materialize when we request the value in memory. The most common opertions are:

- `chain(a,b)`: it will return a concatenated iterator with a number of times.
- `islice(it, 5)`: it will return an sliced-iterator by a fixed number of times
- `cycle(it)`: it will return an iterator
- `repeat(it, n)`: 
- `combinations(it, n_pairs)`: it generates the combination of an iterable of a number of pairs (unordered)
- `count(start, step)`: it generates an infinite counter (generator)
- `permutations(it, n_pairs)`: generate all possible **ordered** arrangements of elements from an iterable. (**The order of elements matter in permutations, distinguishing them from combinations**)
- `product(a,b)`: returns an iterable of the cartesian product of the iterables here.
- `groupby(it, key)`: the key can be a function, or whatever it is evaluated that return true or false. **It does not group all elements with the same key together unless they are consecutive in the input sequence**, the input must be sorted or arragned appropiately for the desired grouping therefore. 
- `takewhile(pred, it)`: returns element of an iterable as long as the condition specific by the predicate is true. Once the condition fail, it stops (for example, stop at the moment you encounter a `string` in a sqeuence number) (take while true)
- `dropwhile(pred, it)`: it start taking elements from the first `False` it contains. After that false, it takes all the subsequent elements, including the remaining even numbers and odd numbers (in an example where the odd numbers are discarded with a lambda function)
- `accumulate(it, func)`: performs accumulative addition on the input iterable. It yields the running total at each step, starting from the first element.

> You can use it.chain() with a single list to create a generator out of this.

### functools

> Usually imported as `import functools as ft`

It allows to extend and create more complex opertions on functions and methods without touching the core logic of the function itself.

- `ft.partial(func, arg)`: you can pre-set some arguments of a more general function, so providing defaults basically.
- `ft.reduce(func, it)`: it end-up reducing a dimension of the structure in place. You can cumprod, cumsum, and any other imaginable function you can think about with this.
- `@ft.lru_cache(maxsize)`: to apply with memoization. the maxsize means that the cache will grow indefinitely without evicting entries, allowing all previously computed Fibonacci values to be stored and reused. `cache_info()` displays the number of cache hits and misses. It improves the performance for recursive functions by avoiding redundant calculations.
- `ft.wraps(func)`: preservar metadata en decoradores
- `ft.total_ordering`: generar comparaciones desde `__eq__` y `__lt__`

### Operators

> generally imported as `import operators as op`

This involve the extension of the logical current operators on some other structure and classes without touching the core logic of those classes. `op.add`, `op.mul`

## Collections

> it is usually invoked with `from collections import ...`

These built-in python package includes more specialized data structures within it. 

- `defaultdict`: dictionary with default factory (`int` would start values from 0) - defauldict(int). There is no need to check if a default exists before incrementing the count. It facilitates counting occurrences or grouping data.
- `Counter`: it creates an object that counts the frequency of each element in the list. It can be initialized with a `string`, a `dict` or any other iterable.
- `deque`: list that you can only append from right or left, leaving the rest of the elements untouch (.append(), .appendleft(), .pop(), .popleft()). Efficient to those operations, specially for left operations. it supports other operations such as `rotate()`, `count()`, `reverse()`, `extendleft()`
- `namedtuple`: you can create a data object called `NamedTuple` with fields, where you can construct it passing the fields. You can convert to a dictionary `._asdict()` or replace a value with a new instance using `._replace()`
- `OrderedDict`: it ensures that the iteration over a dictionary follows the same sequence as the insertion order. This is guaranteed unlike regular dictionaries where insertion order was not guaranteed in `Python 3.7`. There are some methods such as `move_to_end()` to reorder elements which is not available in standard dictionaries.
- `ChainMap`: it allows to merge dictionaries, resolving the lookup from the first mapping they appear.

## 8. Files and I/O

The information from the files usually comes from a path and a `context manager` where we can extract this information. 

### Operations with context manager `open`

The modes are: `r` as read, `w` as write, `a` as appending, `x` as create, `b` as binary, `r+` (read+write)

```python
# read action
with open('file.txt', 'r', encoding='utf-8') as f:
    f.read() # you read everything
    line_gen = it.chain(f.readlines()) # each line in a collection
    for linea in f: print(line) # iterar sobre las lineas

# write action
with open('file.txt', 'w') as f:
    f.write("texto") # all
    f.writelines(lines) # everything as a separate line here

```

### Pathlib core utilities to communicate with OS in I/O

```python
p = Path('')
p.exists
p.is_file()
p.is_dir()
p.read_text()
p.write_text()
p.parent
p.name
p.stem # name without extension
p.suffix # extension
p.glob("*.py")
p.rglob("*.py") # recursive
Path.cwd()
Path.home()
p / "subdir" 
```

### Serialize / deserialize JSON and PICKLE

Serializing and de-serializing list and dictionaries is possible with the `json` module. However, more complex python objects is different (`pickle` is a protocol used to do that for Python objects, although it can be insercure if we serialize back pickle objects from untrusted sources).

## 9. Concurrency and Parallelism

## 10. Testing

## 11. Type hints avanzados

> The advances types are invoked through the `typing` library in Python.

A type hint is a type annotation that helps the development experience (reduction of errors while coding in static checking) and potentially the runtime execution of our code.

There are different ways of typing: static, where you need to declare the type for the components of the programming language, and are both checked at compile time and runtime without the possibility for the same variable to be changed of types; dynamic, where there is no need of annotation and the variable might change types in runtime (it can be combined with static checkers in compile time); duck type which is not a type per se but if it walks like a duck and quack like a duck, it must be a duck.

Python is a `dynamic typed` programming languages, but it is imperative for a good and structured codebase (also to collaborate) to add this type annotations. It is not imperative maybe for scripting purposes (training a ML model, doing DS / Data engineer tasks...), although it is also considered good for other purposes. We can reach this out with built-in types (`int`, `bool`)... or with the `typing` library. 

Sometimes it is mistaken with `from collections import dataclass`, which is a class structure that can contain attributes and methods related to that, usually heavily relying on saving data. This one can be modified and is not the same as a `type annotation`

With `types` annotations, we do have `List`, `Tuple`, `Dict`, `Set`, `Callable[[int, str], bool]` that are the most basic structures

Then, we also have `Optional (X | None)`, `Union (X | Y)`

- The `TypeVar` allows us to use classes as special types annotations with bounds, or to constraint to specific types an `alias` that it will be used.

- The `Generic` allows for generic classes

```python
from typing import TypeVar, Generic
T = TypeVar('T')

class Stack(Generic[T]):
    def __init__(self) -> None:
        self.items: list[T] = []
    
    def push(self, item: T) -> None:
        self.items.append(item)
```

The `Stack` class is generic over type `T`, meaning it can hold items of any specific type. For instance, you can create a stack of integers

```python
stack = Stack[int]()
stack.push(1)
stack.push(2)
print(stack.pop())
```
This ensures **type safety** by enforcing that only values of type `T` can be added and retrieved.

- The `Protocol` allows for duck typing. We differ that from `ABC` whenever we do not have the control of the class to be built. It is more on defining `Callable` duck typing rather than deriving classes from an `interface`. 

```python
from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> str: ...

def render(shape: Drawable) -> None:
    print(shape.draw())
```
The `render` function accept any object that conform to the protocol, demonstrating structural subtyping. It approach for flexible and type-safe code without requiring inheritance.

- The `Literal` allows to define a type alias with literal values. `GameType = Literal["checkers", "chess"]`, so a parameter of a function signature accepting that type can only have "checkers" and "chess"

- The `Final` provides a `global` variable that cannot be reassigned, it can provide a decorator to a class that cannot be subclassed from it, and it can be on a `method` that cannot be overriden in a subclass.

- The `TypedDict` is a dictionary with an specific schema. If we annotate the variable with that specific type, it can accept dictionaries or even construct with the aliased `TypedDict`. However, it cannot contain heavy logic with it as opposed to `dataclass`

## 12. Built-in essential

- `os` for interaction with the operative system
- `sys` for python system (sys.exit(), sys.stdin, sys.stdout)
- `re` for regular expressions
- `datetime` for temporal date structures
- `logging` for logs
- `argparse` for arguments passed in the command line interface
- `subprocess` to execute bash commands
- `shutil` for operations in files
- `tempfile` for temporal files
- `hashlib` for hashes
- `secrets` for crypto random
- `math` for mathematical needs
- `statistics` for basic statistics
- `decimal` for precise decimals
- `fractions` for fractions
- `copy` for deep/shallow copy
- `pprint` for pretty print
- `textwrap` for text formatting
- `csv` for CSV files operations
- `sqlite3` for sqlite3 database
- `urllib` for URLs
- `http.server` for a simple web server

## 13. Third-party essential

It goes to:

- `requests`
- `numpy` for mathematical array operations
- `pandas` for statistical and dataframe operations
- `matplotlib` for grained-control representation
- `sqlalchemy` for database ORM
- `pydantic` for data validation
- `fastapi / flask` as web framework
- `pytest` for testing
- `black` for formatting
- `ruff` for quick linting
- `mypy` for type checker

## 14. Best practices

1. Good error handling whenever it is the case
2. destructuring of potential list or tuples (unused values with `_`)
3. variable swap (`a, b = b, a`)
4. `falsy` returns (`if list`, `isinstance()`)
5. Avoid mutables as default values in functions
6. `None` comes with `is`, not with `==`
7. Walrus operator (assignment and evaluation in one step)

## 99. Miscellaneous

## Python built-in functions

```python
print()
len()
type()
int()
str()
list()
range()
open()
input()
sum()
min()
max()
abs()
round()
sorted()
enumerate()
zip()
map()
filter()
isinstance()
hasattr()
getattr()
dir()
help()
```

### async functional programming

