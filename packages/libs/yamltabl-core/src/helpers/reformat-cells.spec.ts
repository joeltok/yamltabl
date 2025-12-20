import { reformatCells } from './reformat-cells';

describe('reformatCells', () => {
  it('simple strings: nothing changes', () => {
    const jsonTableRemapped = {
      rows: {
        row1: {
          column1: 'Column 1',
          column2: 'Column 2',
          column3: 'Column 3',
        },
        row2: {}
      }
    };

    const result = reformatCells(jsonTableRemapped) 
    expect(result).toEqual(jsonTableRemapped)
  })

  it('html string: nothing changes', () => {
    const jsonTableRemapped = {
      rows: {
        row1: {
          column1: '<ul>\n  <li> list item 1\n  <li> list item 2\n  <li> list item 3\n</ul>\n',
          column2: '<ul>\n  <li> list item 1\n  <li> list item 2\n  <li> list item 3\n</ul>\n',
          column3: '<ul>\n  <li> list item 1\n  <li> list item 2\n  <li> list item 3\n</ul>\n',
        },
        row2: {}
      }
    };

    const result = reformatCells(jsonTableRemapped) 
    expect(result).toEqual(jsonTableRemapped)
  })

  it.skip('solo-leveling bullet points: converted to html', () => {
    const jsonTableRemapped = {
      rows: {
        row1: {
          column1: [
            'bullet point',
            'bullet point',
          ],
        },
      }
    };
    const expected = {
      rows: {
        row1: {
          column1: `
            <ul>
              <li>bullet point</li>
              <li>bullet point</li>
            </ul>
          `,
        },
      }
    }

    const result = reformatCells(jsonTableRemapped) 
    expect(result).toEqual(expected)
  })

  it.skip('multi-level bullet points: converted to html', () => {
    const jsonTableRemapped = {
      rows: {
        row1: {
          column1: [
            { 
              'parent bullet point': [
                'child bullet point',
                'child bullet point',
              ],
            },
            {
              'parent bullet point': [
                'child bullet point',
                'child bullet point',
              ]
            }
          ],
        },
      }
    };
    const expected = {
      rows: {
        row1: {
          column1: `
            <ul>
              <li>parent bullet point
                <ul>
                  <li>child bullet point</li>
                  <li>child bullet point</li>
                </ul
              </li>
              <li>parent bullet point
                <ul>
                  <li>child bullet point</li>
                  <li>child bullet point</li>
                </ul
              </li>
            </ul>
          `,
        },
      }
    }

    const result = reformatCells(jsonTableRemapped) 
    expect(result).toEqual(expected)
  })
})