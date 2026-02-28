# Redirection

A program that reads from the command line is said to read from **standard input** (it can read a few parameters...)

One can write this info into a file and redirect it with `program < data.ini`

- If outpout is visible in the command line, it is written to either standard output or standard error. If it has a lot, you might want to put it a file

`1>` - redirects standard output
`2>` - redirects standard error
`2>&1` - whatever stderror is redirected to standard output

## Pipelines

This is a tool chaining method. It is used for programs that read from the standard input and writes to the standard out. 

`grep "^ATOM" myfile.pdb | grep CA > mainchain.pdb`

## Aliases

> An alias is a short-hand for a command

`alias ls='ls --color'`
`alias ll='ls -la'`

## Function

> An alias is ok for a short command. For more complex command, one can use a function.

A **function** is defined by the optional word `function`, its name, followed by bracked and the function body enclosed by braces.

