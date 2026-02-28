# Common commands in Unix

The magic of the bash commands resides in:

- *Piping*: the output of one command goes into the input of the subsequent (ls -l | less, pip the output of ls -l into less)
- *Redirection*: > redirects output to a file, and >> concatenate it

> It does not matter if multiple flags are written like -al or -la

## FIND: How can I find files in a directory with a specific name?

> This comes with the command `find` and there are some useful flags

```bash
find . -type f -name ':Zone.Identifier' -delete
```

- -type is the type of the resource we are looking
- -name specific a concrete name or a pattern
- -delete removes all coincides, like concatenating a `rm` command~

### Different types

f - regular file
d - directory
l - symbolic link (shortcut)
c - chareacter device
b - block device (USB, hardrives...)
p - channel named pipe (interprocess communication)
s - socket (file for inter-process network)

### Different flags

-delete -> delete the file
-name -> name of the file
-type -> type of file
-mtime (-1) -> modified in the last day

## File and Directory navigation

## LS: what are the directory content (NAVIAGATION)

- ls: prints normal
- ls -a: prints all
- ls -al: print formatted style

## CD: how can I change directory (NAVIGATION)

- cd <path>
- cd: changes to home

## PWD: on which working directory am I (NAVIGATION)

Just show current directory

## MKDIR: make a directory (FILESYSTEM)

mkdir <name>: create a directory with a specific name

## RM: remove file or directory (FILESYSTEM)

rm <filename>: remove a specific file
rm -r dir: remove directory with files
rm -f file: force remove a file
rm -rf dir: force recursive directory 

## CP: copy files or directories (FILESYSTEM)

cp <file1> <file2> - copy file1 to file2
cp -r <dir1> <dir2> - copy directory 1 to directory 2

## MV: move or rename directories (FILESYSTEM)

mv file1 file2 - rename or move if file2 is an existing directory...

## ln

linking (symbolic shortcul) from

- ls -s <file> <link>: create the shortcut

## TOUCH/NANO/VIM: create an empty file or update a file's timestamp

touch - create or update a file
cat > file: places standar input into a file
more file - output the content of a file 

## Viewing and editing files

### cat

concatenates and print files to standard output to quickly view small files

### more/less

view file content one screen at a time and allows scrolling

### head

output the beginning of a file, with the flag -n you can see the number of lines

### tail

output the tall of lines, similar as head but for the end

### nano/vim/emacs

complete editor to modify files 

## Searching, filtering, data processing

### grep

search for text pattern inside files

### find

search for files and directories based on various criteria

### tar

archive and compress files

### sort

sort lines of text files

### wc

word, character, and line count

## System and process management

### ps

report a snapshot of the current running processes (`ps aux` view all processes)

### top / htop

view processes in real time 

### kill

Send a signal to a processs (usually to kill it )

### man

display the manual pages for commands

### history

view the command history

## Permissions

### chmod

change file mode to make a script executable

### chown

change file owner

### sudo

executre a command as the superuser

 
