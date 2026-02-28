# Basic of Pytest

Pytest is a Python framework to execute tests in an **automated way**, providing help with state management and any other topics related to:

1. Unit tests: check if individual unit tests work properly
2. End-to-end test: acknowledge that distinct parts of the software works accordingly in the system (this might be interfaces)
3. Integration system: check that our repository or system integrate properly with other established systems inside our ecosystem.

The idea is to be consistent in the development time. Do not forget that this is an important part of the **SDLC**, that it increases **realiability** and **quality** of our code. It is so important that some design parameters has been derived out of this (Test-Driven-Development, TDD)

## Structure and naming convention

The convention is to create a folder called `tests/` where all the test are read from the framework.

Test files should be named either `test_*.py` or `*_test.py`. We go for the first one to separate it from the logic file. Usually it copies the same name of the module.

Functions should be named `test_*`

Classes should be named `Test` with the first one as capital letter.

## Best practices

### General

- Make the package installable to ensure that the imports are correct everywhere.
- Mirror the **source structure** in your `tests/` folder
- Independence of **test**: one test should not rely on the state or execution order
- Keep test small and focus (only test one specific behaviour, making failure easy to diagnose)

### Conftest

- For shared fixtures, use the `conftest.py`. Each directory can have its own, adding to the root file in there.

- Dont' overload `conftest.py`: keep it simple, split into multiple if needed

### Fixtures

- Select the correct scope for the fixture in `function`, `class`, `module`, `package` or `session` based on how expensive the setup is and isolation needs.

- Keep fixtures simple, used to setup and clean operations, not complex logic
  
- Use the factory pattern for fixtures that need parameters.

```python
@pytest.fixture
def make_user():
    def _make_user(name, role="user"):
        return User(name=name, role=role)
    return _make_user
```

- Fixture can use broad-scoped fixture, but not narrower: a `function` fixture can use `session` fixture, but not vice versa.

### Parametrize

- Use `@pytest.mark.parametrize` for test

```python
@pytest.mark.parametrize("a, b, expected", [
    (0, 10, 100), 
    (10, 200, 4000)
])
def test_add(a, b, expected):
    assert add(a, b) == expected
```

- Parametrize fixtures when the same fixture is needed in multiple configurations.

### Markers

> You can run selectively with `pytest -m "not slow"` or `pytest -m integration` (as you can see, you can add logic conditions there)

- Register custom markers in `pyproject.toml` or `pytest.ini`

```ini
[pytest]
markers = 
    slow: marks tests as slow
    integration: marks integration tests
```

- Enable strict markes to catch typos
- Use markers to categorize tests

```python
@pytest.mark.slow
def test_large_dataset(): ...

@pytest.mark.integration()
def test_api_call(): ...
```

## Mocking

- **Mock at the right level**: patch where the function is used, not where it's defined
- **Use `autospec=True` to ensure mocks match the real interface
- **Prefer dependency injection** over excessive mocking when possible (makes the code more testeable)

```python
from unittest.mock import patch

@patch('myapp.services.external_api_call')
def test_service(mock_api):
    mock_api.return_value = {"status": "ok"}
    result = my_service_function()
    assert result["status"] == "ok"
```

## Test organization

- Testing pyramid: many unit test, fewer integration tests, fewest end-to-end test. 





## Common operations

- Classic unit test
```python
def test_unit_function():
    # 1. Arrange: this could be extrapolated in a fixture
    print(f"Some file read or database created maybe, whatever it is needed for general context")
    # 2. Act:
    print(f"Some logic performed here")
    # 3. Assert
    assert 1 == 1
    # 4. Cleanup resources if needed
```

- Create a fixture (passed to the tests as fixtures).

The fixtures can return: a primitive, a classic structure, an object instance, no return at all setting up, for example, env vars or state as a side effect (just setup global context, monkeypatch.setenv("DEBUG", "true"))

```python
@pytest.fixture
def generate_database_connection():
    # Do whatever it takes
    # RETURN if you want to return maybe a specific data to be shared between tests
    # YIELD if you want to deliver a value, but still do some things afterward.
    return "send data and finalize"
    yield "send something but do cleanup afterward
```

## Scaling with parametrization

How to run hundred of test cases using a single test function without repeating yourself.

## Plugin Ecosystem and Configuration

Understand `tests/conftest.py`, markers, and how to customize the framework behavior for complex environments.

Also, understand the `pytest.ini` file in the top of the repository.