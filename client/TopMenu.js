import React from 'react';
import {inject, observer} from 'mobx-react';
import {observable} from "mobx";
import {
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    UncontrolledDropdown,
} from "reactstrap";
import {Link, withRouter} from "react-router-dom";
import {t, changeLanguage} from "./Translator";
import logo from './logo.svg'


@withRouter @inject('store') @observer
class TopMenu extends React.Component {
    @observable address = '';
    @observable balance = 0;
    @observable menuPulled = false;

    constructor(props) {
        super(props);
        this.store = props.store;
        this.state = {
            collapsed: true
        };
        document.title = this.props.store.config.appName;
    }

    langSwitch = lng=>{
        this.props.app.changeLanguage(lng);
        changeLanguage(lng)
    };

    navItem = (item) => {
        //const active =  !!this.props.location.pathname.match(item.path);
        const active = this.props.location.pathname === item.path;
        return item.show &&
            <NavItem key={'nav-' + item.path} active={active}>
                <Link to={item.path} className={'nav-link'}>{item.label}</Link>
            </NavItem>
    };

    dropDownItem = (item) => {
        //const active =  !!this.props.location.pathname.match(item.path);
        const active = this.props.location.pathname === item.path;
        return  <DropdownItem key={'nav-' + item.path} active={active} onClick={e=>this.props.history.push(item.path)}>
                {item.label}
            </DropdownItem>
    };

    render() {

        const menuItems = {
            'Lottery':[
                {path: '/lottery', label: t('Intro'), show: true},
                {path: '/lottery/members', label: t('Members'), show: true},
                {path: '/lottery/winners', label: t('Winners'), show: true},
                {path: '/lottery/codes', label: t('Valid promo-codes'), show: true},
            ],
            'Price bets':[
                //{path: '/price-bets', label: t('Intro'), show: true},
                {path: '/price-bets/active', label: t('Active bets'), show: true},
                {path: '/price-bets/create', label: t('Create bet'), show: true},
            ],
            /*'Filler':[
                {path: '/filler', label: t('Intro'), show: true},
                {path: '/filler/create', label: t('Create'), show: true},
                {path: '/filler/play', label: t('Play'), show: true},
            ]*/
        };
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href='javascript:void(0)' onClick={e => this.props.history.push('/')} className='mr-auto'><img src={logo} alt={'logo'}/> {this.props.store.config.appName}</NavbarBrand>
                <NavbarToggler onClick={e=>this.menuPulled = !this.menuPulled} />
                <Collapse isOpen={this.menuPulled} navbar>
                    <Nav className="ml-auto" navbar>
                        {/*{this.navItem({path: '/filler/play/1/a', label: t('Filler Player A'), show: true})}
                        {this.navItem({path: '/filler/play/1/b', label: t('Filler Player B'), show: true})}*/}


                        {this.navItem({path: '/', label: t('Home'), show: true})}

                        {Object.keys(menuItems).map((menu,i) => <UncontrolledDropdown nav inNavbar key={i}>
                            <DropdownToggle nav caret>
                                {t(menu)}
                            </DropdownToggle>
                            <DropdownMenu>{menuItems[menu].map(this.dropDownItem)}</DropdownMenu>
                        </UncontrolledDropdown>)}


                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {t('Language')}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => this.langSwitch('ru')}>
                                    RU
                                </DropdownItem>
                                <DropdownItem onClick={() => this.langSwitch('en')}>
                                    EN
                                </DropdownItem>

                            </DropdownMenu>
                        </UncontrolledDropdown>

                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default TopMenu;