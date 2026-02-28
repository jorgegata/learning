# Settings

## Module-level settings

Whenever you run a module, there can be a settings option at the beginning of the module
where you adjust different entities

It is done with `pd.set_option('entity.attr', value)`

```python
# Example of usage
pd.set_option(display.max_columns, None)
```

There are multiple attributes that can be visited [here](https://pandas.pydata.org/docs/reference/api/pandas.set_option.html)

The usage can be done on:

- Project level
- Module level (beggining of module)
- Context level (`with` statement)
