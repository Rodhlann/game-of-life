###Game of Life Code Challege -- WIP v1.0

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

  - if yarn install fails due to certificate issues try running this command: npm config set registry http://registry.npmjs.org/ --global