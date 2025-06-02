
# Syntax Comparisons

## Yamltabl

```yaml
yamltabl: 1.0.0

columns:
  - column1: Column 1
  - column2: Column 2
  - column3: Column 3

row1:
  column1: I am some text
  column2: >
    <ul>
      <li> list item 1
      <li> list item 2
      <li> list item 3
    </ul>
  column3: I am also some text

row2:
  column1: I am more text
  column3: >
    <ul>
      <li> list item A
      <li> list item B
      <li> list item C
    </ul>
```

## Markdown Table

Without Prettifying:

```md
| Column 1 | Column 2 | Column 3 | 
| ---| ---| ---| 
| Cell A | Cell B | <ul> <li> list item 1 <li> list item 2 <li> list item 3</ul> | 
| Cell 1 |  | <ul> <li> list item 1 <li> list item 2</ul> | 
```

With Prettifying (which breaks easily on edit):

```md
| Column 1 | Column 2 | Column 3                                                     |
|----------|----------|--------------------------------------------------------------|
| Cell A   | Cell B   | <ul> <li> list item 1 <li> list item 2 <li> list item 3</ul> |
| Cell 1   |          | <ul> <li> list item 1 <li> list item 2</ul>                  |
```

## HTML with Prettifying

```html
<table>
   <thead>
      <tr>
         <th id="column1">Column 1</th>
         <th id="column2">Column 2</th>
         <th id="column3">Column 3</th>
      </tr>
   </thead>
   <tbody>
      <tr id="row1">
         <td>I am some text</td>
         <td>I am also some text</td>
         <td>
            <ul>
               <li>list item 1</li>
               <li>list item 2</li>
               <li>list item 3</li>
            </ul>
         </td>
      </tr>
      <tr id="row2">
         <td>I am more text</td>
         <td></td>
         <td>
            <ul>
               <li>list item A</li>
               <li>list item B</li>
               <li>list item C</li>
            </ul>
         </td>
      </tr>
   </tbody>
</table>
```
<br>




