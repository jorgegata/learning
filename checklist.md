# Data Engineering / Data Science Workflow

Data is our pilar to solve problems and questions. We can create descritive, prescriptive, diagnostic, or predictive analysis with it to answer key business topics. However, data usually does not come in a structured way, either it's automatically processed for us.

This data is usually served to the final user, which makes this analysis, through a pipeline. The key features of a good pipeline are the following

* **Reproducible** -> meaning the pipeline is declared in code and its good practices for an amazing understanding.
* **Versioned** -> using a VCS as git and a platform (github, bitbucket...)
* **Documented** -> good `docs/` file using documenting principles. This contains the assumptions and design, it flags potential problems, track down filtering or modular steps, and create a final report document.

> Never forget that data tackles a **business problem**

## Business understanding & data collection

The problem needs to be defined, with a clear goal, scope, metrics, and constrains to the fields.

You need to understand the source of the data, and what does each field mean.

## Data Engineering Workflow

The steps to accomodate properly a dataset is basically:

1. **Enforce a schema** preselected from the source. It needs to declare the column names and its types. -> Validation here

2. **Data Quality Assessment and Preprocessing** means data exploration. This tries to understand what are the potential.

3. **Transformation:** transform strange value per column to an specific range (encoding cat variables, scaling/normalization, feature selection, handling class imbalance)

4. **Feature engineering:** compute extra columns that are needed for the business logic/analysis -> Validation here that your processed data meets the expectations.

## Data Quality Assessment and Preprocessing

This is not a trivial step, there is a lot to do here for the Data Quality Assessment (5 MAIN POINTS):

1. **Missing values** per column (NaN values per column)
2. **Uniqueness check** (how many duplicated columns are there)
3. **Corrections check** (standard format, parse, category fixing)
4. **Consistency checks** - cross-field validation (end_date > start_date)
5. **Integrity checks:** Foreign Key relationships, referential integrity (if relational database in place)

### 1. Handle missing values

* Identify patterns of missing (completely at random, at random, not at random)
* Check if missing correlates with other column

Then choose strategy:
* Delete row (<5% rows) or columms (50-70%)
* Impute: numerical (mean, median, mode, forward/backward fill, interpolation, KNN imputation, model-based) or categorical (mode, constant value, model-based)
* Flag: create indicator column like `is_missing_age` to preserve information
* Domain-specific - use business logic

### 2. Duplicate handling

* Exact duplicates: remove completely identical rows
* Partial duplicates:
    - same key but different values - investigate and resolve conflict
    - similar records - use fuzzy matching or decide keep/merge strat
* Temporal duplicated: keep most recent, aggregate, or keep all based on use case.

### 3. Data Type Corrections

* string cleaning: strip, fix casing, remove special characters
* numeric parsing: currency symbol, percentage, thousand separator...
* data/time parsing: stand formact, extract component
* boolean standardization: yes/no, true/false, 1/0
* category fixing: consolidate categories ("USA", "US", "United States")

### 4. Data Validation

Write down all the field contraints or cross-field logic assumptions that you can think about.

* Range checks: ages between 0-120, prices > 0
* Format checks: email pattern, phone number, postal code
* Logic checks: birth data < today, start_date < end_date
* Cardinality checks: categorical variables have expect number of categories
* Relationship check: child table references exist in parent table

### 5. Outlier Detection & Treatment

This can be done univariate, then bivariate, finishing multivariate. Always keep in mind the level of deepness, that will require domain knowledge for bivariate, or apply multivariate for final pass. Try to understand why the points can be outliers and document this.

* **Statistical**: Z-Score or IQR method
* **Visual:** box plot, scatter plot, histogram
* Model-based
* **Domain knowledge:** business logic rules

-> treatments:
* Keep if legitimate
* Remove if data errors
* Cap with threshold values (95th percentile)
* Transform: log transformation to reduce impact

Good steps to do so are:

* Statistical analysis
* Distribution (histogram visualization)
* Correlation