import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import PriceBetLayout from "./price-bet-Layout";
import {t} from "client/Translator";
import CopyButton from "../../CopyButton";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {observable} from "mobx";
import {Link} from "react-router-dom";
import PriceBetVotes from "./price-bet-votes";
import {faArrowRight, faEye} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

@inject('store') @observer
class PriceBetActive extends Component {
    @observable viewBet;
    url = new URL(window.location.href);

    constructor(props) {
        super(props);
        this.PriceBet = this.props.store.PriceBet;
        this.list = this.PriceBet.getActiveBets();
        //this.showBets("Mt472b7106b4d35f7e31d0df355fba54245e4b1a7acc5d90c6bb3f5d3e9636fe25")
    }


    showBets = (hash) => {
        this.viewBet = hash;
    };


    render() {

        const page = <div>
            {this.viewBet && <Modal isOpen={true} toggle={this.closeModal} className={'text-dark'} fade={false} size={'lg'}>
                <ModalHeader toggle={this.closeModal}>
                    <PriceBetVotes.Header hash={this.viewBet}/>
                </ModalHeader>
                <ModalBody className={'bg-warning '}>
                        <PriceBetVotes.List hash={this.viewBet}/>
                </ModalBody>
                <ModalFooter>
                    <Link to={`/price-bets/${this.viewBet}`}><FontAwesomeIcon size={'1x'} icon={faArrowRight} /></Link>
                </ModalFooter>
            </Modal>}
            <table>
                <tbody>
                <tr>
                    <th rowSpan={2}>{t('Condition')}</th>
                    <th rowSpan={2} className={'d-none d-sm-table-cell'}>{t('Date')}</th>
                    <th rowSpan={2}>{t('Bank')} <div>{this.PriceBet.config.coin}</div></th>
                    <th rowSpan={2} className={'d-none d-sm-table-cell'}>{t('Bets')}</th>
                    <th rowSpan={2}>{t('Address')}</th>

                    <th colSpan={2}>{t('Message')}</th>

                </tr>
                <tr>
                    <th> {t(this.PriceBet.votes.for)}</th>
                    <th>{t(this.PriceBet.votes.against)}</th>
                </tr>
                {this.list.map((item, i) => <tr key={i}>
                    <td>
                        {this.PriceBet.parseBetMessage(item.message).comparision} <a href="#" onClick={e => this.showBets(item.hash)}><FontAwesomeIcon size={'1x'} icon={faEye} /></a>
                        <div><small><Link to={`/price-bets/${item.hash}`}>{item.from.substring(0,10)}...</Link> <CopyButton text={`${this.url.origin}/price-bets/${item.hash}`}/></small>
                        </div>
                    </td>
                    <td className={'d-none d-sm-table-cell'}>{this.PriceBet.parseBetMessage(item.message).date}</td>
                    <td>{this.PriceBet.sumTotal(item.hash).toFixed(2)}</td>
                    <td className={'d-none d-sm-table-cell'}>{this.PriceBet.votesCount(item.hash).toFixed(2)}</td>
                    <td><CopyButton text={this.PriceBet.config.address}/></td>
                    <td><CopyButton text={this.PriceBet.voteMessage(item.hash, 'for')}/></td>
                    <td><CopyButton text={this.PriceBet.voteMessage(item.hash, 'against')}/></td>


                </tr>)}
                </tbody>
            </table>

        </div>;

        return <PriceBetLayout view={page}/>


    }

    closeModal = () => {
        this.viewBet = null
    }
}

export default PriceBetActive;
