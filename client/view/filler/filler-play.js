import React from 'react';
import {inject, observer} from 'mobx-react';
import {t} from "client/Translator";
import "./filler.css"
import {observable} from "mobx";

@observer
class Cell extends React.Component {
    row = 0;
    col = 0;
    @observable color = '';
    @observable player = false;

    constructor(obj) {
        super()
        this.row = obj.row;
        this.col = obj.col;
        this.color = obj.color;
    }

    getClass = () => {
        return this.color + ' ' + (this.player ? 'player' : '') + ' ' + ((this.border && !this.player) ? 'border' : '')
    }
}

@inject('store') @observer
class FillerPlay extends React.Component {
    @observable field = [];
    @observable record;
    colors = ['red', 'green', 'blue'];
    checkCoordinates = [[0, -1], [-1, 0], [0, 1], [1, 0]];

    testField = {
        0: {0: "green", 1: "green", 2:"blue"},
        1: {0: "green", 1: "blue", 2: "blue"},
        2: {0: "blue", 1: "blue", 2: "blue"},

    };

    counter =0;


    constructor(props) {
        super(props);
        const config = this.props.store.Filler.config;
        for (let row = 0; row < config.rows; row++) {
            const cols = [];
            for (let col = 0; col < config.cols; col++) {
                const color = this.testField[row] && this.testField[row][col] || this.getRandomColor();
                const cell = new Cell({row, col, color});
                //const cell = {row, col, color};
                cols.push(cell)
            }
            this.field.push(cols);
        }
        const playerCell = this.getCell(0, 0);
        //playerCell.player = true;

        /* playerCell.color = 'green';
         const c1 = this.getCell(0, 1);
         c1.color = playerCell.color;
         const c2 = this.getCell(0, 2);
         c2.color = playerCell.color;
         const c3 = this.getCell(1, 2);
         c3.color = playerCell.color;
         const c4 = this.getCell(2, 2);
         c4.color = playerCell.color;*/

        this.captureMatchedCell(playerCell);
    }


    getRandomColor = () => {
        return this.colors[Math.floor(Math.random() * this.colors.length)]
    };

    cellClick = (row, col) => {
        const cell = this.getCell(row, col);
        if(cell.player) return;
        //cell.player = true;
        //return
        //if (cell.player) return;
        let playersCellNear;
        for (const check of this.checkCoordinates) {
            const checkCell = this.getCell(cell.row + check[0], cell.col + check[1]);
            if (!checkCell) continue;
            if (checkCell.player) playersCellNear = checkCell;
        }
        if (!playersCellNear) return;
        this.captureMatchedCell(cell)
    };

    mouseEnter = (row, col, over) => {
        const cell = this.getCell(row, col);
        if(!cell.border) return;
        const matched = document.getElementsByClassName(cell.color);
        for (const e of matched) {
           e.classList.add('over')
        }
        //return this.paintMatchedCell(cell);
    };

    mouseLeave = ()=>{
        this.counter = 0;
        const matched = document.getElementsByClassName('over');

        for (const e of matched) {
            console.log(e.classList)
            e.classList.remove('over')
            //e.removeClass('over')
        }

    };

    paintMatchedCell=(cell)=>{
        console.log('--', cell.row, cell.col)
        if(this.counter>17) return;        this.counter++;
        const td = document.getElementById(`cell-${cell.row}-${cell.col}`);
        td.classList.add('over')
        for (const check of this.checkCoordinates) {
            const checkCell = this.getCell(cell.row + check[0], cell.col + check[1]);
            if (!checkCell || checkCell.player || checkCell===cell) continue;
            if (checkCell.color === cell.color) {
                console.log('CHECK', checkCell.row, checkCell.col)
                this.paintMatchedCell(checkCell)
            }
        }

    };

    captureMatchedCell = (cell) => {
        console.log('Start craw',cell)
        if (cell.player) return;
        cell.player = true;
        cell.border = true;
        for (const check of this.checkCoordinates) {
            const checkCell = this.getCell(cell.row + check[0], cell.col + check[1]);
            if (!checkCell || checkCell.player) continue;
            if (checkCell.color === cell.color) {
                this.captureMatchedCell(checkCell)
            } else {
                checkCell.border = true;
            }
        }
    };

    getCell = (row, col) => {
        return this.field[row] && this.field[row][col]
    };

    render() {
        const rows = this.field.map((row, r) => {
            return <tr key={r}>{row.map((cell,c )=>
                <td
                    id={`cell-${r}-${c}`}
                    key={c}
                    className={cell.getClass()}
                    onClick={e => this.cellClick(cell.row, cell.col)}
                    onMouseEnter={e => this.mouseEnter(cell.row, cell.col, 1)}
                    onMouseLeave={e => this.mouseLeave(e)}
                >
                    {cell.row}x{cell.col}
                </td>
            )}</tr>;
        });
        return <div>
            <h1>{t('Filer')} </h1>
            <table className={'filer'}>
                <tbody>
                {rows}
                </tbody>
            </table>
        </div>
    }
}

export default FillerPlay;