import React from 'react';
import config from "client/lib/config"
import {Button} from "reactstrap";
const W3CWebSocket = require('websocket').w3cwebsocket;
const url = new URL(window.location.href)
const client = new W3CWebSocket(url.hostname==='localhost' ? `ws://localhost:${config.websocket.port}/`: `ws://${config.websocket.host}:${config.websocket.port}/`, 'echo-protocol');

client.onerror = function() {
    console.log('Connection Error');
};

client.onopen = function() {
    console.log('WebSocket Client Connected');

    function sendNumber() {
        if (client.readyState === client.OPEN) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            client.send(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }
    //sendNumber();
};

client.onclose = function() {
    console.log('echo-protocol Client Closed');
};

client.onmessage = function(e) {
    if (typeof e.data === 'string') {
        console.log("Received: '" + e.data + "'");
    }
};

class SeaWarLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 90
        };
    }

    send=()=>{
        client.send('zzzz')
    };

    render() {
        return (
            <div>
                Count: <strong>{this.state.count}</strong>
                <Button onClick={this.send}>Send</Button>
                {/*<Websocket url='ws://localhost:8080/live/product/12345/'
                           onMessage={this.handleData.bind(this)}/>*/}
            </div>
        );
    }
}

export default SeaWarLayout;