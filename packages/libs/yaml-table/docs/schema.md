# Yamltabl YAML Schema

Yamltabl uses a simple, predictable YAML schema to define tables. This document describes the structure and rules of that schema.

---

## Required Field: `yamltabl`

```yaml
yamltabl: 1.0.0
```

* This is a required field and must appear at the top of every file.
* It indicates the version of the schema being used.

---

## Required Field: `columns`

```yaml
columns:
  - key1: Column Header 1
  - key2: Column Header 2
  - key3: Column Header 3
```

* `columns` defines the structure of the table.
* It must be an **array of single-key objects**.
* The **key** is a unique identifier used to reference the column in each row.
* The **value** is the label that appears in the rendered table header.
* All keys must be unique.

---

## Reserved Field: `config`

```yaml
config:
  align: center
```

* The `config` field is reserved for future or extended configuration options.
* It should not be used as a row key.

---

## Rows: All Other Top-Level Keys

All other top-level keys represent **rows** in the table.

Each row:

* Is defined as an object mapping column keys (from the `columns` section) to their cell values.
* Can omit certain columns if the cell should be left blank.
* Can use 
  * strings, 
  * html formatted content, or
  * yaml-supported multiline strings (note the ">"), or 
  * yaml-supported multiline strings with html formatting.

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

---

## Full Example

```yaml
yamltabl: 1.0.0

columns:
  - product: Product
  - price: Price
  - notes: Notes

row1:
  product: Apple
  price: $1.00
  notes: Crisp and red

row2:
  product: Banana
  price: $0.50
```

This will render a table with three columns and two rows, formatted according to the given schema.


