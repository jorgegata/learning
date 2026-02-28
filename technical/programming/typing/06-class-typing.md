# Class typing

## Previous

* Use cases of optional as **None** arguments in functions
* Difference between Optional and TypeVar.
* Equivalence with Union

## ADITIONAL CLAUSES ON CLASSES

An object represents a real world entity. Instances are created out of objects, who can have:

* An instance-level data (constructor), where we know that this data can be variable in state.

* Class-level data that is always true through that class (suits or ranks withing a card, it is always like that)

* Actions that performs on the object, usually considering object-level data (common to all instances basically). This is pretty useful as we can consider the data as 'enums', so for example in the Card game play. The methods are with the decorator `@classmethod` and it is generally used to do some actions prior to construct the instance.
  
* Actions that performs on the instance (the so called `self` argument), changing the state of that specific instance (in memory) that was constructed

* Dunder methods that perform on the instance (`self`)! this is useful as we can define something like `__str__` or `__repr__` or `__len__` among others...

* Static methods that does not give a fuck about data of the instance or class. those might be used as helpers related to the representation of the entity, but no more than that.

## Type hinting the classes

### Methods

This works like in the functions (or procedures). A special case is `__init__`, where it returns `None` as it construct.

### Classes as types

There is a correspondence between a class and a type. Again, there is a correspondence between a class and a type.

All instances of the class `Card` together form the `Card` type. To use a class as a type, you would only use the name of the class.

```python
class Deck:
    def __init__(self, cards: List[Card]) -> None:
        self.cards = cards
```

`mypy` is able to connect your use of Card in the annotation with the definition of the Card class.

### Self reference in the class

> Forward references can be solved with string representation or with `__future__ from annotations`

When you want to reference the class that is being defined (for example, a classmethod that construct the class under specific conditions and returns the instance), you can use `'Deck'`

Whenever we want to instantiate classes that use types of other classes, we need to define the used class type before the currently defined class. (Order can be changed with `__future__`)

This wants to be solved, basically postponing evaluatihon in memory. The annotations would be stored as strings, and it only convert into the actual type object **if and when** something actually asks for it. It makes the code load faster and avoid the forward reference problem. 

### Typing self or cls

> You should not typically annotate self or cls. There is only one consideratiokn when to annotate `self` or `cls` methods. Consider what happends if you have a superclass that other classes inherit from, and which has methods that return `self` or `cls`.

Imagine you have superclass called `Animal` and a class called `Dog`. if you have `cls` or `self` methods in the superclass, and you call the method from a subclass, it will return Dog and not Animal although you've notted it with `Animal`.

You can basically consider this using `TypeVar` that are variables.

```python
TAnimal = TypeVar("TAnimal", bound="Animal")
```

* TAnimal to denote that return values might be instances of subclasses of Animal
* Animal is an upper bound for TAnimal, so it will only be Animal or one of its subclasses. (properly restrict the types that are allowed)

### Annotating args and kwargs

> In Python, you should only annotate the type of elements in the args, not Tuple[str]. Similarly, you should only annotate the type for keywords in **kwargs.

### Annotating functions (high-order functions) with callable.

## Dataclasses

> Dataclass are for classes that stores state. It reduces the boilerplate for you. Useful when your data class must he hasable, as it requires a `__hash__` method, as well as an `__eq__` method, which can be hard when also adding `__repr__` method for debugging. 

The `dataclass` is an special type of class. This is used to store state, instead of containing a lot of logic on it. Every time you create a class that mostly consists of attributes, you make a data class.

* It creates automatically the `__init__` for you
* It creates `__repr__` printing the state (all attributes) of the class
* it automatically creates `__eq__` where exactly all attributes must be the same
* It automatically creates the hash IF ``FROZEN=TRUE`` (immutability), based on the tuple of all attributes, so it is safe to hash (hash does not automatically refresh if there is a variation in attributes, only when you call `hash()`, this is why `list` and `dicts` are not hashable so you dont make this mistake.)

Hash is when you put objects in **sets** or use them as **dictionary keys**. Sets and dicts need to quickly check "have i seen this before", so comparing against every item, they use a hash table (object -> id). So both instances are different in memory, but are equal with `__eq__`, so they MUST have the same hash the same hash. If you break this rule, the dictionaries will behave unpredictable.

> `dataclasses` are the more flexible than `namedtuple`. You can fit same behaviour by tuining, and also generate other comparison methods such as `__lt__` or `__gt__`