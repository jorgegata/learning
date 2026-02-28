# Versioning

Versionining usually follows [semantics](https://semver.org/) (X.Y.Z)

As a rule of thumb:

- The X means breaking changes that needs to be communicated in the `CHANGELOG.md` file in the repo.
- The Y means any feature or non-essential changes (branches dev/feature merged)
- The Z means any critical bugfixes

## Changelog Strategy

Prerequisites: ``npm install -g conventional-changelog-cli``

> NOTE: the changelog flow leverages the commit messages to create a proper changelog. Below you can find the common commit messages.

| Message element | Description |
| feat | functions, classes... |
| fix | critical fix |
| docs | documentation |
| refactor | reorganization of code without adding logical changes |
| test | testing files created |
| style | change in whitespace and so on... |
| ci | usually changes in yaml files |
| chore | usually when there is no other fit

To generate a `CHANGELOG.md`, run: 

> contentional-changelog -p angular -i CHANGELOG.md -s

## Testing Strategy

The testing strategy considers two types of test:

1. **Unit tests:** usually perform per function, trying to check if given input gives desired outputs --> ``unittest, pytest...``
2. **System testing:** usually test the system as a whole. For example: navigating a browser interface, a specific prompt generates a specific answer and shows up specific files --> ``playwright``

