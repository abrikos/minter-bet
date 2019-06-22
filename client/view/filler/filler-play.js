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
    @observable over = false;

    constructor(obj) {
        super(obj);
        this.row = this.props.row;
        this.col = this.props.col;
        this.color = this.props.color;
        this.idx = this.props.idx;
    }

    getClass = () => {
        return this.color
            + ' ' + (this.player ? 'player' : '')
            + ' ' + ((this.over) ? 'over' : '')
    }
}

@inject('store') @observer
class FillerPlay extends React.Component {
    @observable field = [];
    @observable record;
    colors = ['red', 'green', 'blue'];
    checkCoordinates = [[0, -1], [-1, 0], [0, 1], [1, 0]];

    testField = {
        0: {0: "green", 1: "green", 2: "blue"},
        1: {0: "green", 1: "blue", 2: "blue"},
        2: {0: "blue", 1: "blue", 2: "blue"},

    };

    counter = 0;

    indexToCell(i) {

    }

    constructor(props) {
        super(props);
        this.config = this.props.store.Filler.config;
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
    }


    getRandomColor = () => {
        return this.colors[Math.floor(Math.random() * this.colors.length)]
    };

    cellClick = (cell) => {
        if (!this.isNearPlayer(cell)) return;
        const matched = this.field.filter(c => c.color === cell.color && !c.player).filter(c=>this.isNearPlayer(c, true));
        this.field.map(c=>c.over=false)
    };

    isNearPlayer(cell,mark) {
        //if(cell.player && !mark) return false;
        for (const check of this.checkCoordinates) {
            const c = this.getCell(cell.row + check[0], cell.col + check[1]);
            if(!c) continue;
            if (c.player){
                if(mark) cell.player = true;
                return true;
            }
            //if(c.color===cell.color) console.log(c)
        }
    }

    mouseEnter = (cell) => {

        if (!this.isNearPlayer(cell) || cell.player) return;
        const matched = this.field.filter(c => c.color === cell.color && !c.player);

        for (const c of matched) {
            c.over = true;
        }
        //return this.paintMatchedCell(cell);
    };

    mouseLeave = () => {
        this.counter = 0;
        const matched = this.field.filter(c => c.over);
        for (const c of matched) {
            c.over = false;
        }

    };

    getCell = (row, col) => {
        if (row < 0 || col < 0) return;
        const idx = row * this.config.cols + col;
        if (idx > this.field.length) return;
        return this.field[idx]
    };

    drawRows() {
        let rows = [];
        let cols = [];
        let r = 0;
        let col = 0;
        for (let cell of this.field) {
            let row = Math.floor(cell.idx / this.config.cols);
            if (row !== r) {
                col = 0;
                r = row;
                rows.push(<tr key={row} children={cols}/>);
                cols = []
            }
            cols.push(<td
                id={`cell-${row}-${col}`}
                key={col}
                className={cell.getClass()}
                onClick={e => this.cellClick(cell)}
                onMouseEnter={e => this.mouseEnter(cell)}
                onMouseLeave={e => this.mouseLeave()}
            >
                {cell.row}x{cell.col}
            </td>);
            col++;
        }
        rows.push(<tr key={r + 1} children={cols}/>);
        return rows;
    }

    render() {
        return <div>
            <h1>{t('Filer')} </h1>
            <table className={'filer'}>
                <tbody>
                {this.drawRows()}
                </tbody>
            </table>
        </div>
    }
}

export default FillerPlay;