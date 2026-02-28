# Configuration data

Those are passed as env vars and then stored maybe in a single file? `helpers.py` could be an example.

```python
from os import getenv

DEBUG = getenv("DEBUG", 0)
```

Some parts of the code might have gentenv variable to get this read closer to the code that actually reads that (not system-wide, but script-wide)

`@Context(DEBUG=4)` you can use that decorator to use an specific env var value on a specific function for that. You can use it as **context manager**

```python
with Context(DEBUG=0):
    a = Tensor.ones(10,10)
    a *= 2
```

Nothing as a `config.py`, nothing as `.env` files. Only:

1. env vars from the OS.
2. a helper `getenv` with defaults.
3. direct imports whereas it is needed.

This is the minimalist approach, without unnecessary abstraction. 