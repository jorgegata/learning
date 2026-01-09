# Introduction to the application layer

As we know, computer science is the field that study how information is represented, transported, processed, automated, and stored inside the digital systems.

Most of the revenue in the industry comes from a specific layer inside the layer-based framework of computer science. This is the **application logic** and its user-facing with domain rules.

From this point of view, we will consider in this repository all the flaws from the application side.

## Computer Science Layers (involving electronics)

Considering the CS framework as layers, we have different from less to more abstracted.

Some of these layers has a different function, each with different protocols, representation...

1. **Application layer:** business logic, user-facing software, and rules written using high-level languages and frameworks.
2. **High-Level Language layer:** languages like Python, Java, or C++ provide abstractions like obejcts, functions, and memory management. Compiler/interpreter transform this into low-level code.
3. **Assembly Language Layer** - human-readable representation of machine instruction, specific to a processor architecture (x86, ARM), and assemblers convert this to machine code.
4. **Operating System Layer** - manage hardware resource, provide system calls, handle process scheduling, memory management, file systems, and device drivers.
5. **Microarchitecture Layer** - actual implementation of the ISA in hardware: pipelines, caches, branch predictors, execution units... different processors can implement the same ISA differently.
6. **Instruction Set Architecture (ISA) Layer** - this is the contract between software and hardware. It defines the set of instructions that a processor understands (e.g. ADD, LOAD, STORE).
7. **Logic Gate Layer** - boolean logic implemented with gates /(AND, OR, NOT, XOR). These combines to form adders, multiplexers, registers, and other functional units. 
8. **Transistor/Electrical Layer** - physical substrate. The transistors act as as switches and the on/off represent binary 1s and 0s. It considers voltage, current, and semiconductor properties.