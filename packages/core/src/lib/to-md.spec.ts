import { renderMd } from './to-md.js';

describe('renderMd', () => {
  it('should render yamltabl file into md', async () => {
    const yamlString = `
      yamltabl: 2.0.0

      columns:
        - column1: Column 1
        - column2: Column 2
        - column3: Column 3

      row_1:
        column1: Cell A
        column2: Cell B
        column3: 
          - list item 1
          - list item 2
          - list item 3
      row_2:
        column1: Cell 1
        column2: <b>bolded</b>
        column3: |
          <ul>
            <li> list item 1
            <li> list item 2
          </ul>
    `;

    const expected = `| Column 1 | Column 2 | Column 3 | 
| ---| ---| ---| 
| Cell A | Cell B | <ul> <li>list item 1</li> <li>list item 2</li> <li>list item 3</li> </ul> | 
| Cell 1 | <b>bolded</b> | <ul> <li> list item 1 <li> list item 2</ul> | 
`;

    const result = renderMd(yamlString);
    expect(result).toEqual(expected);
  });
});
