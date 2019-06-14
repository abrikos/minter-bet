import React, {Component} from 'react';
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Popover, PopoverHeader} from "reactstrap";
import {observer} from "mobx-react";
import {observable} from "mobx";
import {t} from './Translator';
import md5 from 'md5';


@observer
class CopyButton extends Component {
    @observable showPopOver = false;

    constructor(props) {
        super(props)
        this.id='cpbtn'+md5(this.props.text);

    }


    copyToClipboard = (text) => {
        this.showPopOver = true;
        console.log('text', text)
        const textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select();
        document.execCommand('copy')
        textField.remove();
        setTimeout(() => {
            this.showPopOver = false;
        }, 2000);
    }


    render() {

        return <span>
            <FontAwesomeIcon size={this.props.size} icon={faCopy} onClick={e => this.copyToClipboard(this.props.text)}
                             style={{cursor: 'pointer', color: '#555'}} id={this.id}/>
            <Popover placement={'right'}
                     isOpen={this.showPopOver}
                     target={this.id} toggle={this.toggle}>
          <PopoverHeader>{t('Copied')}</PopoverHeader>
        </Popover>
        </span>
    }
}

export default CopyButton;
