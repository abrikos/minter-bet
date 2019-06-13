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
        const menuItems = [
            {path: '/', label: t('Home'), show: true},
        ];
        const lotteryItems = [
            {path: '/lottery', label: t('Intro'), show: true},
            {path: '/lottery/members', label: t('Members'), show: true},
            {path: '/lottery/winners', label: t('Winners'), show: true},
            {path: '/lottery/codes', label: t('Valid promo-codes'), show: true},
        ];
        const pbetItems = [
            {path: '/price-bet', label: t('Intro'), show: true},
            {path: '/price-bet/create', label: t('Create bet'), show: true},
        ];
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href='javascript:void(0)' onClick={e => this.props.history.push('/')} className='mr-auto'><img src={logo} alt={'logo'}/> {this.props.store.config.appName}</NavbarBrand>
                <NavbarToggler onClick={e=>this.menuPulled = !this.menuPulled} />
                <Collapse isOpen={this.menuPulled} navbar>
                    <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {t('Price bet')}
                            </DropdownToggle>
                            <DropdownMenu>{pbetItems.map(this.dropDownItem)}</DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {t('Lottery')}
                            </DropdownToggle>
                            <DropdownMenu>{lotteryItems.map(this.dropDownItem)}</DropdownMenu>
                        </UncontrolledDropdown>
                        {menuItems.map(this.navItem)}


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