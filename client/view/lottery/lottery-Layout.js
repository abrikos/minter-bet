import React, {Component} from 'react';
import {inject} from 'mobx-react';
import 'client/css/App.css';
import 'client/css/minter.css';
import LotteryCard from "./lottery-card";

@inject('store')
class LotteryLayout extends Component {

    constructor(props) {
        super(props);
        this.store = props.store;
        this.register = !!props.register || false;
        this.players = props.store.Lottery.getPlayersCount();
        this.balance = props.store.Lottery.getPrize().toFixed(2);
    }

    render() {

        return <div className={'row'}>
                        <div className={'col-md-8'}>
                            {this.props.view}
                        </div>
                        <div className={'col-md-4'}>


                            <LotteryCard/>


                        </div>

                    </div>
    }
}

export default LotteryLayout;
