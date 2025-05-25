import { minify } from 'html-minifier-terser';

import { parseYamlTableString, parseJsonTableToHtml, parseJsonTableToMd } from './parsers.js';
import { minifyConfig } from './configs.js';

describe('parseYamlTableString', () => {
  it('should parse a yaml table into json', () => {
    const yamlString = `
      yamltable: 1.0.0

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

    const result = parseYamlTableString(yamlString);
    expect(result).toEqual({
      metadata: {
        yamltable: '1.0.0',
        config: undefined,
        columns: [
          { column1: 'Column 1' },
          { column2: 'Column 2' },
          { column3: 'Column 3' },
        ],
      },
      rows: {
        row_1: {
          column1: 'Cell A',
          column2: 'Cell B',
          column3: `<ul>
  <li> list item 1
  <li> list item 2
  <li> list item 3
</ul>
`,
        },
      },
    });
  });
});

describe('parseJsonTableToHtml', () => {
  it('should parse a json table into html', async () => {
    const jsonInput = {
      metadata: {
        yamltable: '1.0.0',
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

    const htmlString = `
      <table>
        <thead>
          <tr>
            <th id="column1">Column 1</th>
            <th id="column2">Column 2</th>
            <th id="column3">Column 3</th>
          </tr>
        </thead>
        <tbody>
          <tr id="row_1">
            <td>Cell A</td>
            <td>Cell B</td>
            <td>
              <ul>
                <li>list item 1</li>
                <li>list item 2</li>
                <li>list item 3</li>
              </ul>
            </td>
          </tr>
          <tr id="row_2">
            <td>Cell 1</td>
            <td></td>
            <td>
              <ul>
                <li>list item 1</li>
                <li>list item 2</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    `;

    const minifiedHtmlString = await minify(htmlString, minifyConfig);
    const htmlStringResult = await parseJsonTableToHtml(jsonInput);
    expect(htmlStringResult).toEqual(minifiedHtmlString);
  });
});

describe('parseJsonTableToMd', () => {
  it('should parse a json table into markdown', async () => {
    const jsonInput = {
      metadata: {
        yamltable: '1.0.0',
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

    const markdownStringResult = await parseJsonTableToMd(jsonInput);
    expect(markdownStringResult).toEqual(markdownString);
  });
});
