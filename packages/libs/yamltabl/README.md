# Yamltabl

Yamltabl lets you define tables in YAML using a predictable schema — with Markdown/HTML output built-in.  

Perfect for everything-as-code documentation and static sites — without the messiness of raw Markdown or HTML tables.


<!-- Vision: YAML as your table editor — powered by a predictable schema, with Markdown/HTML output built-in. -->


## Quick Example

<br>

**What it looks like in Yamltabl:**

```yaml
yamltabl: 2.0.0

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

Yamltabl converts the YAML above into a Markdown-compatible table:

<table><thead><tr><th id="column1">Column 1</th><th id="column2">Column 2</th><th id="column3">Column 3</th></tr></thead><tbody><tr id="row1"><td>I am some text</td><td>I am also some text</td><td><ul><li>list item 1</li><li>list item 2</li><li>list item 3</li></ul></td></tr><tr id="row2"><td>I am more text</td><td></td><td><ul><li>list item A</li><li>list item B</li><li>list item C</li></ul></td></tr></tbody></table>


👉 See the [full schema specification](https://github.com/joeltok/yamltabl/blob/main/packages/libs/yamltabl/docs/schema.md) for a breakdown of each section.

## Usage and Installation

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
import { renderHtml, renderMd } from 'yamltabl';

const yamlString = `
  yamltabl: 2.0.0

  columns:
    - column1: Column 1
    - column2: Column 2
    - column3: Column 3

  row1:
    column1: Cell A
    column2: Cell B
    column3: >
      <ul>
        <li> list item 1
        <li> list item 2
        <li> list item 3
      </ul>
`;

const htmlString = await renderHtml(yamlString);
console.log(htmlString);

const mdString = await renderMd(yamlString);
console.log(mdString);
```

👉 Compare with other table authoring formats in [this comparison guide](https://github.com/joeltok/yamltabl/blob/main/packages/libs/yamltabl/docs/syntax-comparisons.md).

## Cell Formatting

### HTML support

All cells are converted into html, so any html renders.

```yaml
row1:
  column1: <b>I am a bold</b>
  column2: <i>I am italic</i>
  column3: <button>I am a button</button>
```

Multiline HTML is also provided through built-in yaml multiline features.

```yaml
row1:
  column1: >
    <p>I am a</p>
    <p>multiparagraph</p>
    <p>text</p>
  column2: |
    <p>I too</p>
    <p>am a </p>
    <p>multiparagraph</p>
    <p>text</p>
```

### List support

To avoid huffing around with html when making lists with bulletpoints, the below syntax is supported.

```yaml
row1:
  column1:
    - list item 1
    - list item 2
    - list item 3    
```

Nested lists are also supported. Note the need for the ":" unless it is a lowest level bullet point.

```yaml
row1:
  column1:
    - parent bullet point:
      - child bullet point:
        - baby bullet point
        - baby bullet point
      - child bullet point:
        - baby bullet point
        - baby bullet point
    - parent bullet point:
      - child bullet point:
        - baby bullet point
        - baby bullet point
      - child bullet point:
        - baby bullet point
        - baby bullet point
``