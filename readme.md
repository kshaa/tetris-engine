# Tetris engine
## Features
* It kind of works
* The most spaghettified, janky code I've ever written, I think.
    (This is code is really difficult to maintain, so I mostly don't )
* [7 system / random bag](https://tetris.wiki/Random_Generator) tetromino generation
    (Long run without a desired tetromino is less likely)
* Seed-based tetromino generation
    (Equal chances in multiplayer)
* [Super rotation system](https://tetris.wiki/SRS)
    (Rotation around walls, T-Spins, magical tetris saves)

## Bugs
* Who knows what this janky code might produce! 

# Compiling
To compile, run this:
```
    # Get dependencies
    npm install

    # Compile
    npm run build
```

To hackily compile for use in ES6 code, run this:
```
    # Get dependencies
    npm install

    # Compile
    ./node_modules/.bin/amdtoes6 src/engine.js > src/engine.es6.js
```
