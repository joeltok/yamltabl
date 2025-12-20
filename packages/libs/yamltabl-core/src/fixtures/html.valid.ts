export const validBase = `
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
`

export const validBulletPoints = `
  <table>
    <thead>
      <tr>
        <th id="column1">Column 1</th>
        <th id="column2">Column 2</th>
      </tr>
    </thead>
    <tbody>
      <tr id="row_1">
        <td>
          <ul>
            <li>bullet point</li>
            <li>bullet point</li>
          </ul>
        </td>
        <td>
          <ul>
            <li>parent bullet point:
              <ul>
                <li>child bullet point</li>
                <li>child bullet point</li>
                <li>child bullet point: 
                  <ul>
                    <li>baby bullet point</li>
                    <li>baby bullet point</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>parent bullet point</li>
          </ul>
        </td>
      </tr>
     </tr>
    </tbody>
  </table>
`