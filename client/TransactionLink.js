import React, {Component} from 'react';
import {faLink} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Minter from "client/lib/MinterTransactions";

class TransactionLink extends Component {


    render() {

        return <a href={Minter.getTransactionUrl(this.props.hash)} target={'_blank'}>
            <FontAwesomeIcon size={this.props.size} icon={faLink} />
        </a>
    }
}

export default TransactionLink;
