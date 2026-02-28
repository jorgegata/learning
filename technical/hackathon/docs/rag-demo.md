# RAG Demo

> You can download your own demo in the environment called: LLM Chatbot With Retrieval Augmented Generation (RAG) and DBRX.

To get fluent in the writing of codes, pipelines, and training code, the most important thing to master is:

- Which libraries to use
- Core concepts (experiments, variables, logging, inference params...)
- Which main classes to use, methods, properties
- General platform-dependant commands and execution for a better workflow
- How to connect endpoints, scope, secrets, register, serve...

> The best way to understand that all of this has been properly created is to perform a hands-on tutorial! You can also see this as a tree-search, where you go rabbit hole in the concepts you do not understand until you make it and come back.

## Databricks Vector Search

Important to build the RAG Architecture. Usually the steps are:

1. Ingest the documents into Volumes and Tables
2. Process and chunk the information --> **context window** problem. There are different techniques to split data into different ways (i.e. h2 section).
3. Compute the chunk embedding and save them as a Delta Lake table

- You use **langchain** and the **LLM tokenizer** to create chunks from the documents
- Use embedded models with Databricks Foundation Models
- Create Vector Search Index on top of your data to provide real-time similarity search 

> A LLM Tokenizer is a practice to break down raw text into maneagable units called tokens (word, subword, character) converting them into numerical IDs. It acts as a translation layer between humanizable language and LLM numerical values. 

> Langchain is an orchestration framework that simplifies building applications with Large Language Models (LLMs). It provides tools and components to connect LLMs with various data sources.

### Embedding Model Calculation alternatives

There are multiple ways to use Vector Search (managed embeddings, self-managed embeddings, and direct index). (Remember that the model supports multiple ways to include models such as endpoint, custom model, hub...)

To make it work:

1. Vector search endpoint that access our compute (you can do it in the portal, but by code you ensure reproducibility and version control management).
2. Then, we can create a vector search index ( name of the vector search is kind of a table with name `*_vs_index` that allows to do vector search). **Triggered** or **Continuous** means that our vector search index can get automatically updated whenever it sees there is a change in the table.
3. How do we leverage Databricks Vector Search to do **similarity search** on that.

How do we leverage all of this to create a RAG Chatbot, which was the initial goal

## Deploy Model vs Deploy Code

What assests to move from `dev` to `prod`. You might deploy **CODE** or **MODELS** (or, of course, both).

| Prompt engineering and pipeline tuning | Deploy pipelines as "models" |
| Fine-tuning / training model | Deploy code or model, depending on the size |
| Both | Consider service architecture |

## Augmentation + Generation (RAG Chain)

Prerequisites:

- Retrieval component (testable that sends us relevant components)
- Bring-in the chatmodel: use LangChain (components) has support to ChatModels (ChatDatabricks) -> you can test right away with `predict`

To generate the augmented, you usually create a `TEMPLATE` that gives a piece of **Context** and a **Question**. You register that into a PromptTemplate. Therefore you have `from langchain.chains import RetrievalQA`, `from langchain.prompts import PromptTemplate`, and `langchain_community.chat_models import ChatDatabricks`

It can use different frameworks to provide the necessary steps to be orchestrated. MLFlow usually packages around some of the most famous, such as LangChain.

1. Retrieval using similarity search on the Databricks Vector Search
2. Inject the prompt and augment it.
3. Generate the response that is accurate and high-quality to the user

You define the chain (with `{"query": "how old I am?"}`) and you run the chain to print the answer.

## Register / Deploy the model to Unity Catalog

One cool thing we can do is that `mlflow` supports `langchain`. We can do an experiment with it and then register the model to the **Unity Catalog** right away (Models can be deployed multiple time with versioning!!).

## Serve the model from Unity Catalog

Once it is registered in the Unity Catalog, a way to server it directly to the application is to configure the Endpoint and use it in our application right away. We can do a query with the serving endpoint directly to the input. **The backend can be considered as done and ready to go!!**

## Online Evaluation (Testing in production)

Offline evaluation is done in `dev` to filter out underperforming models, while online evaluation tests out how it does perform in `prod`.

There are multiple techniques:

1. LLM Judge: help scales human evaluation by using an LLM to evaluate RAG outputs for quality

The LLM Judge is easy to run with only one line of code.

Usually when offline evaluation, you have the `inputs`, the `ground_truth` and you hit the ``mlflow.evaluate()`` function with ``model``, ``data``, ``targets``, ``model_type``, ``evaluators``

In the online evaluation, using LLM Judge, you give an `EvaluationExample()` considered in `from mlflow.metrics.genai import EvaluationExample, answer_similarity`. The attributes for this is: `input`, `output`, `score`, `justification`, `grading_context`

With the `answer_similarity` you provide a model and example(s), and you pass it to the `mlflow.evaluate()` as an **answer_similarity_metric!!!**

You have more metrics apart from **similarity_metric**, you can even do your own metrics!:

1. ``from mlflow.metrics.genai import EvaluationExample, make_genai_metric``
2. make_genai_metric() -> name, definition, grading_prompt, examples, version, model, parameters, grading_context_columns...