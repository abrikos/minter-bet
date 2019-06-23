import React, {Component} from 'react';
import TopMenu from "client/TopMenu";
import {withRouter} from "react-router";
import Routes from "client/Routes";
import {t} from "client/Translator";
import {inject} from "mobx-react";


@withRouter @inject('store')
class Layout extends Component {


    render() {
        let {rootPath, ...props} = this.props;
        return <div>
            <TopMenu app={props.app}/>
            {/*<Alert toggle={this.onDismiss} {...alertProps}/>*/}
            <div className={'container py-2'}>
                <Routes store={this.store} {...props}/>
            </div>
            <footer className="footer">
                <div className="footer__container u-container u-container--large"><img
                    src="https://console.minter.network/img/minter-logo-white.svg" alt="Minter"
                    className="footer__logo"/>
                    <div className="footer__menu">
                        <div className="footer__menu-item"><a href="https://www.minter.network/"
                                                              target="_blank"
                                                              rel="nofollow noopener noreferrer"
                                                              className="footer__link link--hover">{t('Intro')}</a>
                        </div>
                        <div className="footer__menu-item"><a href="https://about.minter.network/"
                                                              target="_blank"
                                                              rel="nofollow noopener noreferrer"
                                                              className="footer__link link--hover">{t('Network')}</a>
                        </div>
                        <div className="footer__menu-item"><a href="https://console.minter.network/"
                                                              target="_blank"
                                                              rel="nofollow noopener noreferrer"
                                                              className="footer__link link--hover">{t('Console')}</a>
                        </div>
                        <div className="footer__menu-item"><a href="https://status.minter.network/"
                                                              target="_blank"
                                                              rel="nofollow noopener noreferrer"
                                                              className="footer__link link--hover">{t('Status')}</a>
                        </div>
                        <div className="footer__menu-item"><a href="https://explorer.minter.network/"
                                                              target="_blank"
                                                              rel="nofollow noopener noreferrer"
                                                              className="footer__link link--hover">{t('Explorer')}</a>
                        </div>
                        <div className="footer__menu-item"><a href="https://github.com/MinterTeam"
                                                              target="_blank"
                                                              rel="nofollow noopener noreferrer"
                                                              className="footer__link link--hover">API &amp; SDK</a>
                        </div>
                        <div className="footer__menu-item"><a href="https://docs.minter.network"
                                                              target="_blank"
                                                              rel="nofollow noopener noreferrer"
                                                              className="footer__link link--hover">{t('Docs')}</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    }
}

export default Layout;
