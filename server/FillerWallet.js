require = require("esm")(module)
const l  = require( '../client/lib/FillerTransactions');
const FillerTransactions = l.default
const l2  = require( '../client/lib/FillerGame');
const FillerGame = l2.default
const moment = require('moment');
const mt = require('../client/lib/MinterTransactions');
const MinterTransactions = mt.default;
const MinterWallet = require('./MinterWallet')

class FillerWallet {
    constructor() {
        this.config = MinterTransactions.config.games.filler;
        this.address = this.config.address;
    }


    async init() {
        this.counter = new Date().valueOf();
        await MinterTransactions.loadTtransactions(this.address);
    }

    test(){
        FillerGame.newField();
    }


}
module.exports =  new FillerWallet();