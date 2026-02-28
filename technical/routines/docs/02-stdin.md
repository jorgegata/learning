# Process communication

Each process itself does not share memory, so data must be temporarily or permanently stored somewhere else in the disk.

If we want to make a program with different branches, each with a purpose, but running simultaneously, we have three options:

1. Threads (memory, share process, dependent on both processes to run)
2. pipe (stdin as channel, intermidiate, dependent on both processes to run) - communication channel on a terminal machine
3. infrastructure like redis (fast access data, totally decoupled) - communication channel on network, machine, ports...

## Thread

Sometimes you want to live within the same process to share memory, as it is a quick-access way to do transformations. You might store something in a queue, that will dispense bits of information at a time upon request in a multithread program (you only have to pass the queue as an argument, but actually lives in the same memory block). 

Super cool for embedded systems as this could be ultrafast

1. Start (you prepare it but not initialize)
2. Initialize: you go and start them
3. Join: without it, the initial program could finish before threads. You first let the threads finish and then finish the program.

In our `sensor.py` and `warning.py` example, the join would wait undefinitely as it will be waiting forever. You would need to kill manually with `Ctrl+C`. It is there for the structure rather than for the utility. 

## Pipe

It is good but the `stdin` communication channel can be slower. All is included in an embedded systems but slow as you have to transfer this by text to the stdin and be read from there. Elegant solution as well without complex coding upfront. 

## Infrastructure

Communication layer between process, both even living in the same machine, or different machines...

This is supercool if the communication channel might be using network, machines (ip), and ports... totally decouple infrastructure here. 

