import { jsonToMd } from './json-to-md.js';

describe('parseJsonTableToMd', () => {
  it('should parse a json table into markdown', async () => {
    const jsonInput = {
      metadata: {
        yamltabl: '2.0.0',
        config: undefined,
        columns: [
          { column1: 'Column 1' },
          { column2: 'Column 2' },
          { column3: 'Column 3' },
        ],
      },
      rows: {
        row_1: {
          column3:
            '<ul>\n  <li> list item 1\n  <li> list item 2\n  <li> list item 3\n</ul>\n',
          column1: 'Cell A',
          column2: 'Cell B',
        },
        row_2: {
          column1: 'Cell 1',
          column3: '<ul>\n  <li> list item 1\n  <li> list item 2\n</ul>\n',
        },
      },
    };

    const markdownString = `| Column 1 | Column 2 | Column 3 | 
| ---| ---| ---| 
| Cell A | Cell B | <ul> <li> list item 1 <li> list item 2 <li> list item 3</ul> | 
| Cell 1 |  | <ul> <li> list item 1 <li> list item 2</ul> | 
`;

    const markdownStringResult = await jsonToMd(jsonInput);
    expect(markdownStringResult).toEqual(markdownString);
  });
});
