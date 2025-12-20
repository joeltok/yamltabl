export const validBase = `
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
  row_2:
    column1: Cell 1
    column3: >
      <ul>
        <li> list item 1
        <li> list item 2
      </ul>
`;

export const validBulletPoints = `
  yamltabl: 1.0.0

  columns:
    - column1: Column 1
    - column2: Column 2

  row_1:
    column1: 
      - bullet point
      - bullet point
    column2:
      - parent bullet point:
        - child bullet point
        - child bullet point
        - child bullet point:
          - baby bullet point
          - baby bullet point
      - parent bullet point
`