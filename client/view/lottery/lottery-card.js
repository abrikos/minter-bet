import React, {Component} from 'react';
import {inject} from 'mobx-react';
import {Card, CardBody, CardSubtitle, CardText, CardTitle} from "reactstrap";
import 'client/css/App.css';
import 'client/css/minter.css';
import {t} from 'client/Translator'

@inject('store')
class LotteryCard extends Component {

    constructor(props) {
        super(props);
        this.store = props.store;
        this.register = !!props.register || false;
        this.players = props.store.Lottery.getPlayersCount();
        this.balance = props.store.Lottery.getPrize().toFixed(2);
    }

    render() {

        return <Card>
                    <CardBody>
                        <CardTitle>{t('Lottery')} </CardTitle>
                        <CardSubtitle>{t('Prize on')} {new Date().toLocaleDateString()}: </CardSubtitle>
                        <strong className={'big5'}>{this.balance}</strong> {this.props.store.coin}
                        <CardText>{t('Members count')}: <strong className={'red'}>{this.players}</strong></CardText>
                        <CardText>{t('Minimal bet')}: <strong className={'red'}>{this.props.store.Lottery.config.price}</strong> {this.props.store.coin} </CardText>
                    </CardBody>
                </Card>
    }
}

export default LotteryCard;
