import React, {Component} from 'react';
import {Provider} from 'mobx-react';
import {Router} from 'react-router-dom';
import Context from './context';
import {createBrowserHistory as createHistory} from 'history';
import './css/App.css';
import './css/minter.css';
import Layout from "client/Layout";
import i18n from 'i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {

    constructor(props) {
        super(props);
        let language = i18n.language && i18n.language.indexOf('ru') !== -1 ? 'ru' : 'en';
        this.state = {language};
        this.history = props.history || createHistory(this.props);
        this.history.listen((location, action) => {
            // location is an object like window.location
            props.store.init();
            console.log(action, location.pathname, location.state)
        });
    }


    changeLanguage = lng => {
        this.setState({language: lng})
    };


    render() {
        let {rootPath} = this.props;
        return (
            <Provider store={this.props.store}>
                <Router history={this.history}>
                    <Context.Provider value={{rootPath}}>
                        <Layout app={this} language={this.state.language}/>
                    </Context.Provider>
                </Router>
            </Provider>
        );
    }
}

export default App;
