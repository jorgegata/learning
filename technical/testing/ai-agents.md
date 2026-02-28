> The ai-agents can be categorized into: understanding; reasoning; decision-making; actionability.

## AI Agent definition

AI-agents are autonomous agents that allow for the 4 human characteristics in a **Goal-Orientation** autonomy for a non-deterministic goal:

- Understanding (perception + context): not only able to know the language, but able to ingest multimodal data to build a "world model"
- Reasoning: to descompose a high-level goal into a sequence of sub-tasks (e.g. using Chain-of-Thought)
- Decision-making (memory): true human-like decision-making requires *past* experience, needing short-term (context) and long-term (vector DB) memory with it. 
- Actionability (tool use): this is the "agency" itself, so the ability to call a function, write code, or hit an API to change the state of the outside world. 

## Real-world jobs and actions of the human characteristics.

1. Script - deterministic: usually repetitive tasks that is end-goal oriented without any further steps or branches. It's bounded on specific input/output where you can define them in a control loop.
   
2. Workflow - structured (it stops in understanding): you may integrate LLM for understaning purposes and start a step called A that will always lead to a step B (or an alternative branch). You want here the reliability of a fixed path, you dont want an agent deciding on what to do (predictable pipeline for **compliance and auditing,** which is super important).

3. RAG (Knowledge-Grounding Reasoning): The goal is to answer questions based on. aprivate, massive, or frequently changing dataset. It is about **context** and not **action**. An LLM alone will hallucinate, and an Agent is overkill, so it provides exact snippets from the contracts to ensure the answer is grounded in the source text.
   
4. AI Agent: Autonomous problem solving

The path to the goal is unknown from the start. It uses what is so called 'tools' (scripts, RAGs, or APIs) and decide on the ai-agent workflow:

1. Decide which tool to use based on: memory, context, llm
2. Evaluate the result
3. Feedback loop until the end goal is met

Example: goal is to find the top 5 prices in our SaaS competittos and create a comparison table in excel
Why an agent? it must browse the web (unpredictable), identify relevant pages, extract data, decide if data is sufficient, then interact with a file-writing tool... it rquise a "loop" of reasoning that a fixed workflow cannot handle. 

It includes the 4 characteristics of humans: understand, reason, decision-making, action.

The rule of thumb is:

1. Start with a script
2. If it needs to understand something, go into a workflow
3. If it needs data from a pool of sources, go into RAG
4. If it needs to "think" about next, then go to an **Agent**

## Core components

The user interact with an agent that orchestrate four main components: foundational model, memory, tool, state management

### Foundational model

This is the "brain" responsible of the understanding, reasoning, and other options based on memory (short-term on context window, or long-term on vector DB), and context-based

> The main tradeoffs of the selection of a foundational model is: performance, scalability, latency, and cost.

> The **secondary** tradeoff of the selection of a model is open-source and pretrained/custom-training necesities (privacy settings, custom business-domain cases, customization...)

Usually the open models (architecture + weights) are publicly available to be deployed in your private infrastructure without any license costing fee. These models usually run on VRAM whenever you want to physically set it up for research purporses (sever-grade GPUs like A100)

### Tools

Unit logic block that allows an agent to interact with both users and other systems. It is seen as **action** or change of state/behaviour.

The design of tools requires different conditions and context. Out of this, it comes the toolset to do variaety of tasks with precision and efficiency. Tools can be divided into:

- Local tool: rule-based or internal functions (mathematical calculation, data retrieval from local databased, or decisions based on local criteria)
- API-based tool: interact with external service or data source. It can fetch real-time data or leveraging third-party systems. (i.e. virtual assistant that pulls weather data from an API, stock prices, or social media updates)
- Model Context Protocol (MCP): enables agent to be structured and standarized context (with a defined schema). It passes external knowledge, memory, and state into the model's prompt. Unlike API that requires full round-trip execution, it enables to inkect rich, dynamic context (user profiles, conversation hisotry, world state) directly into the model's reasoning process without invoking separate tools. **inject real-time awareness in the foundational model through standard schema interfaces**

> Integration of tool should be modular, as a self-contained module that can be integrated or replaced as needed. It allows developer to update or extend the agent's functionality without overhauling the entire system

