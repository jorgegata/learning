# Data structure

A data structure is a container in a specific shape to store information (memory of different data types) in a way that is logical to the use case we do.

## Types

### Hash

A hash table is basically a key-value pair, where the complexity to look for an specific value it's almost instant. It's kind of a way to index information. Provides very fast lookups. 

### Array

An array allows to store items in certain positions, allowing for mutability or immutability. It's stored in a contiguous block of memory allowing for random access 

### Stacks (LIFO)

Linear data structure that follows Last-in, First-out (LIFO). It is commonly used for managing cuntino calls ina  program execution 

### Queues (FIFO)

Linear data structure that follows "First-In, First-Out" principle that need to be processes in the order they were received, like a waiting line 

### Linked List

It is non-contiguous, the data is typically allocated one by one to individual elements. The insertion/deletion is efficient and the access is sequential.

The order is not given by their physical placement in memory. It is composed of nodes linked one after another, so you have the data store and the pointer. The data access is linear as those are serialized, it can be used as a building block to build other data structures.

Best is that the insertion/deletion is simpler as the nodes are not stored in contiguous blocks of memory. It does not allow random access as give the last node, or find a node that contains a given datum, so you will need to iterate through elements.

### Trees

Other: trie (prefix tree) is a specialized data structure used to strore and retrieve strings from a dictionary or set.

Non-linear data used to represehnt hierarchical data. Common example include binary search trees and tries (useful for searching and autocompletion)

### Graphs

Non-linear data structures consisting of nodes and edges, use to model network and relationships, such as social network or road maps.


## Data Transfer Objects (DTOs)

Data structure that send data from one part of the system to another. It defines the safety and typing of the codebase, as well as immutability, mutability...
In general, you want to define a contract between two parts (sender and receiver) with security (immutability) unless you need to derive or modify some parts of it.
Thus, TypedDict is just to ensure good typing compliance. NamedTuple is only to ensure good property definition on immutability. A dataclass is mostly to set up a class containing dat (if you need methods, it would be more a class that a DTO).
Only if you need data validation and transformation (serialize to JSON or any other kind of transform), then you would go for **attr** or **pydantic (comon framework for FastAPI)**

### Options in Python

**NamedTuple (typing)**: immutable object comming from a dictionary that allow for annotation and fixed key. can be transformed to dict, there is no validation here (manual)
**TypedDict (typing)**: dictionary coming from a class used for annotation, but dict methods can be used here. It is also enforced for key, there is no validation here (manual)
**dataclass**: type of class used to store data in there. You can fix params using frozen=true, so it becomes immutable. You can construct the object from dict, from the api, or transform it to dictionaries.
**attr** is like dataclasses, but more functional and provide a more detailed description. You can also setup defaiult values and validation...
**pydantic** is for data validation and data conversion. it uses type hint to define data schema and converts JSON data into Python objects. Scenario where data validation and converison is needed (web form, api, databases...) -> BaseModel, Field, field_validator (comparable to Zod, but the integration it's a little bit different)

### Other validation options

You just use assert to make certain validation checks. **If data goes that deep in the system, you are already fucked up**

```python
def forward(self, x):
    assert x.shape[0] > 0, "batch size must be positive"
    assert len(x.shape) == 4, f"expected 4D tensor, got {len(x.shape)}D"
    return self.conv(x)
```






