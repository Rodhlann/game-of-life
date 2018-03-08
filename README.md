Game of Life Code Challege -- v1.0

To deploy:

  - npm install; yarn install;
  - yarn start;

To play:

  - input desired width/height (see recommended sizes below)
  - select desired starting cells
    - example patterns can be found at https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns
  - press Start button
    - while start button is active the width/height inputs and starting cell selection will be disabled
  - press Stop to alter height/width and cell selection

Notes: 

  - if yarn install fails due to certificate issues try running this command: 
    - ```npm config set registry http://registry.npmjs.org/ --global```
  - recommended universe height/width: 
    - smallest: 5x5
    - largest : 50x50 (you will notice a performance drop at this size, but it still works!)