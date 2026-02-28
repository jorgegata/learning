// ============================================
// 5. STRING METHODS - Most used
// ============================================

const str = "  TypeScript is Awesome!  ";

// Essential string methods
str.length;                       // 26 (property, not method!)
str.trim();                       // "TypeScript is Awesome!"
str.trimStart();                  // "TypeScript is Awesome!  "
str.trimEnd();                    // "  TypeScript is Awesome!"
str.toLowerCase();                // "  typescript is awesome!  "
str.toUpperCase();                // "  TYPESCRIPT IS AWESOME!  "

// Searching
str.includes("Script");           // true
str.startsWith("  Type");        // true
str.endsWith("!  ");              // true
str.indexOf("is");                // 13 (first occurrence)
str.lastIndexOf("e");             // 22 (last occurrence)

// Extraction
str.slice(2, 12);                 // "TypeScript" (start, end)
str.substring(2, 12);             // "TypeScript" (similar to slice)
str.substr(2, 10);                // "TypeScript" (start, length) - DEPRECATED

// Manipulation
str.replace("Awesome", "Great");  // Replace first occurrence
str.replaceAll(" ", "_");         // Replace all occurrences
str.split(" ");                   // ["", "", "TypeScript", "is", "Awesome!", "", ""]
"hello".repeat(3);                // "hellohellohello"
"hello".padStart(10, "*");        // "*****hello"
"hello".padEnd(10, "!");          // "hello!!!!!"

// Template literals (backticks)
const username = "Alice";
const message = `Hello, ${username}!`;  // "Hello, Alice!"
const multiline = `Line 1
Line 2
Line 3`;

// Tagged templates (advanced)
function highlight(strings: TemplateStringsArray, ...values: any[]) {
    return strings.reduce((acc, str, i) => 
        acc + str + (values[i] ? `**${values[i]}**` : ''), '');
}
const important = "TypeScript";
const result = highlight`Learn ${important} now!`;  // "Learn **TypeScript** now!"

// ============================================
// 6. ARRAY METHODS - The workhorses
// ============================================

const nums = [1, 2, 3, 4, 5];

// MUTATING METHODS (change original array)
nums.push(6);           // Add to end, returns new length
nums.pop();             // Remove from end, returns removed item
nums.unshift(0);        // Add to beginning
nums.shift();           // Remove from beginning
nums.reverse();         // Reverse in place
nums.sort();            // Sort in place (alphabetical by default!)
nums.sort((a, b) => a - b);  // Numeric sort
nums.splice(1, 2);      // Remove 2 items starting at index 1
nums.fill(0, 1, 3);     // Fill with 0 from index 1 to 3

// NON-MUTATING METHODS (return new array/value)
const doubled = nums.map(n => n * 2);           // Transform each element
const evens = nums.filter(n => n % 2 === 0);    // Keep matching elements
const sum2 = nums.reduce((acc, n) => acc + n, 0); // Reduce to single value
const found = nums.find(n => n > 3);            // First matching element
const foundIndex = nums.findIndex(n => n > 3);  // Index of first match
const hasEven = nums.some(n => n % 2 === 0);   // At least one matches
const allPositive = nums.every(n => n > 0);     // All match
const subset = nums.slice(1, 3);                // Extract portion
const joined = nums.join(", ");                 // Join to string
const included = nums.includes(3);              // Check if contains

// Newer array methods
nums.at(-1);            // Get last element (negative indexing!)
nums.flat();            // Flatten nested arrays
[1, [2, [3]]].flat(2);  // Deep flatten (2 levels)
nums.flatMap(n => [n, n * 2]);  // Map + flatten

// Array.from - Create array from iterable
Array.from("hello");              // ['h', 'e', 'l', 'l', 'o']
Array.from({length: 5}, (_, i) => i);  // [0, 1, 2, 3, 4]

// ============================================
// 7. OBJECT METHODS - Object manipulation
// ============================================

const obj1 = { a: 1, b: 2, c: 3 };

