# YamlTabl

## Setup and Installation

This library using [mise](https://github.com/jdx/mise) for version management, and [nx](https://nx.dev/) for build and test management.

```bash
# versions of node and pnpm used
node = "22.16.0"
pnpm = "10.11.0"
```

```bash
pnpm install
pnpm exec nx run yamltabl-core:test # run tests
pnpm exec nx run yamltabl-npm-package:test # run tests
```