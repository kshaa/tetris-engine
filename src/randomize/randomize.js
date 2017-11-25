define(function(require) {
    var tetrominos = require('./tetrominos')

    return function Randomize(seed) {
        var randomizer = this
        if (typeof seed === 'undefined') {
            this._seed = Math.round(Math.random() * Math.pow(10, 17))
        } else {
            this._seed = seed
        }
        console.log(this._seed)
        this._id = 0
        this._keys = new Array()
        this._tetrominos = tetrominos
        this._random = function() { // Random value from sin with seed
            var x = Math.sin(randomizer._seed++) * 10000;
            return x - Math.floor(x);
        }
        this._populate = function() { // Shuffle tetrominos w/ Fisher-Yates algorithm
            var array = Object.keys(randomizer._tetrominos)
            var currentIndex = array.length, temporaryValue, randomIndex

            while (0 !== currentIndex) {
                randomIndex = Math.floor(randomizer._random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex]
                array[currentIndex] = array[randomIndex]
                array[randomIndex] = temporaryValue
            }

            randomizer._keys = randomizer._keys.concat(array)
        }
        this._stock = function() {
            if ((randomizer._id + 1) % 7 == 1) {
                randomizer._populate()
            }
        },
            this._getTetrominoFromKey = function(key) {
                var tetromino = randomizer._tetrominos[key]
                var clone = JSON.parse(JSON.stringify(tetromino))
                clone['key'] = key
                clone['active'] = false
                return clone
            }
        this._getTetrominoLast = function() {
            var key = randomizer._keys[randomizer._id]
            var tetromino = randomizer._getTetrominoFromKey(key)
            randomizer._id++
            return tetromino
        }
        this.seed = function(s) {
            console.log(s, arguments, arguments.length)
            if (arguments.length == 0) {
                return randomizer._seed
            } else {
                randomizer._seed = s
            }
        },
            this.tetromino = function() {
                randomizer._stock()
                return randomizer._getTetrominoLast()
            }
    }
})
