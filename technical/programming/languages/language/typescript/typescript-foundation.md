# Typescript Core: Operators, Methods, and Built-in Features

## 1. Operators

### Arithmetics (value for number)

+, - , *, /, %, **

### Increment/decrement (value for number and retain)

count++, ++count, count--, --count (pos-decrement first store the value in a var, and then decrement. pre-decrement first decrement and then store. **IT IS NOT THE SAME**)

### Assignment (variable for number)

+=, -=, *=, /=, %=, **=

### Comparison (values and types)

* ==: loose equality
* ===: strict equality
* !=: loose inequality
* !==: strict inequality
* >: greater than
* <: less than
* >=: greater than or equal
* <=: less than or equal


This is a world by itself. Loose equality and strict equality -> strict consideres **value** and **type**, the loose equality kinds of try to convert to the same type and then compare the value.

### Logical (boolean)

* AND - &&
* OR - ||
* NOT - !
* true
* false

### Nullish coalescing (null/undefined ??)

Only null(declared and empty value assigned) / undefined (declared but not assigned a value) trigger default

Return the right hand default value when operand is `null` or `undefined` (but not other falsy values, such as 0, '', or NaN)

```javascript
const foo = null ?? "not a string"
```

The || can return falsy values, as it is actually a OR operator so it takes one or the other.

### Optional chaining

Safely accessing nested operations (?.) - this usually happends when the object can be ``undefined`` or `null` and it returns undefined instead of throwing an error.

This can be used as well in optional method calling - obj.method?.(), and again, returns undefined

## 2. Ternary & Conditional Operators

### Ternary

Basically, a ternary operator is an inline if/else. Then, it can have one line as (cond) ? <if_yes> : <if_no>

```javascript
const age = 18;
const status = age >= 18 ? "adult" : "minor"
```

But you can have nested ternary. This is basically (cond) ? <if_yes: value> : (cond) ? <if_yes_value> : (cond) ? <if_yes>...

```javascript
const score = 85;
const frade = score >= 90 ? "A"
            : score >= 80 ? "B"
            ...
```

### Switch

```typescript
const day = "Monday";
switch (day) {
    case "Monday":
    case "Tuesday":
        console.log("Work day")
        break;
    default:
            console.log("Mid-week")
}
```

## 3. Destructuring

### Object

```typescript
const person = {
    name: "Bob",
    age: 30,
}

const {name, age: userAge} = person // rename age to userAge
const { city, state = "unknown" } // default

const data = {
    user: {
        profile: {
            firstName: "John",
            lastName: "Doe"
        }
    }
};
const { user: { profile: { firstName } } } = data; // nested destructuring
```

### Array

```typescript
const [first, second, ...rest] = [1, 2, 3, 4, 5] // first: 1, second: 2, rest: [3, 4, 5]
const [, , third] = numberss; // skip first two
let aa = 1, bb = 2
[aa, bb] = [bb, aa] // swap variables
```

## 4. Expand operators

### Spread operator ...

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2] // [1,2,3,4,5,6] - same for objects.

// copy array (shallow)
const copyArray = [...arr1]
```

### Collect remaining (used in functions)

```javascript
function sum(...nums: number[]): number {
    return nums.reduce((a, b) => a + b, 0)
}
```

## Exercises

### Exercise 1 - Nullish Coallescence

You're building a user settings system where users can configure their notification preferences. Some users explicitly set their notification count to 0 (meaning "don't show badge"), while others haven't configured it yet (null or undefined), so you want to show a default of 10.

```javascript
function getNotificationBadge(userSettings) {
    // Option A
    const count = userSettings.notificationCount ?? 10;
    
    // Option B
    const count = userSettings.notificationCount || 10;
    
    return count;
}
```
Your task:

* Explain what will happen with Option A vs Option B when userSettings.notificationCount is 0
* Which option should you use and why?
* Give me 3 other real-world scenarios where this distinction matters

1. In Option A, count will be assigned to ''10'' if notificationCount is `null` or  `undefined`, but it will keep its 0 value. However, in Option B, this will not happen and it will modify to default 10 as it detects 0 (or '' or Nan)
2. To your behaviour, option A is correct.
3. It depends if we want to keep empty fields ('' surname) instead of a default value. Another one would be if you open a bank account, with null or undefined value. Another one would be properties of a game character.

### Exercise 2 - Destructuring with Spread

Goal -> API response and separation of sensitive info from safe info:

```javascript
const apiResponse = {
    id: 123,
    username: "alice",
    email: "alice@example.com",
    password: "hashed_pwd",
    role: "admin",
    settings: {
        theme: "dark",
        notifications: true
    }
};
```
Task -> 1. destructuring to extract password into one variable, and everything else into a safeData object. 2. Extract email and password, everything else in safedata. 3. extract theme from the nested

```javascript
interface safeData {
    id: number
    username: string
    role: string
    settings: {
        notifications: boolean
    }
};

const apiResponse = {
    id: 123,
    username: "alice",
    email: "alice@example.com",
    password: "hashed_pwd",
    role: "admin",
    settings: {
        theme: "dark",
        notifications: true
    }
};
// Part 1
const {password, ...safeData} = apiResponse;

// Part 2
const {password, email, settings, ...rest } = apiResponse; // Cannot mix nested destructuring
const {theme, ...restSettings} = settings;
const safeData = {...rest, settings: restSettings} // Rebuild Safe Data

// Extraction (into vars) + Reconstruction (Spread)

const {password, email, settings: {theme, ...restSettings}, ...rest} = apiResponse;
const safeData = {...rest, settings: restSettings} // reconstruction
```

### Question 3 - Optional chaining

Context -> Fetching data from an unreliable API

```javascript
const apiData = {
    user: {
        profile: {
            name: "Bob"
            // address might not exist
        }
        // subscription might not exist
    }
}
```

Task -> 1. Safely gets apiData.user.profile.adress.city with a fallback to "Unknown". 2. facely call apiData.user.susbscription.cancel() only if method exist. 3. gets the lenght of apiData.user.orders arary, but if orders don't exist, return 0 (not undefined)

```javascript
// 1.
const userCity = apiData.user.profile.adress?.city ?? "Unknown"

// 2.
apiData.user.subscription.cancel?.()

// 3.
const lengthOrders = apiData.user.orders?.length() ?? 0
```

### Question 4 - Spread Operator - Shallow vs Deep Copy Problem

The shallow copy is created when the object is recreated into another one with {...obj}. This does not modify in memory the copied copy but the original one.

**To create a copy**
* Use structuredClone(original) - losses functions and not supported in older browser
* Recurring function
* Use lodash - import _ from 'lodash';  const deepCopy = _.cloneDeep(original);

### Question 5 - Combining everything - realworld scenario

Goal -> write a function mergeSettings(defaults, user) that: 1. return a merged setting object. 2. user setting should override default. 3. for nested objects, it should merge deeply (not replace the whole object).

Note: use destructuring, spread operators, and nullish coalescing where appropiate

```javascript

interface userSettings {
    theme: string;
    notifications: { email: boolean, push: boolean, sms: boolean };
    privacy: { shareData: boolean, analytics: boolean }
}

const defaultSettings: userSettings = {
    theme: "light",
    notifications: {
        email: true,
        push: true,
        sms: false
    },
    privacy: {
        shareData: false,
        analytics: true
    }
};

const userSettings = {
    theme: "dark",
    notifications: {
        push: false
    }
    // privacy not specified
};
```

```typescript
const array: number[] = [1, 2, 3]

```