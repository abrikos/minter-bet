import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import LotteryHome from './view/lottery/lottery-home';
import LotteryCodes from "./view/lottery/lottery-Codes";
import LotteryWinners from "./view/lottery/lottery-Winners";
import LotteryMembers from "./view/lottery/lottery-Members";
import LotteryPromo from "./view/lottery/lottery-Promo";
import PriceBetHome from "client/view/price-bets/price-bet-home";
import PriceBetCreate from "client/view/price-bets/price-bet-create";
import PriceBetView from "client/view/price-bets/price-bet-view";
import FillerIntro from "client/view/filler/filler-intro";
import FillerCreate from "client/view/filler/filler-create";
import FillerPlay from "client/view/filler/filler-play";
import PriceBetActive from "./view/price-bets/price-bet-active";
import Home from "./view/home";


@inject('store') @withRouter @observer
class Routes extends React.Component {

/*
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.props.store.alert.isOpen = false;
        }
    }
*/


    render() {
        return <>
            <Switch>
                <Route exact path='/' render={props=><Home language={this.props.language} {...props}/>}/>
                <Route path='/lottery' exact={true} render={props=><LotteryHome language={this.props.language} {...props}/>}/>
                <Route path='/lottery/codes' render={props=><LotteryCodes language={this.props.language} {...props}/>}/>
                <Route path='/lottery/winners' render={props=><LotteryWinners language={this.props.language} {...props}/>}/>
                <Route path='/lottery/members' render={props=><LotteryMembers language={this.props.language} {...props}/>}/>
                <Route path='/lottery/promo/:code' render={props=><LotteryPromo language={this.props.language} {...props}/>}/>

                <Route path='/price-bets' exact={true} render={props=><PriceBetHome language={this.props.language} {...props}/>}/>
                <Route path='/price-bets/create' render={props=><PriceBetCreate language={this.props.language} {...props}/>}/>
                <Route path='/price-bets/active' render={props=><PriceBetActive language={this.props.language} {...props}/>}/>
                <Route path='/price-bets/:hash' render={props=><PriceBetView language={this.props.language} {...props}/>}/>

                <Route path='/filler' exact render={props=><FillerIntro language={this.props.language} {...props}/>}/>
                <Route path='/filler/create' render={props=><FillerCreate language={this.props.language} {...props}/>}/>
                <Route path='/filler/play/:game/:player' render={props=><FillerPlay language={this.props.language} {...props}/>}/>

            </Switch>
        </>;
    };
}

export default Routes