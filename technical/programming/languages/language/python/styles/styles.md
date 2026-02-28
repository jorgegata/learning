# Styles

## Module Headers

To quickly understand what each module does, it is best practice to include a module-level docstrings

```python
"""
This is the beginning of the module.
No more than 50 lines of code please.

+ What problem does it solve/what does it do?
+ Maybe mention main functions/classes
"""
```

## Data Science / Data Analyst repository structure

This differ as there are not so many high-level repository files or configuraiton for the packages.

It applies different libraries and perform different actions, thinking it as 'pipelines'

Typical example would be:

```text

project
	data/
		bronze
		silver
		gold
	notebooks/ -> experiments
		01-notebook.ipynb
	src/ -> when experiments turn into real code
		data.py -> loading and preprocessing
		feature.py -> feature engineering
		model.py -> training inferenece
		viz.py -> plotting
	scripts/
		one-off automation
	models/
		model1.pkl
	requirements.txt
	README.md
```

+ Never add extra complexity on something, this is not a corporate nonsense.
+ There is no need for testing in most of the cases, you are not a SWE.
+ No docker-compose for a logistic regression (funny example)

## Points

1. Notebooks are like scratch paper, always number them
2. Flat is better than nested
3. Do not commit folders, but .gitkeep them
4. Scripts do one thing
5. README.md explains how to reproduce. short

The test is: can you clone the repo and reproduce in less than 5 minutes? If not, then simplify.

