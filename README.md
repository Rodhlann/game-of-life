###Game of Life Code Challege -- WIP v0.3

To deploy:

  - npm install; yarn install;
  - yarn start;

To play:

  - input desired width/height
  - select desired starting values
  - press Start button
    - Currently the "neigbor" value is randomly generated
    - Will be implementing the calculateNeighbors function soon
      - Planning on moving to a 2D array, vs what I'm currently working with for this procedure

Notes:

- Performance:
    - After creating a grid greater than 10x10 the application becomes noticeably more slow
    - 20x20 still works, but bumping up to 50x50 appears to crash the browser
    - Attempted to refactor to Array.forEach function, but this appears to create less consistency than a standard for loop