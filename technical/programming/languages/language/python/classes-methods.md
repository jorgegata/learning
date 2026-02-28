# Classes

A class is a wrapper that represent states of a physical entity. It has attributes, it can perform actions based on external (parameters) or internal (attrs). It can change state if the class wants to.

## Staticmethods

Just a namespace grouping, not a OOP itself. It provides organization without OOP bullshit. He wants to maintain stateless.

1. Grouping related pure functions
2. Factory patterns without bullshit
3. Validation or utility groups

Never: stateful static methods, mixed static and instance, fake oop

## Classmethods

The class methods are really good whenever you want alternative constructors or need subclass compatibility. So you self init the instance with some parameters in advanced, and how you can reach that parameter state can vary with, for example, premade data coming from a shape

```python

class Tensor:
    def __init__(self, data):
        self.data = np.array(data)
    
    @classmethod
    def zeros(cls, shape):
        return cls(np.zeros(shape))
    
    @classmethod
    def from_file(cls, filepath):
        data = np.load(filepath)
        return cls(data)

class GPUTensor(Tensor):
    pass # it returns GPUTensor, not Tensor, so subclassing still work
```

Bad examples are when you want to use @classmethod for configuration (sometimes is better just a proper singleton), when you want complex inheritance with classmethods, or when you using cls when you dont need it.

## Self-methods

Used to provide instance of an object (representation of reality) where you can actually have multiple states for multiple clones of that "blueprint". It combines internal state data with external interaction (params). It can perform actions on both through the methods.