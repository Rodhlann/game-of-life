## Game of Life Code Challege -- v1.1

### Dependencies: 

- npm
- yarn

### To deploy:

- npm install; yarn install;
- yarn start;

### To play:

- input desired width/height (see recommended sizes below)
  - press enter in each field to submit updated values
- select desired starting cells
  - example patterns can be found at https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns
- press Start button
  - while start button is active the width/height inputs and starting cell selection will be disabled
- press Stop to alter height/width and cell selection
  - By pressing enter in input field or changing height/width you can reset all cells

### Notes: 

  - if yarn install fails due to certificate issues try running this command: 
    - ```npm config set registry http://registry.npmjs.org/ --global```
  - recommended universe height/width: 
    - smallest: 5x5
    - largest recommended: 100x100 (you will notice a performance drop at this size, but it still works!)

### How it works:

This project was created using React and Redux. React and Redux allow for a developer to easily create component driven UI applications,
with easily managed state. Redux was particularly useful for this project due to the ability to create a global state, known as the Store,
for the application which, when updated, automatically updates all relevant child components. Because this application focuses mainly on the
ability to rapidly update and re-draw an entire view, React and Redux were my first choice. 

I accomplished this challenge by first generating the Universe grid procedurally using UniverseRow and UniverseCell components. During
calculation, the UniverseRow represents the Y axis of the Universe and UniverseCell represents the X axis. After the Universe is built up
to the user specification, including their selection of individual cells within the Universe grid, the user can press start, triggering the
Game of Life.

During each tick of the game cycle each cell of the Universe is iterated over, checking to see how many living cells are associated by its
current position. While this is happening a second array is recording the next state of the application. After all cells have been checked,
the new state array is pushed to the Redux store, and the individual UniverseCell statuses are re-drawn based on the new Universe data.
Once the game has been updated and a new game tick begins, the process restarts. 

While a cell is being checked, each cardinal direction is evaluated to be 'alive' or 'dead'. This is accomplished using a two dimensional
array. The current coordinates of the evaluated cell are fed to a checker, which looks to see if the top left, top, rop right, right,
bottom right, bottom, bottom left, and left positions in relation to the current cell are 'alive'. The number of calculated living neighbors for the cell is then fed to a function that checks the Game of Life rules, and calculates the evaluated cell's status.

### Game of Life rules:

1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

### Newest updates

1. Dynamically update CSS to stay within view, based on window size
2. Update base dimensions of the universe
