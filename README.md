###Game of Life Code Challege -- WIP v0.5

To deploy:

  - npm install; yarn install;
  - yarn start;

To play:

  - input desired width/height
  - select desired starting cells
    - example patterns can be found at https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns
  - press Start button
    - while start button is active the width/height inputs and starting cell selection will be disabled
  - press Stop to alter height/width and cell selection

Notes:

- Performance:
    - After creating a grid greater than 10x10 the application becomes noticeably more slow
    - 20x20 still works, but bumping up to 50x50 appears to crash the browser
    - Attempted to refactor to Array.forEach function, but this appears to create less consistency than a standard for loop
    - 2D array refactor does not assist with performance, possibly hurts? 