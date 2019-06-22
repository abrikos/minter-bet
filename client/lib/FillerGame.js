const config = require('./config');
const fs = require('fs');
const axios = require('axios');

class Cell {

    constructor(obj) {
        this.row = obj.row;
        this.col = obj.col;
        this.color = obj.color;
        this.idx = obj.idx;
    }

    getClass() {
        return this.color
            + ' ' + (this.player ? 'player' : '')
            + ' ' + ((this.over) ? 'over' : '')
    }
}


class FillerGame {
    constructor() {
        this.field = [];
        this.colors = ['red', 'green', 'blue'];
        this.checkCoordinates = [[0, -1], [-1, 0], [0, 1], [1, 0]];

        this.testField = {
            0: {0: "green", 1: "green", 2: "blue"},
            1: {0: "green", 1: "blue", 2: "blue"},
            2: {0: "blue", 1: "blue", 2: "blue"},

        };

    }

    newField() {
        this.config = config.games.filler;
        for (let i = 0; i < this.config.rows * this.config.cols; i++) {
            let row = Math.floor(i / this.config.cols);
            let col = i % this.config.cols;
            const color = this.testField[row] && this.testField[row][col] || this.getRandomColor();
            const cell = new Cell({idx: i, row, col, color});
            this.field.push(cell);
        }
        this.field[0].player = true;
        //this.cellClick(this.field[0]);
        this.cellClick(this.field[1]);
        this.saveField();
        return this.field;
    };

    saveField() {
        fs.writeFile('./build/filler-test-field.json', JSON.stringify(this.field),console.log);
    };

    async readField  ()  {
        try {
            const res = await axios(`http://minter-bet/filler-test-field.json`)
            return res.data.data
        } catch (e) {
            return console.error(e)
        }

    };


    cellClick  (cell)  {
        if (!this.isNearPlayer(cell)) return;
        this.field.filter(c => c.color === cell.color && !c.player).map(c => this.isNearPlayer(c, true));
        this.field.map(c => c.over = false)
    };


    getRandomColor ()  {
        return this.colors[Math.floor(Math.random() * this.colors.length)]
    };


    isNearPlayer(cell, mark) {
        //if(cell.player && !mark) return false;
        for (const check of this.checkCoordinates) {
            const c = this.getCell(cell.row + check[0], cell.col + check[1]);
            if (!c) continue;
            if (c.player) {
                if (mark) cell.player = true;
                return true;
            }
            //if(c.color===cell.color) console.log(c)
        }
    }

    getCell (row, col)  {
        if (row < 0 || col < 0) return;
        const idx = row * this.config.cols + col;
        if (idx > this.field.length) return;
        return this.field[idx]
    };


}

export default new FillerGame()