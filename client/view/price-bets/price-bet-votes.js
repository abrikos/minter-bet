import React, {Component} from 'react';
import {inject} from "mobx-react";
import {t} from "client/Translator";
import moment from "./price-bet-active";
import TransactionLink from "../../TransactionLink";
import {ModalHeader} from "reactstrap";
import CopyButton from "../../CopyButton";

@inject('store')
class List extends Component {

    constructor(props) {
        super(props)
        this.PriceBet = this.props.store.PriceBet;
        this.startBet = this.PriceBet.getStartBet(props.hash);
        console.log('zzzzzzzzzzzzzzzzzz')
    }

    votesList = (choice) => {
        const sum = this.PriceBet.sumOfChoice(this.startBet.hash, choice);
        return <div>
            <h3 className={'text-center'}>{t(this.PriceBet.votes[choice])}</h3>
            <hr/>
            <div  className={'container'}>
            <div className={'row'}>
                <div className={'col-5'}>{this.PriceBet.config.coin}</div>
                <div className={'col-5'}>{t('Share')}, {this.PriceBet.config.coin}</div>
                <div className={'col-2'}>TX</div>

            </div>
            {this.PriceBet.getVotes(this.props.hash,choice).map((tx, i) => <div key={i} className={'row border-bottom'}>
                <div className={'col-5'}>{tx.value.toFixed(2)}</div>
                <div className={'col-5'}>{this.PriceBet.prizeToVote(tx.hash, choice).toFixed(2)}</div>
                <div className={'col-2'}><TransactionLink hash={tx.hash} size={'1x'}/></div>

            </div>)}
                {t('Total')}: <strong className={'red'}>{sum}</strong> {this.PriceBet.config.coin}
            <div>
                {t('Make bet')}:
                <span className={'p-2'}>{t('Address')}: <CopyButton text={this.PriceBet.config.address}/></span>
                <span className={'p-2'}>{t('Message field')}: <CopyButton text={this.PriceBet.voteMessage(this.startBet.hash, choice)}/></span>
            </div>
            </div>

        </div>
    };



    render() {

        return this.startBet ? <div className={'container price-bet border border-dark'}>
            <div  className={'row'}>
            <div className={'col-6 for'}>
                {this.votesList('for')}
            </div>
            <div className={'col-6 against'}>
                {this.votesList('against')}
            </div>
            </div>
        </div>:<div>Wrong hash</div>
    }
}

@inject('store')
class Header extends  Component{
    constructor(props) {
        super(props)
        this.PriceBet = this.props.store.PriceBet;
        this.startBet = this.PriceBet.getStartBet(props.hash);
    }

    render(){
        return this.startBet ? <div>
            {t('Bet')}:
            &nbsp;<strong className={'red'}>{this.PriceBet.parseBetMessage(this.startBet.message).comparision}</strong>;
            &nbsp;{t('Date')}: <span className={'red'}>{this.PriceBet.parseBetMessage(this.startBet.message).date}</span>;
            &nbsp;{t('Bank')}: <strong className={'red'}>{this.PriceBet.sumTotal(this.props.hash).toFixed(2)}</strong> {this.PriceBet.config.coin};
        </div>:<div>Wrong hash</div>
    }
}

const PriceBetVotes: Object = {}

PriceBetVotes.List = List;
PriceBetVotes.Header = Header;


export default PriceBetVotes;
