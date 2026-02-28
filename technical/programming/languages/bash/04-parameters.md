# Positional Parameters

A script/program becomes much more flexible if the user can pass arguments. A `bash` script accesses command line argument through **positional parameters**. Those are numbered from 1 to N.

- It can be accessed from ``${1}`` to ``${N}``

This always come with the syntax `${}` with the braces.

The following are special parameters:

- $0: name of the command that named the shell
- $*: list of all parameters. With double quotes expands to separate words
- $# number N of positional parameters.