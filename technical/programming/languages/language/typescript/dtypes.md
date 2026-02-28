# Data typing concept

## What is an Utility Type / Mapped Type

A mapped type is a new type that transform properties of an existing type (like `.map()` for types!)

```jsx
interface {
    name: string;
    age: number;
}

type Readonly<T> = {
    readonly [K in keyof T]: T[K] // add readonly modifier
}

type ReadonlyUser = Readonly<User>
```

An utility type is a built-in helper type that use mapped types under the hood.

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

// Partial - Make all properties optional
type MaybeUser = Partial<User>

// Pick - select specific properties
type PublicUser = Pick<User, 'id' | 'name'>

// Omit - excludes specific properties
type SafeUser = Omit<User, 'password'>

// Required - makes all properties required
type CompleteUser = Required<Partial<User>>
```

The real power comes **In the composing part of it**

## Data Packages

So when we want to define a data package with properties, in Python we use `dataclasses` that are created at runtime objects, so it creates an ACTUAL object.

In typescript, interface/type it is done at compile-time only, it disappears after compilation

```typescript
type User = {
    name: string;
    age: number;
    email?: string;
}

interface IUser {
    name: string;
    age: number;
    email?: string;
}

const user: User = { name: "John", age: 30 }
```

The ACTUAL equivalent is typescript classes

```typescript
class User {
    constructor(
        public name: string,
        public age: number,
        public email: string = "no@email.com"
    ) {}
}

const user = new User("John", 30);
console.log(user.name)
user.age = 31
```

The real difference is that in Python **you need classes for structure**, however, in typescript you dont need that (just type, so it gives you autocompletion and structure)

```python
@dataclasses
class User:
    name: str
    age: int

user = User("John", 30) # Structured, autocomplete, runtime validation
```

In Typescript, most of the cases you do `Type + Object` with a factory function for defaults. (wrapper that return the object). If you need runtime, then you create the class.

> The type system is powerful enough that you dont need actual classes for data.

> Object are cool if you need to check instanceof, you need those at runtime, you need OOP attributes or you need methods.


## Compile vs runtime misconception

At compile-time, user assumes its a user. However, at runtime it can be anything (It is at the end just javascript).

```typescript
const apiResponse = await fetch('url')
const user: User = apiResponse.json() // DANGEROUS

// typescript
function processUser(user: User) {
    console.log(user.name.toUpperCase());
}

// to this javascript
function processUser(user) {
    console.log(user.name.toUpperCase());
}

// this breaks
processUser({ naam: "John", age: 30 }); //typescript cant catch this if the data comes from API or user input

```

### Zod solution (pydantic-equivalent)

In general, you define the schema and the validation rules as in the pydantic model.

```typescript
// define schema (like pydantic model)
const UserSchema = z.object({
    name: z.string(),
    age: z.number().positive()
    email: z.string().email().optional(),
});

// Infer the Typescript type from schema
type User = z.infer<typeof UserSchema>;

// Runtime validation
try {
    const user = UserSchema.parse({
        name: ,
        age: ,
        email: 
    });
} catch (error) {
    console.log(error.errors)
}
```

With Zod, you just 'dont hope' it matches User type

* Type and validation are together.
* Validation on nested objects are a nightmare
* Detailed error messages with paths
* Transformations and Refinements
* Composition and Reusability
* Discriminated Unions
* Performance & Bundle Size Argument

You should not trust internet to send you good data. It might compile good, but the runtime can really break.

You dont validate because you expect your code to break. You validate because you expect users to send garbage.

## Interface vs Types

Both define object shapes, but both have key differences:

1. Syntax difference:
    * Interface:
    ```typescript
    // Interface
    interface User {
        name: string;
        age: number;
    }

    // Type
    type User = {
        name: string;
        age: number;
    };

    ```

2. Feature difference

    | Feature | Interface | Type |
    | ------- | --------- | ---- |
    | 1. Extension | ``extends`` keyword | ``&`` intersection |
    | 2. Declaration Merging | ✅ Yes | ❌ No |
    | 3. Primitives/Unions | ❌ No | ✅ Yes |
    | 4. Computed Properties | ❌ Limited | ✅ Yes |
    | 5. Performance | Slightly faster | Slightly slower |

    1. Different type of extension

    ```typescript
    // Interface - use extends
    interface Animal {
        name: string;
    }
    interface Dog extends Animal {
        breed: string;
    }

    // Type - uses intersection
    type Animal = {
        name: string;
    }

    type Dog = Animal & {
        title: string;
    }
    ```

    2. If you declare an interface (same name) multiple times, it merges.

    ```typescript
    interface Window {
        cleanliness: decimal;
    }
    interface Window {
        size: tuple;
    }
    ```

    3. Type can represent unions, primitives, tuples

    ```typescript
    type ID = string | number;
    type Status = 'pending' | 'approved' | 'rejected';
    type Coordinates = [number, number];
    ```

    4. Computed Properties

    ```typescript
    // Type - support mapped types
    type ReadOnly<T> = {
        readonly [K if keyof T]: T[K];
    }

    // Interface - cannot do this directly.
    interface ReadOnly<T> {
        // ...
    }

### When to use each

**Rule of thumb** -> use **interface** for objects you own, and the rest **type**

User interface when:
- Define object shape (especially for classes)
- Build public API (declaration merging is useful)
- Extending existing types
- Slight performance matters (large codebase)

Use type when:
- Define unions, primitives, or tuples
- Use utility types or mapped types
- Creating complex derived types
- Need computed property names.