> The ai-agents can be categorized into: understanding; reasoning; decision-making; actionability.

## AI Agent definition

AI-agents are autonomous agents that allow for the 4 human characteristics: understanind, reasoning, decision-making, actionability.

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

