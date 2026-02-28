# Generative AI

## Definition and challenges

Generative AI creates new original content by learning over patterns in a huge, massive dataset (text, audio, video). It is expected to bring value over Traditional AI and Analytics.

> Databricks Data Intelligence Platform. The Mosaic AI is the "module" for GenAI in Databricks.

Some of the **challenges (or the main challenge)** is to go confidently into production: no control over model/data, bridge to production is hard and cost sacale in production

So the challenges wrap up in the following dimensions:

1. Control: over the data and the model
2. Production-quality: bridge it to a good reliable and quality state
3. Cost: lower the cost whenever it is scaled

## System characteristic and workflow difficulties

Just such another potential application we might develop, we have to consider the main characteristics to design a proper system: performance, security, maintenability, resilience...

In top of that, we can go more complex in the sense of GenAI:

1. Prompt engineering
2. RAG systems
3. Fine-tuning
4. Pre-training

These techniques are based on: volume of data, computational resources, latency requirements, specific domain. 

## General Construct workflow

Generally, you:

1. Prepare the data (notebooks, workflows, DLT). It communicates with Volumes, Tables, Vector Indexes, Features
2. Build the model (AutoML, Experiments, Marketplace). It communicates with Models and Functions
3. Serve data & AI: (model serving, function serving, feature serving, vector search). It communicates with log throung monitoring with drift data and profiling data. There are **built-in workflows for MLOps and LLMOps** to move data/models for development to production.

## Machine Learning Playgroud (Mosaic AI)

There is a playground that allows you to practice and play to design and build your whole systems.