// Object static methods
Object.keys(obj1);         // ['a', 'b', 'c']
Object.values(obj1);       // [1, 2, 3]
Object.entries(obj1);      // [['a', 1], ['b', 2], ['c', 3]]
Object.fromEntries([['a', 1], ['b', 2]]);  // { a: 1, b: 2 }

// Property operations
Object.assign({}, obj1, { d: 4 });    // Merge objects (shallow)
Object.freeze(obj1);                  // Make immutable
Object.seal(obj1);                    // Prevent adding/removing properties
Object.preventExtensions(obj1);       // Prevent adding properties

// Property checking
Object.hasOwnProperty.call(obj1, 'a');     // true (safe check)
'b' in obj1;                               // true (includes inherited)
Object.getOwnPropertyNames(obj1);          // All property names
Object.getOwnPropertyDescriptor(obj1, 'a'); // Property details

// ============================================
// 8. TYPE OPERATORS - TypeScript specific
// ============================================

// TYPEOF - Get type of value (runtime)
console.log(typeof 42);              // "number"
console.log(typeof "hello");         // "string"
console.log(typeof true);            // "boolean"
console.log(typeof undefined);       // "undefined"
console.log(typeof null);            // "object" (JS quirk!)
console.log(typeof {});              // "object"
console.log(typeof []);              // "object"
console.log(typeof (() => {}));      // "function"

// TYPEOF in TypeScript (type level)
const someValue = { x: 10, y: 20 };
type ValueType = typeof someValue;   // { x: number; y: number }

// KEYOF - Get keys as union type
interface Person {
    name: string;
    age: number;
    email: string;
}
type PersonKeys = keyof Person;  // "name" | "age" | "email"

// IN operator for type narrowing
function processValue(value: string | number) {
    if ("length" in value) {
        // TypeScript knows it's string here
        console.log(value.toUpperCase());
    }
}

// INSTANCEOF - Check class instance
class Car {}
const myCar = new Car();
console.log(myCar instanceof Car);  // true

// AS CONST - Make literal types
const config1 = { mode: "dark" };  // type: { mode: string }
const config2 = { mode: "dark" } as const;  // type: { readonly mode: "dark" }

const colors1 = ["red", "blue"];  // string[]
const colors2 = ["red", "blue"] as const;  // readonly ["red", "blue"]

// SATISFIES - Validate type without changing it (TS 4.9+)
type Color = "red" | "green" | "blue";
const palette = {
    primary: "red",
    secondary: "green"
} satisfies Record<string, Color>;

// ============================================
// 9. LOOPS & ITERATION
// ============================================

// FOR LOOP - Classic
for (let i = 0; i < 5; i++) {
    console.log(i);  // 0, 1, 2, 3, 4
}

// FOR...OF - Iterate values (arrays, strings, etc.)
const items = ["a", "b", "c"];
for (const item of items) {
    console.log(item);  // "a", "b", "c"
}

// FOR...IN - Iterate keys (objects, arrays)
const objLoop = { a: 1, b: 2, c: 3 };
for (const key in objLoop) {
    console.log(key, objLoop[key as keyof typeof objLoop]);  // "a" 1, "b" 2, "c" 3
}

// WHILE LOOP
let i = 0;
while (i < 5) {
    console.log(i++);
}

// DO...WHILE - Executes at least once
let j = 0;
do {
    console.log(j++);
} while (j < 5);

// BREAK & CONTINUE
for (let k = 0; k < 10; k++) {
    if (k === 3) continue;  // Skip this iteration
    if (k === 7) break;     // Exit loop
    console.log(k);  // 0, 1, 2, 4, 5, 6
}

// ============================================
// 10. ERROR HANDLING
// ============================================

// TRY...CATCH...FINALLY
try {
    // Code that might throw
    const data = JSON.parse('invalid json');
} catch (error) {
    // Handle error
    if (error instanceof SyntaxError) {
        console.error("Invalid JSON:", error.message);
    }
} finally {
    // Always runs
    console.log("Cleanup");
}

