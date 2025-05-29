# YamlTable

Utility to build a table using a yaml-based schema, and render it as html or markdown.

## Why?

Markdown tables are a pain to build, and not very flexible. There are existing utilities in VSCode and online that help to smoothen out this process, but I wanted to explore the possibility of using yaml to build these tables instead.

This utility compiles a defined yaml table into html or markdown, and can be used as a cli tool or as a library.

## Example

```yaml
yamltable: 1.0.0

columns:
  - column1: Column 1
  - column2: Column 2
  - column3: Column 3

row_1:
  column1: Cell A
  column2: Cell B
  column3: >
    <ul>
      <li> list item 1
      <li> list item 2
      <li> list item 3
    </ul>
```

Note the use of plain html in the `column3` field. Cells are rendered as plain html, which allows for more flexibility, including in rendering html based lists.

## Usage

### As a CLI tool

```bash
npx @yaml-table/yaml-table generate html -i path/to/table.yaml -o path/to/destination/table.html
npx @yaml-table/yaml-table generate md -i path/to/table.yaml -o path/to/destination/table.md
```

### As a library

```bash
npm install @yaml-table/yaml-table
```

or

```bash
pnpm install @yaml-table/yaml-table
```

In your code:

```typescript
import { yamlTableToHTML, yamlTableToMd } from '@yaml-table/yaml-table-core';

const yamlString = `
  yamltable: 1.0.0

  columns:
    - column1: Column 1
    - column2: Column 2
    - column3: Column 3

  row_1:
    column1: Cell A
    column2: Cell B
    column3: >
      <ul>
        <li> list item 1
        <li> list item 2
        <li> list item 3
      </ul>
`;

const htmlString = await yamlTableToHTML(yamlString);
console.log(htmlString);

const mdString = await yamlTableToMd(yamlString);
console.log(mdString);
```

## Setup and Installation

This library using [mise](https://github.com/jdx/mise) for version management, and [nx](https://nx.dev/) for build and test management.

```bash
# versions of node and pnpm used
node = "22.16.0"
pnpm = "10.11.0"
```

```bash
pnpm install
pnpm exec nx run yaml-table-core:test # run tests
pnpm exec nx run yaml-table:test # run tests
```