# Processing Stream Channels

> Fundamentally, there are three processing streams channel in Linux: `stdin`, `stdout`, `stderr` with file descriptor 0, 1, 2 respectively.

- **stdout:** standard output, default file descriptor where a **Process** writes its normal output data

- **stdin:** standard input, preconnected input communication channel between a computer program (process) and its environment when it begins execution

- **stderr:** default output stream used by a computer to send error messages and diagnostic information. Separated from standard output allowing errors to be distinguished from regular data.

- **pipes:** fundamental inter-process communciation mechanism that allows the `stdout` of one process/program to be passed as `stdin` to another process/program

- **redirection**: allows to enter differently than the keyboard (`<`) or output the data into a different place (`>`). 

---

## Examples

### Redirection 

> `2 > /dev/null` is used to discard error messages and avoid them to appear in the terminal. If you read `/dev/null` it will return an EOF condition.

**A special case is combination of streams**: where the last one is the potential good stream to take in the information.

The `2>&1` means that the `stderr` file is redirected and combined to the `stdout` into a single stream. The & is to identify that 1 is a file descriptor in the context of redirectors.

``command > output.txt 2>&1`` in this case, stdout is pointing to output, and stderr is merged to one, and pointing wherever 1 is currently pointing.

---

## Exercises

```bash
cat /etc/passwd | cut -d 
```