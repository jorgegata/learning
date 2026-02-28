# Variables

> The variables are used to store values and data, and usually those can change.

Variables are defined with `NAME=value`. This together with the execution of a process, it will pass it down.

- `export NAME=value` allow to pass that env variable to any process started from that shell, so any program will see that global variable. NOT PERMANENT (permanent requires a configuration in `.bashrc` or `.zshrc`)
- The command `set` is mainly used to change configurations of the shell.

- Variables are referenced prepending the '$' `echo $NAME`
- A list of currently set variables can be obtained by the command `set`
- Variables are not used by the shell, but by the programs. Shell only manages those 
- A few Bash variables are read-only and cannot be changed (e.g. `PPID`) but all others can be changed by the user. New variables can easily be introduced by simply defining them.

