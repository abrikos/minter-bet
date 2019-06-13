import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import PriceBetLayout from "./price-bet-Layout";
import {action, observable} from "mobx";
import {Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import HighChartsCustom from "./highcharts";
import DatePicker, {registerLocale} from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {t} from "../../Translator";
import moment from "moment";

import ru from 'date-fns/locale/ru';
import Address from "../../Address";
import CopyButton from "../../CopyButton";


registerLocale('ru', ru)


@inject('store') @observer
class PriceBetCreate extends Component {
    @observable bet = {};
    @observable pair;
    @observable errors = {};
    @observable loading;

    constructor(props) {
        super(props);
        this.pairs = this.props.store.PriceBet.config.pairs;
        this.bet.pair = this.pairs[0];
    }

    @action setPair = async e => {
        this.loading = true;
        this.bet.pair = await JSON.parse(e.target.value);
        this.validation();
        this.loading = false;
    };

    setDate = date => {
        this.bet.date = moment(date).utc().valueOf()
        this.validation();
    };

    setPrice = e => {
        delete this.bet.priceLow;
        delete this.bet.priceHi;
        this.bet.price = e.target.value;
        this.validation();
    };

    setPriceLow = e => {
        delete this.bet.price;
        this.bet.priceLow = e.target.value;
        this.validation();
    };

    setPriceHi = e => {
        delete this.bet.price;
        this.bet.priceHi = e.target.value;
        this.validation();
    };

    inputGroup = (field, text, control) => {

        return <div className={`row mb-3`}>
            <div className={'col-md-3 d-md-flex flex-row-reverse align-items-center'}>{t(text)}</div>
            <div className={'col-md-9'}>

                {control}
                {this.errors[field] &&
                <div className={'text-danger d-flex align-items-center'}>{t(this.errors[field])}</div>}

            </div>

        </div>
    };

    setComparison = e => {
        delete this.bet.priceLow;
        delete this.bet.priceHi;
        delete this.bet.price;

        this.bet.comparision = e.target.value;
    };

    validation = () => {
        let errors = 0;
        if (this.bet.date <= moment().utc().valueOf()) {
            errors++;
            this.errors.date = 'No bet can be made on the past';
            console.log('e1')
        }
        if (this.bet.price <= 0) {
            errors++;
            this.errors.price = 'Price must be greater 0';
            console.log('e2')
        }

        console.log('zzzzz', this.bet.priceLow - this.bet.priceHi)
        if ((this.bet.comparision === 'bt') && (this.bet.priceLow - this.bet.priceHi >=0)) {
            errors++;
            this.errors.priceLow = 'Low place must be less than High price';
            console.log('e3',this.bet.priceLow , this.bet.priceHi)
        }
        if (this.bet.comparision === 'bt' && this.bet.priceLow <= 0) {
            errors++;
            this.errors.priceLow = 'Low place must be greater 0';
            console.log('e4')
        }
        if (this.bet.comparision === 'bt' && this.bet.priceHi <= 0) {
            errors++;
            this.errors.priceHi = 'High place must be greater 0';
            console.log('e5')
        }
        console.log(errors)
        if(!errors) this.errors={};

    };

    formIsValid = ()=> Object.keys(this.errors).length === 0
        && !!this.bet.date
        && !!this.bet.comparision
        && (!!this.bet.price || (!!this.bet.priceLow && !!this.bet.priceHi));

    render() {
        const page = <div className={'p-5'}>
            {this.inputGroup('pair', 'Choose pair', <Input type="select" onChange={this.setPair}>
                {this.pairs.map((p, i) => <option key={i} value={JSON.stringify(p)}>{p.from}/{p.to}</option>)}
            </Input>)}

            {this.inputGroup('date', 'Choose date', <DatePicker onChange={this.setDate} className={'form-control'}
                                                                selected={this.bet.date}
                                                                locale={this.props.language}/>)}


            {this.inputGroup('comparision', 'Price will be', <div>
                <input type={'radio'} name={'comparision'} onChange={this.setComparison} value="gt"/>{t('Greater than')}
                <input type={'radio'} name={'comparision'} onChange={this.setComparison} value={"lt"}/>{t('Less than')}
                <input type={'radio'} name={'comparision'} onChange={this.setComparison} value={'bt'}/>{t('Between')}
                <input type={'radio'} name={'comparision'} onChange={this.setComparison} value={'eq'}/>{t('Equal')}
            </div>)}

            {this.bet.comparision && this.bet.comparision !== 'bt' && this.inputGroup('price', 'Choose price', <Input type="number" onChange={this.setPrice}/>)}
            {this.bet.comparision && this.bet.comparision === 'bt' && <div>
                {this.inputGroup('priceLow', 'Choose low price', <Input type="number" onChange={this.setPriceLow}/>)}
                {this.inputGroup('priceHi', 'Choose high price', <Input type="number" onChange={this.setPriceHi}/>)}
            </div>}

            {/*{JSON.stringify(this.errors)} <br/>
            {JSON.stringify(this.bet)}*/}

            {this.formIsValid() && <div className={'alert alert-success'}>
                {/*<div className={'alert alert-success'}>*/}
                <ul>
                    <li>{t('Address')}: <Address text={this.props.store.PriceBet.config.address}/></li>
                    <li>{t('Amount')}: {t('Any')} </li>
                    <li>{t('Coin')}: <strong className={'big2'}>{this.props.store.PriceBet.config.coin}</strong></li>
                    <li>{t('Send the desired number of {{coin}}s and ALWAYS insert this line in the "Message" field', {coin: this.props.store.PriceBet.config.coin})}:

                        <InputGroup>
                            <Input value={JSON.stringify(this.bet)} readOnly={true} onClick={e => e.target.select()}/>
                            <InputGroupAddon addonType="append">
                                <InputGroupText><CopyButton text={JSON.stringify(this.bet)}/></InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </li>
                    <li>{t('')}</li>
                    <li>{t('')}</li>
                </ul>


            </div>}

            <hr/>
            {this.loading || <HighChartsCustom pair={this.bet.pair}/>}
        </div>;

        return <PriceBetLayout view={page} noChart/>
    }
}

export default PriceBetCreate;
