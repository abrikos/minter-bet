import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import HighChartsCustom from './highcharts'
import {observable} from "mobx";
import Address from "../../Address";
import './price-bet.css';

@inject('store') @observer
class PriceBetLayout extends Component {
    @observable data;

    constructor(props){
        super(props);
        const pairs = this.props.store.PriceBet.config.pairs;
        this.pair = pairs[0]
    }

    render() {

        return <div>
            <div>
                {this.props.view}
            </div>
            <hr/>
            <div className={'row'}>
                <div className={'col-4'}></div>
                <div className={'col-md-4'}>{this.props.noChart || <HighChartsCustom pair={this.pair}/>}</div>
                <div className={'col-4'}></div>
            </div>
        </div>

    }
}

export default PriceBetLayout;
