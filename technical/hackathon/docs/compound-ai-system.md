# Build compound AI system and RAG

## What is a compound AI system

**Advanced architectures** that tackle complex tasks by orchestrating multiple interacting components (specialized models, retrievers, extrenal tools) rather than a monolithic AI model. This improves accuracy, efficiency, and flexibility.

> It tries to leverage a multipart system to get better performance/results, increasing a little bit the architecture complexity.

Claude Code can be seen as this **Compound AI System**. The good characteristics of this:

- Accuracy: based ground truth and comparison based on context.
- Dynamicity: retrieve latest data via RAG.
- Verifiability: provide citations to claim.
- Safety: post-process response.

Challenges:
- How we optimize and end-to-end system?
- How can we evaluate each step?

---

## What is Retrieval Augmented Generation or RAG

It starts with: Query -> Retrieval of data -> Augmented Prompt -> Generate Response

> Creating a RAG system is hard, as is difficult to measure, to collect enough feedback, improve accuracy/reduce hallucination, and enforce guardrails in the bot.

The advantage is you can bring up-to-date data, the data is domain-specific, you reduce the risk of hallucination and improve data quality.

> The LLMs models are not used here as generative per se, but reasoning models.

You can select:

- Embedding Model
- Inference Model (Instruction Following)
- RAG Chain Framework
- Automatic Ingestion / Unity Catalog Governance

---

## Architecture of a RAG system

In the Completion, ChatCompletion, or Embedding Model, the only artifact to be server in majority was the LLM Model... here, we do serve two actual things:

- Data Serving (Vector Search):
    1. Ingest data and put it in tables/volumes
    2. Prepare docs (cleanse/chunk)
    3. Automatically sync creating ETL Pipeline from Delta Live Tables
    4. Serve Data with Vector Search


- Model Serving (Model Endpoint)
    1. Embedding model (GPU) from: unity catalog, marketplace, hugging face
    2. Instruction Follow Model from: unity catalog, marketplace, hugging face

So the user make a query to the Web Application, it will Query a RAG Model (search for content, construct prompt with templates and related docs, send prompt to LLM to generate response...) - Retrieval, Augment, Generate.

Of course, both models can be considered as monitored from the very beginning.

---

## Build a RAG Chatbot with Databricks

## Data preparation with Databricks Vector Seach

## Deploy RAG with databricks model serving

## Online evaluations with MLFlow LLM as judge