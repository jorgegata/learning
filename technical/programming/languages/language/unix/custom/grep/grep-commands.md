# Grep

Command used to look for patterns inside files

## Searching for a word in a single file

```bash
grep "fox" story.txt
```

It prints the line where the word is contained.

## Case-Insensitive search -i

-i

```bash
grep -i 'fox' story.txt
```

this make case insensitive, so it matches fox and Fox

## Searching in multiple files

It would be as easy as adding those at the end

```bash
grep -i 'fox' file1 file2

# Output is story.txt:line.
```

## Search for an exact word match

-w

grep -w "fox" story.txt

it ensures it only matches the word 'fox'

## Inverting the match

-v

To select lines that DO NOT contain the word

```bash
grep -v 'INFO' data.log
```

## Displaying the line number

-n

This displays each line number of the match

```bash
grep -n 'milk' shopping.list
```

## Recursive search in a directory

-r

```bash
grep -r 'milk' .

```

## Listing filenames that contain a match

grep -l 'dog' file1 file2

## REGULAR EXPRESSIONS

The true power of grep it's in the use of regular expressions

### Line that start with a pattern ^

^

```bash
grep "^\[" data.log
```

It finds all the lines that start with a `[` character. The `\` is used to escape the `[` as it means a special character

### Searching for lines that end with a pattern

$ symbol

```bash
grep "END.$" file
```

### Extended regular expressions

-E

This is used for more powerful regex without using the escape for special characters like `(` or `[`

```bash
grep -E "WARNING|ERROR" data.log
```




summary

grep is used to search text pattern in files (specific or those contained in a directory)

then, you have:

- case insensitive -i
- exact match -w
- multiple files (grep 'fox' file1 file2)
- directory (grep -r 'fox' .)
- do not contain the pattern -v
- line number -n
- files that contain the pattern -l
- regex expression can be used, and Extended Regex (-E flag)
