# Prompt Engineering

> Art and Science to design, refine, and optimize input queries to guide AI models, in particular Large Language Models (LLMs), to generate accurate and relevant outputs. It involves 3 main point: precise instruction, provide context, and setting constraints.

## Application Architecture

Client browser <-- response -- Template, Instruction, Example -- query --> Web Application <-- Custom Model (Hugging face, unity catalog, marketplace), Foundational Model, External Model --> Log & Analytics Model and Web App

## Lakehouse entrance (Notebooks, application)

> The notebooks allow us to write logic, as it is the entrance of the Lakehouse

1. We can write Python, SQL, Scala in the same.
2. Real-time collaboration.
3. Jupyter-compatible (use power of Jupyter ecosystem).
4. Ideal for exploration.
5. Install libraries and use local modules, as well we can track version with git.
6. We can use notebooks as scripts (**jobs**) or create dashboards from their results.
7. Enterprise-grade: access control, identity management, auditability

## Models Endpoint

We can have multiple models (custom, foundational, external) right directly from the serving endpoint (e.g. ChatCompletion, Completion Models, Embedded Models).

```python
from databricks_genai_inference import Completion

text_response = Completion.create(prompt=, model=, max_token=)...
```

- **Completion** --> can be seen as a text predictor. It naturally tries to fit the best words coming from those in the beginning, not necessarily aware of the conversation (code completion, text classification, single-turn tasks)
- **ChatCompletion** --> models fine-tuned to understand the context of a conversation. The input is structured as a list of messages so it distringuis between different roles and understand context, history, and instructions. 
- **Embedding model** --> this translates text or different data structured into numbers, to computers can "understand" the meaning and relationship between words. It output a vector of number that represent the semantic meaning of that text in a multi-dimensional space. (search engines to find relevant documents for a query, recommendation systems, RAG architectures where you search your own data to give context to a Chat model). 

## MLFlow: offline and online evaluations

> Experiment is something I am trying to play around (in the dimensions). Each experiment is a run (change of parameters). Evaluations happen within an experiment, where we log parameters and run an instance of an inference to register differences between runs.

```python
!pip install mlflow
dbutils.utils.restartPython()
```

Experiments can be on everything that is interchangeable in your architecture, so it's one variable and we can change that. With **MLFlow** we have `inputs`, `ground_truth`, `models`. 

1. Preparation of data (either generated or coming from a DLT)
2. Setup of parameters of models (`name`, `max_tokens`, `temperature`)

> Note: good params is the ``token_count()`` and `latency()` to analyze model params

- Evaluate on different inference parameters, model_type (or type of task), and extra metrics.

```python
with mlflow.start_run() as run:
    mlflow.log_params({
        "model": model
        "max_tokens": max_tokens,
        "temperature": temperature,
    })

    results = mlflow.evalute(
        model=f"endpoint:/{model}",
        data=eval_data,
        targets="ground_truth",
        inference_params = {
            "max_tokens": max_tokens
            "temperature": temperature
        },
        model_type="question-answering",
        extra_metrics=[mlflow.metrics.token_count(), mlflow.metrics.latency()]
    )
```

- **You have an experiment side bar that allows you to see what is going on!!**
- You can go and check one specific artifact of one specific experiment.