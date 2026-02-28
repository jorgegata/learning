# Characteristics

- A shell is a command interpreter that allow the user enter command and process its result. It allows to work with common UNIX systems
- A shell connects the results of different programs, also known as **pipelines** and **redirections**
- `bash` contains tons of small useful tooling that can be connected together (`cat`, `paste`, `grep`. `sed`, `awk`)
- Moderns sheels are able to do arithmetics, conditionals, and looping constructs (they can be used as scripting languages). Writing a shell script is useful for tasks done more than once.

> A script can accept **Command Line Arguments** that influence its behaviour.

## Login vs non-login shells

For a login shell, bash reads and executes commands from `/etc/profile` and from `~/.bash.profile` or `~/.bash_login` or `~/.profile` if the previous one do not exist.

For a non-login shell, the bash reads and executes command from `~/.bashrc` unless the `--norc` option is given.

## Execution of a bash script

Generally, there are two ways to execute a bash script:

1. Doing `bash file.sh` or `sh file.sh`
2. Doing `./file.sh` (you need to make the script executable and put the shebang ``#!/bin/bash``)

`Bash` interprets the value of the variable `BASH_ENV` and reads and executes command from that file. Normally the variable is not set, so nothing is done **prior to the execution of the script.**
