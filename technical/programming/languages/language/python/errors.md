# Errors in python

An error happen whenever something unexpected occurts.

## try/except/else/finally

The ``try except else finally`` framework is used to test errors and other stuff:

- **try:** check for errors in a block of code
- **except:** handle the error
- **else:** execute code if no error
- **finally: **execute code after the try/except clause.

## Assertion error

This happens when an ``assert`` statement condition fail, showing up the error by itself.


```python
try:
    a = 5
    b = 10
    business_function(a, b)
    return {"success": True, "data": data}
except AssertException as e:
    return {"success": Fail, 'error':str(e)}, 400
except Exception as e:
    logger.error(f"Unexpected error: {e}")
    return {'success': False, "error": "transfer fail"}, 500
```

## Loggign errors

If the error comes from an assertion error, the message is already there so there is no need for **logging** errors. However, if it is unexpected with a general `Exception` rule, it is not bad to have `logger.error()` function there.

1. Dont log what you can assert
2. Dont log normal operations
3. Stack traces are better than logs

## Different Exception Errors 

| Type | Quality | Description |
| ---- | ------- | ----------- |
| AssertionError | TOP |During business logic |
| TypeError | TOP | During testing mypy |
| ImportError | TOP | During importing |
| Key/Attribute error | GOOD | Missing attr in class or dict |
| ValueError | GOOD | Numpy/Math dimension errors |
| ZeroError | GOOD | It does not allow to divide by zero |
| ConnectionTimeout | ACCEPTABLE | External error, not your |
| PermissionError | ACCEPTABLE | Security violation |
| Exception Generic | SHIT | Test out a large block and not capturing properly what went wrong |
| Silent failures | SHIT | try except but silent corruption |
| Boolean errors | SHIT | if something goes wrong, no message or why |
| Swallowed error | SHIT | Except and pass together | 





