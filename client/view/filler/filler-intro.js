import React from 'react';
import {inject} from "mobx-react";
import introRu from "client/view/filler/filler-intro.ru";
import introEn from "client/view/filler/filler-intro.en";
import {Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import {t} from "client/Translator";
import {action} from "mobx";

@inject('store')
class FillerIntro extends React.Component {
    @action changePromo = e => {
        console.log(e)
        this.code = e.target.value;
    };

    url = new URL(window.location.href)



    render() {
        return (
            <div>
                {this.props.language==='ru' && introRu(this.props.store.Filler.config)}
                {this.props.language==='en' && introEn(this.props.store.Filler.config)}
                <InputGroup className = "mb-3">

                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>{t("Your {{text}}",{text:'TXID'})}</InputGroupText>
                    </InputGroupAddon>
                    <Input onChange = {this.changePromo} />
                </InputGroup>

                {t("Your link")}: <pre> {this.code? `${this.url.origin}/filler/promo/${this.code}`: t("Enter the {{text}}",{text:"TXID"})} </ pre>
            </div>
        );
    }
}

export default FillerIntro;