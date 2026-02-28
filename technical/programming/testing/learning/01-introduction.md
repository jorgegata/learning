# Testing introduction

## Testing definition

This is a part of the **Software Development Life Cycle**. Consist on the verification and validation of a software to consider it is free of bugs (meets requirements from Design and Development) and satisfies user requirements.

> Usually, the test phase is **goal driven** (you make asserts to a general thruth)

Testing means comparison through a **universal truth**. It implies that we know the good output, and we test transformations or functions against several input and/or initial states: lot of combinations (combinatory).

Testing depends on:

1. Standard testing requirements of the enterprise
2. Used language where functions are written
3. Development paradigm (agile)

As a standalone developer, it is best practice to focus on speed and continuous integration, with some asserts (pre-conditions, post-conditions, check managing of state...) in the core logic rather than having a separate testing suite in your codebase.

## Testing conditions

Testing can be done either with artificial conditions or real conditions (workload, parameters change and considering multiple states/input abruptly). 

## Types of testing

- Manual testing
    
    - Knowledge of the codebase
        
        - White box (structure of code)
        - Gray box (structure of code)
        - Black box (structure of code)

    - Based of functionality
        
        - Functional (function/features)
            - unit test: individual unit or components of an application
            - end-to-end test: how different units or components interacts (interfaces) with each other
            - system test: overall functionality and performance of a complete and fully integrated software solution with other systems

        - Non-functional (requirements):
            - Performance
            - Compatibility
            - Usability

- Automated testing (consistent scenarios, manage global state...)

## Hierarchy of testing

unit test > integration test > system test > acceptance test

The User Acceptance Testing (UAT) ensures that the requirements are fulfilled before its deployment to a production environment.

## Coverage

> Combinatorics are used to maximize test coverage and minimize test code.

Good unit test covers all inputs, initial states, and outputs potential range of values in **cases**. **However, this is highly unfeasible** and we use therefore combinatorics

## The importance of testing

> In general, it improves **reliability** (functional) and **quality** (non-functional) requirements.

* Address critical issues before and after production
* Save money and time
* Poor design decisions, architectural flaws
* Scalability issues
* Security vulnerabilities