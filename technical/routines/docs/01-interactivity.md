# Interactivity on the application-layer

Everything realted to user-facing software we are going to call an application. Even a server is a process, with under the hood is an application written in a specific language.

The applications fundamentally can be done in five different ways: 

- **Non-Interactive (one-shot):** it does not contain a loop, so it will be executed by a cron, event, or manual, it will process input data (args), do the workflow, and finish.
- **Interactive (REPL)**: it comes within a loop usually known as REPL (Read-Eval-Print-Loop)
- **Daemon/Service**: it executes in the background but does not have any interactivity
- **Watch/Event**: it executes in the background as a loop and react to certain events ocurring 
- **Pipeline**: it evaluates and process data in a continuous format, where stdin goes to stdout (in bash, it is a `|`)

The two dimensions of analysis is if they have a loop, and if they are interactive by nature.v Let's use Python to understand the five type of applications here.

## 1. Non-interactive implementation (One-Shot)

The most common. Only one executions, with one task.

1. You need a parser (in the main function) - argparser
2. You need to define arguments in the parser
3. You need to parse the args through the parsers, stored as a dictionary

```python
import argparse

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--name")
    args = parser.parse_args()
    print(f"Hello, your name is {args.name}")
    sys.exit(0)

if __name__ == "__main__":
    main()
``` 

Some examples in linux (written in C most of them) are: `grep`, `ls`, `curl`...

## 2. Interactive (REPL - Read, Eval, Print, Loop)

It allows to enter code, have it evaluated immediately, and see the results displayed right away. It involves four steps:

1. Reading user input
2. Evaluate the code
3. Print the output
4. Looping back to accept new input

```python
def main():
    while True:
        command = input("- ")
        if command == "exit": break
        resultado = procesar(command)
        print(resultado)
        # loop again...
```

```toml
[projects.scripts]
mi-cli = "mi_paquete.cli:main"
```

## 3. Daemon / Service

It executes in the background without an end, and without a direct interaction. This could be the example of a webserver like `nginx`, `next.js`...

```python
def main():
    while True:
        conexion = esperar_conexion()
        procesar(conexion)
```

## 4. Watch / Reactive

It keeps running, reacting to external events

```python
def main():
    while True: 
        if archivo_cambio(): recompilar()
        sleep(1)
```

## 5. Pipeline / Streaming

Procesa flujo continuo de datos (stdin TO stdout). The difference with the one-shot is that one-shot loads everything in memory and is processed. The other one can be seen as a continous process of elements one-by-one until it is finished.

This would be an example of a one at a time continous sequence.

```bash
cat archivo.txt | grep "error" | wc -l
```

This can be a combination of watch and pipeline loading.

```bash
tail -f logs.txt | grep "error"
```

In python, we can do this in this way:

```python
def main():
    for linea in sys.stdin:
        if filtro(linea):
            print(transformar(linea))
```

## Entry point

**Entry point** is a function the OS called when we execute the program. In Python it is defined at the `pyproject.toml` file or at the `setup.py` file.

When you write mi-cli in the terminal, the OS will:

* Search it in the `PATH`
* Execute it calling `main()`
* Wait until it is exited
* Receive the exit code

**The complexity comes on how many executables do you expose, and how many processes you generate**

You can have multiple programs (exposed through multiples entry point), but each executable have only one entry point (multiple file but one `main` entry point).