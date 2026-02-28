# IaC + CI/CD + GitHub Actions

The infrastructure is defined as code to ensure version control, minimizing error exposure and increasing maintainability. Moreover, security and data quality can be increased through approval gates.

Also, pipelines can be created to automatically deploy code whenever there is a merge in a branch (dev, test, prod). Direct changes to `test` or `prod` outside of the pipeline process are not permitted. 

The deployment reset the environment to help ensure consistency and avoiding configuration drifts.



