import { minify } from 'html-minifier-terser';

import { renderHtml } from './to-html.js';
import { minifyConfig } from '../helpers/configs.js';

describe('renderHtml', () => {
  it('should render yamltabl file into html', async () => {
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
          - parent:
            - child:
              - baby
      row_2:
        column1: Cell 1
        column2: <b>bolded</b>
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
                <li>parent
                  <ul>
                    <li>child
                      <ul>
                        <li>baby</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </td>
          </tr>
          <tr id="row_2">
            <td>Cell 1</td>
            <td><b>bolded</b></td>
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

    const htmlStringResult = await renderHtml(yamlString);
    expect(htmlStringResult).toEqual(minifiedHtmlString);
  });
});
