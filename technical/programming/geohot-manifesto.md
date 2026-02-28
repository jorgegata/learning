# Geohot Style

This file contains the principles geohot uses to code and understand how the systems work. The principles are:

1. Don't fall into study-trap: get minimal context and start coding immediately.
2. Simplicity is inelligence: smart code is not clever, it is obvious. Every abstraction you add it might seem that you dont understand the problem enough.
3. Speed over perfection: perfect is the enemy of shipper. The first version will be wrong anyway.
4. YAGNI (You Aint Going to Need It) - dont add abstraction layers for "future flexibility". The moment you need it, you refactor, but most of the time you will not need it.
5. Complexity is a bug, not a feature.

Algorithm: 

```python
while not understand(problem):
    # 1. Attack the problem
    try:
        build_naive_solution()
    except StuckError:
        # 2. Decomposed if stuck
        find_smallest_confusing_part()
        google_that_specific_thing()
        build_that_part_alone()
    
    # 3. Integrate and simplify
    if works_but_ugly():
        ship_it()
        then_refactor()
    
    # 4. Real test
    if lines_of_code > too_much:
        redo_it()
    
    # 5. Beauty is understanding
    if still_complex():
        you_dont_understand_yet()
    
    # Go to step 1

```
1. See a problem - decompose it in simple parts.
2. Build the simplest solution for each part.
3. If it gets complex, simplify.
4. If you cannot, you did not understand it.
5. Keep building until you understand it.

## Does GH knows the software engineering design patterns?

He does not care about software engineeirng design patterns. The philoshophy of tinygrad is to maintain as lower code as possible. If you apply SOLID principles by heart, you get x10 times the code.

Every simple thing becomes an interface, an abstract factory, a dependency injection container... The opposite of the geohot way

## How does he think about the documentation

1. Code IS the documentation (small docstrings, comment next to the line)
2. Examples over explanations (include a examples/ showing the working code)
3. Only experts document
4. Document the hard stuff, not the obvious (if it's a complex model, but not for example what a matrix is)
5. Documentation structure
    - README.md: quick example, how to install, how to contribute...
    - docs/ -> only the non-obvious stuff
    - examples/ -> working code that shows usage
    - tests/ -> these ARE documentation by definition (defines how it should work)

He's against **BS Documentation** -> good code does not need documentation. Complex algorithm / data models need documentation.

## Meta-orientation on learning

1. **Read for orientation, build for understanding:** he wants to have the high-level concept from papers/books, then immediately builds it to actually understand
2. **Paper over tutorials:** he would actually goes to the deepest documentation (maybe arXiv) over a Medium tutorial.
3. Reading -> Building -> Understanding through frustration.

