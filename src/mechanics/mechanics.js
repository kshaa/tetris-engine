define(function(require) {
    var move = require('./lib/move/move')
    var validator = require('./lib/move/lib/validator/validator')

    return function Mechanics(g, r) {
        this._move = new move(g)
        this._validator = new validator(g)
        this.move = this._move.move.bind(this._move)
        this.field = function() {
            let justfield = JSON.parse(JSON.stringify(g.frame.field))
            let piece = g.frame.piece
            let t = piece.tetramino
            if (piece.active) {
                for (i = 0; i < t.length; i++) {
                    for (j = 0; j < t[0].length; j++) {
                        if (t[i][j] != 0) {
                            let val = t[i][j]
                            justfield[piece.y + i][piece.x + j] = val ? piece.key : '0'
                        }
                    }
                }
            }
            return justfield
        }
        this.spawn = function() {
            if (!g.frame.piece.active) {
                g.frame.piece = r.tetromino()

                if (this._validator._fits(g.frame.piece)) {
                    g.frame.piece.active = true
                } else {
                    g.settings.lost = true
                }
            }
        }
        this.flushMoves = function() {
            g.frame.moves = new Array()
        }
        this.storePiece = function() {
            g.frame.field = this.field()
            g.frame.piece.active = false
        }
        this.removeFilled = function() {
            let f1 = g.frame.field
            let fillds = f1.map((r) => {
                return (-1 == r.findIndex((val) => {
                    return (val == 0)
                }))
            })
            g.frame.linesDropped = fillds.filter(function(val) { return val }).length
            for (i = 0; i < fillds.length; i++) {
                let f = g.frame.field
                if (fillds[i]) {
                    let empty = new Array(g.settings.width)
                    empty.fill(0)
                    empty = [empty]
                    g.frame.field = empty.concat(
                        f.slice(0, i).concat(
                            f.slice(i+1)
                        )
                    )
                }
            }
        }
        this.addNewlines = function() {
            if (!g.frame.piece.active) {
                let linesToBeAdded = g.frame.newLines
                let firstFilledRowIndex = g.frame.field.findIndex(function(row) {
                    let firstFilledCellIndex = row.findIndex(function(cell) {
                        return cell !== 0
                    })

                    return firstFilledCellIndex !== -1
                })
                // If collides with first three spawn lines -> lose
                // Else add the lines
                let reserved = firstFilledRowIndex + linesToBeAdded
                if (reserved <= 2  && reserved !== -1) {
                    g.settings.lost = true
                } else {
                    g.frame.field = g.frame.field.splice(linesToBeAdded)

                    for (let i = 0; i < linesToBeAdded; i++) {
                        let width = g.settings.width
                        let filledLine = new Array(width).fill('x')
                        filledLine[Math.round(Math.random() * (width - 1))] = 0
                        g.frame.field.push(filledLine)
                    }

                    g.frame.newLines = 0
                }
            }
        }
        this.lock = function(callback) {
            let piece = g.frame.piece
            if (this._move.minDistance(piece) == 0) {
                let s = g.settings
                if (s.locking == false) {
                    s.locking = true
                    s.lockingSince = performance.now()
                } else {
                    let t1 = s.lockingSince
                    let t2 = performance.now()
                    if (t2 - t1 > s.lockTime) {
                        s.locking = false
                        callback()
                    }
                }
            }
        }

    }
})
