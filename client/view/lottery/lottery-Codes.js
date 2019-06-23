import React, {Component} from 'react';
import {inject} from "mobx-react";
import {Link} from "react-router-dom";
import {t} from "../../Translator";
import LotteryLayout from "./lottery-Layout";
import CopyButton from "../../CopyButton";


@inject('store')
class LotteryCodes extends Component {


    constructor(props) {
        super(props);
        this.promos = props.store.Lottery.getTransactionsSentCodes()
    }


    render() {

        const page= <table>
            <tbody>
            <tr><th>{t('Code')}</th><th>{t('Copy')}</th></tr>
            {this.promos.map((p,i) => <tr key={i}>
                <td><Link to={`/lottery/promo/${p.message}`} className={'red big2'}>{p.message}</Link></td>
                <td><CopyButton text={p.message}/></td>

        </tr>)}
            </tbody></table>;

        return <LotteryLayout view={page}/>
    }
}

export default LotteryCodes;
