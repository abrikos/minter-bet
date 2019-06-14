import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import PriceBetLayout from "./price-bet-Layout";
import {Link} from "react-router-dom";


@inject('store') @observer
class PriceBetHome extends Component {



    render() {
        const config = this.props.store.PriceBet.config;
        const page =  <div>

            <h3>Предлагаем Вам делать ставки на стоимость криптовалют в выбранный Вами день.</h3>
            Для этого необходимо на <Link to={'/price-bet/create'} className={'red'}>странице создания ставки</Link> выбрать
            <ul>
                <li>Криптовалютную пару</li>
                <li>Дату проверки цены</li>
                <li>Предполагаемую стоимость криптовалюты</li>
            </ul>
            После этого откроется информационная панель с инструкциями, где будет указан адрес куда отправлять {config.coin} и ОБЯЗАТЕЛЬНАЯ строка в поле "Сообщение"
            По этой строке система определит что сделана ставка и будет предлагать всем желающим ставить за или против
        </div>
        return <PriceBetLayout view={page}/>
    }
}

export default PriceBetHome;
