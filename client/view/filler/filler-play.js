import React from 'react';
import {inject, observer} from 'mobx-react';
import {t} from "client/Translator";
import "./filler.css"
import {observable} from "mobx";
import Filler from "client/lib/FillerGame";
import {Button} from "reactstrap";


@inject('store') @observer
class FillerPlay extends React.Component {
    @observable field = [];
    @observable record;

    constructor(props) {
        super(props);
        this.config = this.props.store.Filler.config;
        this.init()
    }

    init = async ()=>{
        this.field = await Filler.readField()
    };

    cellClick = (cell) => {
        Filler.cellClick(cell)
        this.field.map(c=>c.over=false)
    };

    mouseEnter = (cell) => {
        if (!Filler.isNearPlayer(cell) || cell.player) return;
        const matched = this.field.filter(c => c.color === cell.color && !c.player);
        for (const c of matched) {
            c.over = true;
        }
    };

    mouseLeave = () => {
        const matched = this.field.filter(c => c.over);
        for (const c of matched) {
            c.over = false;
        }
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

    newFfield=async()=>{

    };

    render() {
        return <div>
            <h1>{t('Filer')} </h1>
            <Button onClick={this.newFfield}>New</Button>
            <table className={'filer'}>
                <tbody>
                {this.field.length > 0 && this.drawRows()}
                </tbody>
            </table>
        </div>
    }
}

export default FillerPlay;