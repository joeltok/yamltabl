import { minify } from 'html-minifier-terser';

import { reformatCells, reformatCell } from './reformat-cells';

describe('reformatCells', () => {
  it('simple example', () => {
    const jsonTableRemapped = {
      rows: {
        row1: {
          column1: 'Column 1',
          column2: 'Column 2',
          column3: 'Column 3',
        },
        row2: {
          column1: [
            'bullet point',
            'bullet point',
          ]
        }
      }
    };

    const expected = {
      rows: {
        row1: {
          column1: 'Column 1',
          column2: 'Column 2',
          column3: 'Column 3',
        },
        row2: {
          column1: `
            <ul>
              <li>bullet point</li>
              <li>bullet point</li>
            </ul>
            `
        }
      }, 
    }

    const result = reformatCells(jsonTableRemapped) 
    expect(result.rows['row1']).toEqual(expected.rows['row1'])
    expect(minify(result.rows['row2']['column1'] as string)).toEqual(minify(expected.rows['row2']['column1']))
  })
})

describe('reformatCell', () => {
  it('html string: nothing changes', () => {
    const cell = '<ul>\n  <li> list item 1\n  <li> list item 2\n  <li> list item 3\n</ul>\n';

    const result = reformatCell(cell) 
    expect(result).toEqual(cell)
  })

  it('solo-leveling bullet points: converted to html', () => {
    const cell = [
      'bullet point',
      'bullet point',
    ]
    const expected = `
      <ul>
        <li>bullet point</li>
        <li>bullet point</li>
      </ul>
    `

    const result = reformatCell(cell) 
    expect(minify(result)).toEqual(minify(expected))
  })

  it('double-level bullet points: converted to html', () => {
    const cell = [
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
    ]
    const expected = `
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
    `;

    const result = reformatCell(cell) 
    expect(minify(result)).toEqual(minify(expected))
  })

  it('tri-level bullet points: converted to html', () => {
    const cell = [
      { 
        'parent bullet point': [
          { 
            'child bullet point': [
              'baby bullet point',
              'baby bullet point',
            ]
          },
          { 
            'child bullet point': [
              'baby bullet point',
              'baby bullet point',
            ]
          },
        ],
      },
      {
        'parent bullet point': [
          { 
            'child bullet point': [
              'baby bullet point',
              'baby bullet point',
            ]
          },
          { 
            'child bullet point': [
              'baby bullet point',
              'baby bullet point',
            ]
          },
        ]
      }
    ]
    const expected = `
      <ul>
        <li>parent bullet point
          <ul>
            <li>child bullet point
              <ul>
                <li>baby bullet point</li>
                <li>baby bullet point</li>
              </ul>
            </li>
            <li>child bullet point
              <ul>
                <li>baby bullet point</li>
                <li>baby bullet point</li>
              </ul>
            </li>
          </ul
        </li>
        <li>parent bullet point
          <ul>
            <li>child bullet point
              <ul>
                <li>baby bullet point</li>
                <li>baby bullet point</li>
              </ul>
            </li>
            <li>child bullet point
              <ul>
                <li>baby bullet point</li>
                <li>baby bullet point</li>
              </ul>
            </li>
          </ul
        </li>
      </ul>
    `;

    const result = reformatCell(cell) 
    expect(minify(result)).toEqual(minify(expected))
  })
})