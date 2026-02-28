# Python signals

Signal is a library that detects various event from I/O devices and perform specific things in the code.

This is pretty important in some use cases as it might be a difference of "repentine dead" or "clean close". If you are in the middle of some reading/writing files, connections... it might be that the data is corrupted if you do not do it properly.

## Example

```python
import signal

detener = False # module variable that we need to define as global if we want to modify inside a call stack

def on_ctrl_c(sig, frame): # params that are necessary for signal handlers need to have, so sig is the num of signal, and frame is the state of the program when the signal arrived there.
    global detener
    detener = True

signal.signal(signal.SIGINT, on_ctrl_c)
```