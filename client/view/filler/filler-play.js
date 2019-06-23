import React from 'react';
import {inject, observer} from 'mobx-react';
import {t} from "client/Translator";
import "./filler.css"
import {observable, toJS} from "mobx";
import Filler from "client/lib/FillerGame";
import FillerTransactions from "client/lib/FillerTransactions";
import {Button, Popover, PopoverBody, PopoverHeader} from "reactstrap";
import Address from "../../Address";
import CopyButton from "../../CopyButton";



@inject('store') @observer
class FillerPlay extends React.Component {
    @observable field = [];
    @observable cellClicked;
    @observable txMessage;
    @observable instructionBlock;

    constructor(props) {
        super(props);
        this.config = this.props.store.Filler.config;
        this.game = this.props.match.params.game;
        this.player = this.props.match.params.player;
        this.init()
    }

    init = async () => {
        this.field = await Filler.readField();
    };

    cellClick = async (cell) => {
        if (!Filler.isNearPlayer(cell)) return;
        this.txMessage = await this.getMessage(cell);
        this.cellClicked = cell;

    };

    mouseEnter = (cell) => {
        if (!Filler.isNearPlayer(cell) || cell.player) return;
        const allMatched = this.field.filter(c => c.color === cell.color && !c.player);
        for (const c of allMatched) {
            if (c.idx === 23) console.log(c)
            c.over = true;
        }
        Filler.findCapturedCells(cell);
        Filler.capturedCells.map(c => this.field[c.idx].captured = true);
    };

    mouseLeave = () => {
        this.field.map(c => {
            c.over = false;
            c.captured = false;
            return 0;
        });
        Filler.clearCapturedCells()
    };

    drawRows() {
        let rows = [];
        let cols = [];
        let r = 0;
        let col = 0;
        for (let cellProto of this.field) {
            const cell = Filler.createCell(toJS(cellProto));
            let row = Math.floor(cell.idx / this.config.cols);
            if (row !== r) {
                col = 0;
                r = row;
                rows.push(<tr key={row} children={cols}/>);
                cols = []
            }
            cols.push(<td
                id={cell.getId()}
                key={col}
                className={cell.getClass()}
                onClick={e => this.cellClick(cell)}
                onMouseEnter={e => this.mouseEnter(cell)}
                onMouseLeave={e => this.mouseLeave()}
            >
                {cell.idx}
            </td>);
            col++;
        }
        rows.push(<tr key={r + 1} children={cols}/>);
        return rows;
    }

    async getMessage(cell){
        const data = {
            type: FillerTransactions.types.turn,
            cell: cell.idx,
            field: this.field
        };
        return  await FillerTransactions.compressMessage(data);
    }



    render() {
        return <div>
            <h1>{t('Filer')} </h1>
            <Button onClick={this.newFfield}>New</Button>
            <table className={'filer'}>
                <tbody>
                {this.field.length > 0 && this.drawRows()}
                </tbody>
            </table>
            {this.cellClicked && <Popover placement="bottom" isOpen={true} target={this.cellClicked.getId()}>
                <PopoverHeader>{t('Instruction')}</PopoverHeader>
                <PopoverBody>
                    <div >
                        send 0 to <Address text={FillerTransactions.config.address}/>
                        <br/>and fill message
                        <code>{this.txMessage}</code><CopyButton text={this.txMessage} size={'1x'}/>
                        {t('Wait until the payment passes')}
                    </div>
                </PopoverBody>
            </Popover>}
        </div>
    }
}

export default FillerPlay;