// Throwing errors
function validateAge(age: number): void {
    if (age < 0) {
        throw new Error("Age cannot be negative");
    }
    if (age > 150) {
        throw new RangeError("Age seems unrealistic");
    }
}

// Custom error classes
class ValidationError extends Error {
    constructor(public field: string, message: string) {
        super(message);
        this.name = "ValidationError";
    }
}

// ============================================
// 11. ASYNC/AWAIT & PROMISES
// ============================================

// PROMISES
const promise = new Promise<string>((resolve, reject) => {
    setTimeout(() => resolve("Success!"), 1000);
});

promise
    .then(result => console.log(result))
    .catch(error => console.error(error))
    .finally(() => console.log("Done"));

// ASYNC/AWAIT - Cleaner promise syntax
async function fetchData(): Promise<string> {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch:", error);
        throw error;
    }
}

// Promise utilities
Promise.all([promise1, promise2]);      // Wait for all
Promise.allSettled([p1, p2]);          // Wait for all (don't fail)
Promise.race([p1, p2]);                 // First to resolve/reject
Promise.any([p1, p2]);                  // First to resolve

// ============================================
// 12. BUILT-IN UTILITY TYPES
// ============================================

interface User {
    id: string;
    name: string;
    email: string;
    age?: number;
}

// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<User>;

// Make all properties readonly
type ReadonlyUser = Readonly<User>;

// Pick specific properties
type UserCredentials = Pick<User, "email" | "id">;

// Omit specific properties
type PublicUser = Omit<User, "email">;

// Get type of object values
type UserValues = User[keyof User];  // string | number | undefined

// Extract/Exclude from union
type Numbers = Extract<string | number | boolean, number>;  // number
type NotNumbers = Exclude<string | number | boolean, number>;  // string | boolean

// Function types
type ReturnTypeExample = ReturnType<() => string>;  // string
type ParametersExample = Parameters<(a: string, b: number) => void>;  // [string, number]

// ============================================
// 13. SET & MAP - Modern collections
// ============================================

// SET - Unique values
const set = new Set<number>();
set.add(1);
set.add(2);
set.add(1);  // Ignored, already exists
console.log(set.size);  // 2
set.has(1);  // true
set.delete(1);
set.clear();

// Convert array to unique values
const uniqueNums = [...new Set([1, 2, 2, 3, 3, 3])];  // [1, 2, 3]

// MAP - Key-value pairs (any type as key!)
const map = new Map<string, number>();
map.set("a", 1);
map.set("b", 2);
console.log(map.get("a"));  // 1
map.has("b");  // true
map.delete("a");

// Iterate Map
for (const [key, value] of map) {
    console.log(key, value);
}

// ============================================
// 14. REGEX - Pattern matching
// ============================================

// Regular expression basics
const regex = /hello/i;  // Case insensitive
const regex2 = new RegExp("world", "g");  // Global flag

// Test and match
"Hello World".match(/hello/i);     // ["Hello"]
/hello/i.test("Hello World");      // true
"Hello World".search(/World/);     // 6 (index)

// Replace with regex
"hello hello".replace(/hello/, "hi");      // "hi hello"
"hello hello".replaceAll(/hello/g, "hi");  // "hi hi"

// Common patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
const urlRegex = /^https?:\/\/.+/;

// ============================================
// 15. JSON Operations
// ============================================

// Parse and stringify
const jsonString = '{"name": "Alice", "age": 30}';
const parsed = JSON.parse(jsonString);
const stringified = JSON.stringify(parsed);

// Pretty print
JSON.stringify(parsed, null, 2);  // Indented with 2 spaces

// Replacer function
JSON.stringify(parsed, (key, value) => {
    if (key === "password") return undefined;  // Exclude
    return value;
});

// Reviver function
JSON.parse(jsonString, (key, value) => {
    if (key === "date") return new Date(value);
    return value;
});