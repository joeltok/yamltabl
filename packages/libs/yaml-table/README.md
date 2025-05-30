# Yaml Table


Build a table using yaml and export to different formats – currently html and markdown are supported. 

## Why?

Markdown tables are a pain to build, and not very flexible. There are existing utilities in VSCode and online that help to smoothen out this process, but I wanted to explore the possibility of using yaml to build these tables instead.

This utility compiles a defined yaml table into html or markdown, and can be used as a cli tool or as a library.

## Example

Input:

```yaml
yamltabl: 1.0.0

columns:
  - column1: Column 1
  - column2: Column 2
  - column3: Column 3

row1:
  column1: I am some text
  column2: >
    <ul>
      <li> list item 1
      <li> list item 2
      <li> list item 3
    </ul>
  column3: I am also some text

row2:
  column1: I am more text
  column3: >
    <ul>
      <li> list item A
      <li> list item B
      <li> list item C
    </ul>
```

Output:

```html
<table><thead><tr><th id="column1">Column 1</th><th id="column2">Column 2</th><th id="column3">Column 3</th></tr></thead><tbody><tr id="row1"><td>I am some text</td><td>I am also some text</td><td><ul><li>list item 1</li><li>list item 2</li><li>list item 3</li></ul></td></tr><tr id="row2"><td>I am more text</td><td></td><td><ul><li>list item A</li><li>list item B</li><li>list item C</li></ul></td></tr></tbody></table>
```

Which renders into the following when embedded in markdown:

<table><thead><tr><th id="column1">Column 1</th><th id="column2">Column 2</th><th id="column3">Column 3</th></tr></thead><tbody><tr id="row1"><td>I am some text</td><td>I am also some text</td><td><ul><li>list item 1</li><li>list item 2</li><li>list item 3</li></ul></td></tr><tr id="row2"><td>I am more text</td><td></td><td><ul><li>list item A</li><li>list item B</li><li>list item C</li></ul></td></tr></tbody></table>

Note the use of plain html in the `row1, column2` and `row2, column3` field. Cells are rendered as plain html, which allows for more flexibility, including in rendering html based lists.

## Usage

### As a CLI tool

```bash
npx yamltabl generate html -i path/to/table.yaml -o path/to/destination/table.html
npx yamltabl generate md -i path/to/table.yaml -o path/to/destination/table.md
```

### As a library

```bash
npm install yamltabl
```

or

```bash
pnpm install yamltabl
```

In your code:

```typescript
import { yamlTableToHTML, yamlTableToMd } from 'yamltabl';

const yamlString = `
  yamltabl: 1.0.0

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

