import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import PriceBetLayout from "./price-bet-Layout";
import {t} from "client/Translator";
import PriceBetVotes from "./price-bet-votes";
import {withRouter} from "react-router";
import instructionRu from "./price-bet-instructionVote.ru";
import instructionEn from "./price-bet-instructionVote.en";

@inject('store') @withRouter
class PriceBetView extends Component {
    constructor(props) {
        super(props)
        this.hash = this.props.match.params.hash;
    }


    render() {

        const page = <div>
            <h2><PriceBetVotes.Header hash={this.hash}/></h2>
            <PriceBetVotes.List hash={this.hash}/>
            <hr/>
            <h3 className={'red'}>{t('Instruction')}</h3>
            {this.props.language==='ru' && instructionRu(this.props.store.PriceBet.config)}
            {this.props.language==='en' && instructionEn(this.props.store.PriceBet.config)}
        </div>;



        return <PriceBetLayout view={page}/>
    }
}

export default PriceBetView;
