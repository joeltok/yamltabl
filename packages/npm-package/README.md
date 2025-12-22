# Yamltabl

Yamltabl lets you define tables in YAML using a predictable schema — and render to Markdown or HTML.

Perfect for everything-as-code documentation and static sites — without the messiness of raw Markdown or HTML tables.

<!-- Vision: YAML as your table editor — powered by a predictable schema, with built-in Markdown/HTML rendering -->

## Quick Example

<br>

**What it looks like in Yamltabl:**

```yaml
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

Yamltabl converts the YAML above into a Markdown-compatible table:

```html
<table>
  <thead>
    <tr>
      <th id="haiku">Haiku Title</th>
      <th id="line1">Line 1</th>
      <th id="line2">Line 2</th>
      <th id="line3">Line 3</th>
    </tr>
  </thead>
  <tbody>
    <tr id="haiku">
      <td>“The Old Pond” by Matsuo Bashō</td>
      <td>“A World of Dew” by Kobayashi Issa</td>
    </tr>
    <tr id="line1">
      <td>An old silent pond</td>
      <td>A world of dew,</td>
    </tr>
    <tr id="line2">
      <td>A frog jumps into the pond —</td>
      <td>And within every dewdrop</td>
    </tr>
    <tr id="line3">
      <td>Splash! Silence again.</td>
      <td>A world of struggle.</td>
    </tr>
  </tbody>
</table>
```

👉 See the [full schema specification](https://github.com/joeltok/yamltabl/blob/main/packages/npm-package/docs/schema.md) for a breakdown of each section and more.

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

👉 Compare with other table authoring formats in [this comparison guide](https://github.com/joeltok/yamltabl/blob/main/packages/npm-package/docs/syntax-comparisons.md).