### Memory

Foundamental to operate efficiently in dynamic environments and adapt to new situations based on historical data. 

- Short-term memory: remembers the actions on the session, enabling the agent to make coherent decisions in real-time. It is imposed as *rolling context window* where there is always a buffer of context that is introduced and deleted
- Long-term memory: this is to be more accurate on next actions based on past actions. It is often implemented using databases, knowledge graphs, or fine-tuned models

Store and management must consider nice retrieval of information and it must differentiate between relevant and irrelevant data.

### Orchestration

The orchestration is what turns isolated capabilities into a end-to-end solution. It is the logic that **compose**, **schedule**, and **supervise** a series of skills so that each action flow flows into the next and works toward a clear objective.

The orchestrator must monitor both **progress** and **environment**, pausing or rerouting workflows as needed to stay on course. It builds plan incrementally, so they execute a handful of steps, reassess, and update the remanining workflow based on fresh results. 


## Main trade-offs

### Performance: speed/accuracy

- In real-time, speed is critical so rapid decision making is essential, with milliseconds sometime making a critical difference. Some other tasks, such as legal or medical business, the accuracy is a must so we can make acceptable to sacrifica some speed to ensure reliable results

### Scalability vs engineering-hours+latency

When models grow, the main concern is how to handle the hardware underneath to support all the tools. The GPUs are the backbone for accelerating the training and inference of large AI models.

Scaling requires carful engineering to avoid bottlenecks, underutilization, and rising operational costs.

The most important thing is dynamic of resources, meaning that we can scale up or scale down GPUs to meet our real-time demands (elastic demand)

Another layer of efficiency is the prioritization queueing and intelligent task scheduling.

Latency is important as well in real-time or near-real-time environments, so scheduling GPU tasks efficiently across distributed systems can reduce latency and ensure that agents work well under heavy loads. 

strategies: load-balancing between multiple CPUs/GPUs, asynchronous task execution, scaling/reducing hardware...

For agent systems, there is what is called **burst scaling**, which combines on-premise hardware and cloud-hardware, so in demand peaks it redirects the load to cloud computing resources and released once it is finihshed (cost-efficiency)

### Reliability vs development-time+complexity

> This consists in the ability to perform the tasks consistently and accurately over time.

The more reliable a system is, the more time is consumed in dev time, cost, and complexity of the overall system.

The **fault tolerance** is key, where errors are detected and recovered gracefully

To be reliable, it must be tested through different scenarios, inputs, and environments (very important in safety-critical systems)

To achieve reliability:

- Extensive testing with various scenarios (inputs, outputs, states), covering edge cases, unexpected inputs, and adversarial conditions to ensure can handle all environments
- Monitoring and feedback loops: require continuous monitoring to detect anomalies and adjust their behaviour in response to changing conditions. Learn from environment and improve performance over time

### Cost: balancing performance and expense

The cost associated with the **SDLC** of an AI agent must be weighed against the expected benefits and return on investment (ROI). The functional and non-functional characteristics of this system affect decisios related to model complexity, infrastructure, and scalability. 

#### Development cost

A complex agent-system requires specialized expertise, large datasets, and computational resources for training.

The team should be composed of specialized talent including data scientist, ML engineers, and domain experts to create high-performing systems.

Based on realiability, it requires extensive testing infrastructure often involving simulation environments and investments in testing tools.

#### Operational cost

After deployment, these cost can be substantial particularly for systems requiring high computational power. 

Sometimes, the data involved is also a high payment for data storage and bandwidth. Regular maintenance and updates, including bug fixes and system improvements to ensure reliability and performance over time. 

#### Cost vs value

> The cost of something must be justified always with the value it delivers.

It makes sense to go for cheapear agents on less critical tasks, and invest heavily in more sophisticated agents for mission-critical applications. Decision around cost must be made in the context of the system's overall goals and expected lifespan

The optimization strategies usually include:

- Lean models: more efficient models (with dynamic routing on the use case) to be more cost-effective
- Cloud-based resources: it allows for a pay-as-you-go model
- Open source models and tools: ML libraries and frameworks can reduce upfront infrastructure cost and deliver high-quality agents.

