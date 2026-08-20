# YamlTabl

[![npm version](https://img.shields.io/npm/v/yamltabl)](https://www.npmjs.com/package/yamltabl)
[![Visual Studio Marketplace](https://img.shields.io/badge/vs%20marketplace-v2.0.1-blue)](https://marketplace.visualstudio.com/items?itemName=joeltok.yamltabl-extension)
[![Open VSX](https://img.shields.io/open-vsx/v/joeltok/yamltabl-extension.svg)](https://open-vsx.org/vscode/item?itemName=joeltok.yamltabl-extension)


Yamltabl lets you define tables in YAML using a human-readable schema.

Perfect for everything-as-code documentation and static sites — without the messiness of raw Markdown, HTML, or embeddable spreadsheet tables.


## Usage

Install the `yamltabl` extension in Visual Studio Code or VSCodium. In any markdown file, add the following delimited code block. It will render as a Markdown table. 

````
```yamltabl
yamltabl: 2.0.0

columns:
  - haiku: Haiku Title
  - line1: Line 1
  - line2: Line 2
  - line3: Line 3

row1:
  haiku: “The Old Pond” by Matsuo Bashō
  line1: An old silent pond
  line2: A frog jumps into the pond —
  line3: Splash! Silence again.

row2:
  haiku: “A World of Dew” by Kobayashi Issa
  line1: A world of dew,
  line2: And within every dewdrop
  line3: A world of struggle.
```
````

## For Contributors: Setup and Installation

This library uses [mise](https://github.com/jdx/mise) for version management, and [nx](https://nx.dev/) for build and test management.

```bash
# versions of node and pnpm used
node = "22.16.0"
pnpm = "10.11.0"
```

```bash
pnpm install

# test suites
pnpm exec nx run yamltabl-core:test
pnpm exec nx run yamltabl-npm-package:test
pnpm exec nx run yamltabl-vscode-extension:test

# vscode extension
pnpm exec nx run yamltabl-vscode-extension:dev
```
