# CLI fundamentals

The command line interface is a meaning of interacting with software using commands to perform actions such as navigating files and folders, manage system resources, or automating processes. 

> To access documentation of a specific command, do `man <command>` for further info on functionality, syntax, option, and usage. 

## Navigation

Use to navigate directories and filesystems

- cd: changes to a specific path. (`cd -` changes to previous working directory, )
- pwd: prints the current working directory
- ls: list the files and directories of the current working directorie
- tree: display the conent in a tree-like format, provigind clear representation of the file system structure (`-a`, )

## File Ops

- cp: copy files or diretories
- mv: move or rename files or directories
- rm: removes a file or directories recursive (`-f`, `-rf`)
- mkdir: creates a directory
- touch: create new, empty files or update the modification timestamps without altering the content (`-a` to modify only access time, `-m` modification time, or set timestamps to specific date and time using `-d` or `-t`)
- cat: concatenate and display the contents of files (read and output the content of one or more files to the standard output, allows creation with redirect `cat >` or appending `cat >>`)
- less: content of a file one screen at a time (`space` to go, `b` to go back, `q` to quit, -N to display number of lines, -n to surpress them)
- head: show the first lines of a file
- tail: show the last lines of a file

## Search

- find: walk a file hierarchy and look for files and directories based on various criteria such as name, type, size, modification type, permission, ownership... (`-name` for file names, `-type` for file types (f for files, d for directories), `-size` for file size, and `-mtime` for modification time. You can use multiple criteria using operators like `-and`, `-or`, `-not` and execute actions on the results like `-delect` or `-exec`)
- grep: text-searching utility that searches for specific patterns in files or input streams. **It scan input files, standard input, or the output of other commands to find lines that match a given pattern**, which can be a simple string or a regular expression.
- locate: **quick find of files and directories** looking up in a prebuilt database of filepaths instead of scanning the actual filesystem in real time
- which: locate the executable file associated with a given command by searching through the directories listed in the user's `PATH` environment
- whereis: it locates binary, source code, and manual page files of a specific command (`whereis cd`)

## Permissions

- chmod: change file mode bits of the listed files as specified by the **mode** operand 
- chown: change file owner and/or group (user id and/or the group ID of the specified files)
- chgrp: change the group ownership of files and directories

## System Info

- uname: writes name of the operating system implementation to standard output
- df: display free disk space on the specific mounted filesystem or on the the file system of which file is a part
- du: display disk usage statistics for each file argument and each directory in the file hierarchy rooted in each directory argument. If no file is specific, the block usage of the hiearchy rooted in the current directory is displayed
- free: displays the amount of free and used physical memory and swap space on a system, along with information about buffers and cache used by the kernel
- top: provides a dynamic, real-time view of running processes and system resource utilization, including `CPU` and `memory usage`

## EXERCISES

```bash
mkdir -p ~/projects/learning/{scripts,notes}
touch ~/projects/learning/README.md
echo "# My Learning Journey" > test.md # echo to put in stdout the information

find /etc -name "*.conf" 2>/dev/null | head -20
grep -r "root" /etc/passwd
```