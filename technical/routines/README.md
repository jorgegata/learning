# Routines

In programming, we write and execute actions or procedures to modify input data to obtain some kind of output data (functional programming), obtaining output data at the same time we modify state (generally oop programming) or even just modifying state without outputting anything.

In all cases, we always involve data modification (registry, assignment, garbage collector and some other concepts might be helpful in this endevour).

But in this case, the input data might come through different sources, and the way to process this could be, using my words:

* Listening - program or scripts with any kind of a loop.
* Once execution - workflows (scripts executed once maybe).

Most of the spinned up servers (so processes) are loops, and the execution itself of this code in the interpreter or the runtime framework could be an asynchronous loop, synchronous loop... so we can increment complexity here

## Goal

The goal of this repository is to understand some of the concepts behind the procedures you write in top of the programming languages (to the highest layer in the program execution). Architecturally speaking, this is the application-layer.

## Exercise

Write two parallel processes:

1. It reads (like from a sensor) a random data, print it in the stdout, and wait one second until it is generated again
2. It reads the generated data and print a warning based on its threshold value

There are multiple ways to implement this:
1. Using threads and a queue within an entry point (multi-processing)
2. Using a pipeline with a single entry point
3. Using overhead, scalable infrastructure

## Interesting things

- In the pipe, while the first process is not killed, **the pipeline keeps alive**. 
- In `for line in sys.stdin`, the process is waiting until a line is received (so it is not executed let's say)
- For efficiency, Python do not sent all prints right away to the stdout. It put it in a box and they all are sent when the buffer is full or the program is executed. Without flush, it could be that `warning.py` is waiting and `data.py` has already generated data...
- Each terminal has its own stdin/stoud isolated
- Pipes (`|`) connect the stdout of one process with the stdin of another process. Each process has independent CPU-time reserved.
- You can have intermediaries (other services, other kind of infrastructure) with multiple processes one publishing and the other listening all the time... It could be in different terminals, in different machines, communicating independently.

## Levels of stdin

stdin can come from

- keyboard: `python warning.py` (endless)
- stdout of another process: `python sensor.py | python warning.py` (endless)
- a file `python warning.py < datos.txt` (with an end)
- Diferencia entre **variables de entorno** y **argumentos**. Ambas se declaran distinto y tienen que ver segun el entorno de ejecucion o parámetros de ejecucion.
- Whenever you modify a variable from another module, you are modifying an attribute of the module object, not a local variable.