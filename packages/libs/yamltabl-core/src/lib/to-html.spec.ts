import { minify } from 'html-minifier-terser';

import { yamlTableToHTML } from './to-html.js';
import { minifyConfig } from '../helpers/configs.js';

describe('transformers', () => {
  it('should transform a yaml table into html', async () => {
    const yamlString = `
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

    const htmlStringResult = await yamlTableToHTML(yamlString);
    expect(htmlStringResult).toEqual(minifiedHtmlString);
  });
});
