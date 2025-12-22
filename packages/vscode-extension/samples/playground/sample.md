# Sample Markdown with yamltabl support

```yamltabl
yamltabl: 2.0.0

columns:
  - column1: Column 1
  - column2: Column 2
  - column3: Column 3

row1:
  column1: Cell A
  column2: Cell B
row2:
  column1: Cell 1
  column3: |
    <ul>
      <li> list item 1
      <li> list item 2
    </ul>
row3:
  column1:
    - bullet point
    - bullet point
  column2:
    - bullet point:
      - child bullet:
        - baby bullet
    - bullet point

```