import React, {Component} from 'react';
import {inject} from "mobx-react";
import {t} from "client/Translator";
import {withRouter} from "react-router";
import instructionRu from "./home.ru";
import instructionEn from "./home.en";
import {Link} from "react-router-dom";
import LotteryCard from "./lottery/lottery-card";

@inject('store') @withRouter
class Home extends Component {
    constructor(props) {
        super(props);
        this.PriceBet = this.props.store.PriceBet;
        this.Lottery = this.props.store.Lottery;
        this.pbList = this.PriceBet.getActiveBets();
    }


    render() {

        return <div>
            <div className={'container'}>
                <div className={'row'}>
                    <div className={'col-sm-6'}>
                        <h2><Link to={'/price-bets/active'} className={'red'}> {t('Price bets')}</Link></h2>
                        <div className={'d-flex flex-wrap justify-content-end'}>

                            {this.pbList.slice(0,8).map((item,i)=><div key={i} className={'card m-1'}>
                                <div className={'card-header'}>
                                    <Link to={`/price-bets/${item.hash}`}> <strong className={'red'}>{this.PriceBet.parseBetMessage(item.message).comparision}</strong></Link>
                                </div>
                                <div className={'card-body'}>
                                    <small>{t('Bank')}: <span className={'display-4 red'}>{this.PriceBet.sumTotal(item.hash).toFixed(2)}</span></small>

                                    <div>{t('Date')}: {this.PriceBet.parseBetMessage(item.message).date}</div>
                                    <div>{t('Coin')}: <span className={'red'}>{this.PriceBet.config.coin}</span></div>
                                    <small><Link to={`/price-bets/${item.hash}`}>{item.from.substring(0,10)}...</Link></small>
                                </div>

                            </div>)}

                        </div>
                    </div>


                    <div className={'col-sm-6'}>
                        <h2><Link to={'/lottery'} className={'red'}> {t('Lottery')}</Link></h2>
                        <LotteryCard/>
                    </div>
                </div>
            </div>
            {this.props.language==='ru' && instructionRu()}
            {this.props.language==='en' && instructionEn()}
        </div>
    }
}

export default Home;
