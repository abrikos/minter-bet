import React, {Component} from "react";
import {Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import {inject, observer} from "mobx-react";
import {action, observable} from "mobx";
import lotteryRulesRu from "./lang/lottery-rules-ru";
import lotteryRulesEn from "./lang/lottery-rules-en";
import LotteryLayout from "./lottery-Layout";
import lotteryContentEn from "./lang/lottery-rules-en"
import lotteryContentRu from "./lang/lottery-rules-ru"

import {t} from "client/Translator";
import lotteryHomeRu from "./lang/lottery-home-ru";

@inject('store') @observer
class LotteryPromo extends Component {
    @observable code = '';

    @action changePromo = e => {
        console.log(e)
        this.code = e.target.value;
    };

    url = new URL(window.location.href)

    render() {
        const page = <div>
            {this.props.language==='ru' && lotteryContentRu(this.props.store.Lottery.config)}
            {this.props.language==='en' && lotteryContentEn(this.props.store.Lottery.config)}
            {this.props.language==='ru' && lotteryRulesRu(this.props.store.Lottery.config)}
            {this.props.language==='en' && lotteryRulesEn(this.props.store.Lottery.config)}
            <InputGroup className = "mb-3">

                <InputGroupAddon addonType="prepend">
                    <InputGroupText>{t("Your promo code")}</InputGroupText>
                </InputGroupAddon>
                <Input onChange = {this.changePromo} />
            </InputGroup>

            {t("Your link")}: <pre> {this.code? `${this.url.origin}/lottery/promo/${this.code}`: t("Enter the code")} </ pre>

        </div>;
        return <LotteryLayout view={page}/>
    }
}

export default LotteryPromo;