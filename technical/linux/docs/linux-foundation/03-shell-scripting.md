# Shell scripting

Area of programming that interacts with the operating systen (filesystem, memory, disk, network) processes based on conditional clauses (conditionals, variables, loops, functions, exit code). It contains the `.sh` extension at the end.

> We can use bash commands into these scripting files

> bash does not support native float operations

```bash
#!/bin/bash (shebang to use the bash shell as the interpreter for executing the script)

# Variables
name="World"
echo "Hello, $name"
# Environment variables (system-wide env vars)
echo "This is an env var $PATH"

my_function() {
    local local_var="I am local"
    echo $local_var
}
my_function

# Concatenation string
string_1="Hello, "
string_2="world"
echo "$string_1$string_2"

# Airthmetic operations (addition, substraction, multiplication, and division)
num1=5
num2=10
sum=$((num1 + num2))
echo "This is the $sum"

# Arrays
fruits=("apple" "banana" "cherry")
for fruit in "${fruits[@]}"; do # iterate over arrays and modify values
    echo $fruit
done

# Associative arrays (dictionaries)
declare -A colors
colors[apple]="red"
colors[banana]="yellow"
unset colors[banana]
echo ${colors[apple]} # red
```

## Operators

- Comparison operator: -eq, -ne, -gt, -lt, -le, -ge
- String comparison operator: =, !=, < (less than, in ASCII alphabetical order), > (greater than, in ASCII alphabetical order)
- Arithmetic operations: +, -, *, /, % (modulus), exponential, use `bc` or `awk`
- Logical operators: && (AND), || (OR), ! (NOT)
- File test operator: -e (check if file exists), -d (check if directory exits), -f (check if a file is a regular file), -s (check if a file is not empty)

## if else

```bash
num=15
if [ num -gt 10 ]; then
    echo "Number is greater than 10"
elif [ $num -eq 10 ]; then
    echo "Number is exactly 10"
else
    echo "Number is 10 or less"
fi
```

## loops

