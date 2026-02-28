# Reliable Python Code

Usually, a code can be categorized as reliable if:

* It does not allow to enter shitty data without a contract in a database
* It does not allow to send shitty data without a contract to an external service
* It does not break in compile time (type hints are crucial)
* It does not break in runtime time (you don't allow to crash due to a faulty condition)

## Principles

1. Validate at the edge, trust internally.
2. **Fails dast and loud:** better a crash with clear error than silent corruption
3. **Use the language** -> `assert`, `isinstance`, `hasattr`
4. **Types are the documentation** -> tell human what to pass, not machines to validate.

## Reliability layers.

1. Presentation layer

    This is an edge. Here, some ``try, except`` clauses should be include to capture potential errors. You have to separate boundaries between your clean internal tool and the dirty outside world.

2. Business logic layer

    Trust zone: this is where you assert make sense, do your business logic, always trust the data. If bad data got here, just crash to reveal the bug.

3. Persistence layer

    This deep in the system, validation is a code smell. The database will tell you if constraints are violated.

### Trusting zones

If you validate the same field twice in your system, the architecture is intrinsically wrong.

| Untrusted Zone | Trust Boundary | Trusted Zone |
| -------------- | -------------- | ------------ |
| External API, webhook, file upload, user browser | Your api endpoint (validate here) | Business logic, Database, Cache, Message queue | 


