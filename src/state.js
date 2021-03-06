define(function() {
    return function state() {
        this.settings = {
            gravity: 1000, // Tetris G's - miliseconds between drops
            height: 24, // Upper two lines are the spawn
            width: 10,
            droppedAt: 0,
            startedAt: undefined,
            playing: false,
            lost: false,
            delayed: false, // Animation induced delay
            delayTime: 300,
            frameId: undefined,
            locking: false,
            lockingSince: 0,
            lockTime: 500
        }
        this.frame = {
            newLines: 0,
            linesDropped: 0,
            time: 0, // Last computation end time (ms)
            piece: { // Current tetromino piece on field
                active: false,
                key: undefined, // What type of tetromino
                x: undefined, // Bounding box's upper left coordinate
                y: undefined, // Bounding box's upper left coordinate
                rotation: undefined, // 0 R 2 L
                tetramino: undefined // [ [ (Boolean) ] ]
            },
            moves: new Array(), // [ Char ] Moves to be executed
            field: undefined // [ [ (Tetromino type) ] ]
        }

        // Create empty field
        this.frame.field = new Array(this.settings.height)
        for (i = 0; i < this.settings.height; i++) {
            this.frame.field[i] = new Array(this.settings.width).fill(0)
        }
    }
})
