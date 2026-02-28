# Data flow in programming

As **its core**, any computational unit (function, module, service) has **explicit** and **explicit** channels for data movement.

## Explicit channels

### Input - data entering the system

- parameters / arguments (primary explicit input)
- return values from called functions
- read operations (file, database, network fetch, stdin)
- env vars and configuration

### Output - data leaving the system

- Return value
- Out-parameter or mutated references
- Write operations (file, database, network, stdout)
- Raised / thrown exceptions

## Implicit channel (often overlooked)

- Global/Shared state - read and write to global, singleton, or shared memory
- Closure - capture variables from enclosing scopes
- Side effects - logging, metrics, caching, external system calls..
- Time - current timestamp, delay, timeout...

## Errors

It is a **parallel data flow channel**, and the main patterns are: 

1. Return-based: erros as values in the return channel
2. Exception-based: errors as separate control flow path
3. callback-based - errors passed to error handlers
4. effect-based - erros as type effects

## Contract model

When designing a computation unit (i.e. a function), always ask these questions to yourself

| Question | What it clarifies |
| -------- | ----------------- |
| What does it need? | Required input, precondition, dependencies (implicit + explicit) |
| What does it promise? | return value, postconditions, guarantees (implicit + explicit) |
| What can go wrong? | error condition, exception, failure mode (what can fail and how is communicated) |
| What does it touch? | side effect, mutation, external system (what external state change) | 
| What does it assume? | implicit dependencies, global state, environment (what does it assume it exist) |

It usually flows into: 

1. Validation
2. Normalization
3. Core Logic
4. Result construction (data type)
5. Cleanup (release resource or cleanup)

Some design heuristics:

1. **Make implicit flows explicit:** if you use some global state, it is better to pass it as a parameter/argument
2. **Separe pure from impure at the boundaries:** isolate side effects at the boundaries; keep the core logic pure
3. **Errors are data:** treat error paths with the same care as success paths
4. **Minimize input/output:** fewer input/output means easier reasoning
5. **Document the contract:** types, assert, or comments that capture what is promise (docstrings if really necessary)