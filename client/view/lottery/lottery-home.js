import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import lotteryRulesRu from "./lang/lottery-rules-ru";
import lotteryRulesEn from "./lang/lottery-rules-en";
import LotteryLayout from "./lottery-Layout";
import lotteryHomeEn from "./lang/lottery-home-en"
import lotteryHomeRu from "./lang/lottery-home-ru"

@inject('store') @observer
class LotteryHome extends Component {


    constructor(props) {
        super(props)
    }


    render() {
        const page = <div>
            {this.props.language==='ru' && lotteryHomeRu(this.props.store.Lottery.config)}
            {this.props.language==='ru' && lotteryRulesRu(this.props.store.Lottery.config)}

            {this.props.language==='en' && lotteryHomeEn(this.props.store.Lottery.config)}
            {this.props.language==='en' && lotteryRulesEn(this.props.store.Lottery.config)}
        </div>;

        return <LotteryLayout view={page}/>
    }
}

export default LotteryHome;
