# GitHub Conventions

## Branch

> There are three main branches: ``main``, `test`, `dev`.

The new features are developed in a branch inside `dev/new-feature`. Each of these branches deploys in their specific environment.

## Commit

> Never modify git history whenever it is pushed in remote repo

The commit strategy should focus on one logical change at a time, maintaining these commits atomic. The main straty is ``merge branch`` when we do a PR, and rebase to introduce the merge into a single commit is allowed.

If the push has already been made, please, do not rebase in the git history. 

## Pull Request

A PR is created when the feature **has been tested and it works.** This is crucial, and a Sika employee must be assigned as a PR reviewer.

## Secrets

> Secrets are never written in text files. Either use GitHub Secrets or [Sika Secret Server Cloud](https://sika.secretservercloud.eu/)
