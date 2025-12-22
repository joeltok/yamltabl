# Yamltabl YAML Schema

Yamltabl uses a simple, predictable YAML schema to define tables. This document describes the structure and rules of that schema.


## Required Field: `yamltabl`

```yaml
yamltabl: 2.0.0
```

- This is a required field and must appear at the top of every file.
- It indicates the version of the schema being used.


## Required Field: `columns`

```yaml
columns:
  - key1: Column Header 1
  - key2: Column Header 2
  - key3: Column Header 3
```

- `columns` defines the structure of the table.
- It must be an **array of single-key objects**.
- The **key** is a unique identifier used to reference the column in each row.
- The **value** is the label that appears in the rendered table header.
- All keys must be unique.


## Reserved Field: `config`

```yaml
config:
  align: center
```

- The `config` field is reserved for future or extended configuration options.
- It should not be used as a row key.


## Rows: All Other Top-Level Keys

All other top-level keys represent **rows** in the table.

Each row:

- Is defined as an object mapping column keys (from the `columns` section) to their cell values.
- Can omit certain columns if the cell should be left blank.
- Can use
  - strings,
  - html formatted content, or
  - yaml-supported multiline strings (note the ">"), or
  - yaml-supported multiline strings with html formatting.

The final table is formed by combining each **row key** with each **column key** to define a **cell**:

```yaml
rowkey1:
  columnkey1: Row 1, Column 1
  columnkey2: >
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>

rowkey2:
  columnkey1: Row 2, Column 1
  columnkey3: Row 2, Column 3
```

## Cell Formatting

### HTML support

All cells are converted into html, so any html will renders.

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
```
