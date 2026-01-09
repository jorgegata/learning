# Errors and Exceptions

In computation, this is the biggest constraint and source of information for a program to do not perform what it is intended for. There are many ways to handle this errors/exceptions, so let's explain it here using **Python**

## How to know what can go wrong?

We do have a base knowledge where we know there are certain things that are prohibited... we know this as rules (e.g.ZeroDivisionError). Some other are defined by humans and are a little bit trickier from advance. There are some ways to see what can be an exception. 

1. Read the documentation of a function or class, and check what `raise` error can appear
2. Read the source: when third-party code or when docs are lacking
3. Type hints: sometimes it says through types that it is not well done
4. Empirical discovery: generically with try/except when we want to catch high-level errors
5. Know the common suspects (python documentation)

## Full try/except clause

```python
try:
    result = parse(data)
except ValueError as e:
    handle_valie_error(e) # Handle specific error
except (IOError, OSError) as e:
    handle_io_error(e) # Handle multiple error
else:
    # Runs if no exception occur
    process(result)
finally:
    # Always run, resource cleanup occurs here if there is no Context Manager.
```

You usually go with context managers for resource cleaner (`with open() as f`)

## Validation patterns

1. Conver exceptions to return values
2. Default values with graceful degradation
3. Fail fast with validation
4. Custom exceptions for your domain

## Decision guide (error catching)

| Situation | Strategy | Explanation |
| --------- | -------- | ----------- | 
| Can recover meaningfully | catch and handle |
| You cannot recover but can add context | catch, wrap, re-raise | You cannot fix the problem at this level, but you know something useful that the code above you does not know. 
| Big programming bug | Let it crash |
| Resource cleanup needed | use `finally` |
| Caller should decide | Document and Propagate |

A good way to avoid errors is basically write good testing and caching them appropiately. 

### Example of can recover meaningfully

You can do something that make the problem **go away** from the caller perspective, meaning in that specific scope. **The operations succeed, but on a different path**

```python
def get_user_preference(user_id: str, key: str) -> str:
    try:
        return load_preferences(user_id)[key]
    except:
        return DEFAULT_PREFERENCES[key]
```

As another example, a try to `fetch` data from an external system (one return way possible, one error way, but you can recover on multiple tries):

```python
def fetch_data(url: str, retries: int = 3) -> dict:
    for attempt in range(retries):
        try:
            return requests.get(url).json()
        except ConnectionError:
            time.sleep(2 ** attempt)
    raise FetchError(f"Failed after {retries} attempt")
```

Also, you can recover from a miss cache regenerating the response, saving it on cache, and returning it in thumb. 

### Example of cannot recover but wraps

In the example below, the FileNotFound error message was too low-level. It tells you
what happened but not why directly.

`ConfigError() from e` this means that python remember the new error you have raised (what it means) and the original error (what actually happened)
When to use:

* Boundaries between your system and other systems.
* Translating library exception into your app exception hierarchy.
* Adding "which user/request/operation" context to generic errors.

```python
def read_from_config(user_id: str) -> None:
    path: str = f"users/data/{user_id}.json"
    try:
        with open(path, 'r') as f:
            lines: list[str] = f.readlines()
    except FileNotFound as e:
        raise ConfigError(f"No config file for user '{user_id}'") from e
```

### Example of dependent of the caller

There are some ways that you know something might happen and fail, but you let them to happen without a wrapper (no try/except).

- **CLI (meaningful message):** you want them to fail and have then a meaningful example
- **Web App (return a bad response):** you dont want them to fail and return a 500 or 404 HTTP Response depending on the error faced.
- **Batch processor (skip and log):** you do try/except and in the except, you log it in a warning and continue with that. 


