import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
//import ReactHighcharts  from 'react-highcharts/ReactHighstock.src';
import ReactHighcharts  from 'react-highcharts';
import PriceBet from "../../lib/PriceBetTransactions";
import {observable} from "mobx";
//import {t} from 'client/Translator';
import i18n from "../../i18n";




@inject('store') @observer
class HighChartsCustom extends Component {
    @observable data;

    constructor(props) {
        super(props)
        this.init()
    }

    init = async ()=>{
        const data = await  PriceBet.cryptocompare('histoday', this.props.pair.from,this.props.pair.to,0, 50);

        this.data = data.map(d=>[d.time*1000,d.open*1])
    };


    render() {
        const config={
            rangeSelector: {
                selected: 1
            },
            title: {
                text: this.props.pair.from+'/'+this.props.pair.to
            },
            series: [{
                name: this.props.pair.to,
                data: this.data,
                tooltip: {
                    valueDecimals: 2
                }
            }],
            yAxis: {
                title:{text:this.props.pair.to}
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    month: '%e. %b',
                    year: '%b'
                },
                title: {
                    text: i18n.t('Date')
                }
            },
        };

        return <ReactHighcharts config = {config}/>
    }
}

export default HighChartsCustom;



