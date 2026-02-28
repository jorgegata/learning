# Fixture

## Definition

> Similar to what **hooks** are before/after (in arrange) the execution of the logic. It can also be done for consistent behaviour (act step). It serves a context in state and is defined within a function.

In Pytest, they are functions you define to serve this purpose mainly. They can also be defined for the **act** phase, creating a more powerful technique for designing more complex tests.

> Test functions use the fixtures (service, state, or other operating environments) when those are passed as parameters, without a limit of the number of fixtures you can pass.

You can either **return** data or **yield** data, with teardown steps in the fixture that are accomplished **after the test is done** (e.g. openning a database connection in a test).

## Error vs Fail

> Ideal is to reduce dependencies in test to have as less potential errors as possible.

If you have a subsequent fixtures happening before the test, this will be executed there. If one of those raise an exception, this will be considered as **ERROR** (not even attempted since one of those had an error before running it)

## Share data between tests

1. Physical way -> (file)
2. Fixtures -> (openning a connection)

Sometimes you want to share data between test. You can write this data in a fixture and use them in your tests.

Other good approach is to add data files in the `test` folders