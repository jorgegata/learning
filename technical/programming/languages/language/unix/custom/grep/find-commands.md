# Find

The command is used to search for files and directories in a directory hierachy based on various criterias

## BEGINNER

## Finding all files and directory

Fundamental use of find, listing all directories and files inside it. Algorithm of searching as a Breadth-Fist-Search

```bash
find .
```

### Finding files by name inside a specific directory

-name

```bash
find project/ -name "app.js"
```

### Finding file by name with wildcards

```bash
find . -name 'log.txt' "*.log"
```

### Case-insensitive name

-iname

```bash
find . -iname "readme.md"
```

### Finding by type

-type

```bash
find . -type f -name 'hello.log'
```

## INTERMIDIATE

### AND condition

```bash
find . -type f -name '*.js'
```

This means find here AND file types AND ending with .js

### OR condition

```bash
find . -type f -name "*.js" -o -name "*.jsx"
```

### Finding files by modification time

-mtime -1 (1 day less)
-mmin -1 (1 min less)

### Finding files by size

-size

```bash
find . -size +1k
```

### Finding empty directories

-empty

```bash
find directory -type f -empty
```

## ADVANCED

### Executing command on a file

### Executing command on multiple files

### Deleting

### Pruning specific directories
