# Markdown Preview Yamltabl Support

Add Yamltabl support to Markdown Preview. Yamltabl lets you define tables in YAML using a predictable schema. 

Perfect for everything-as-code documentation and static sites — without the messiness of raw Markdown or HTML tables.

## Usage

Add the following delimited code block to any Markdown file. It will render as a Markdown table. 

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

👉 See the [full schema specification](https://github.com/joeltok/yamltabl/blob/main/packages/npm-package/docs/schema.md) for a breakdown of each section and more.
