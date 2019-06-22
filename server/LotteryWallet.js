require = require("esm")(module)
const l  = require( '../client/lib/LotteryTransactions');
const LotteryLib = l.default
const moment = require('moment');
const mt = require('../client/lib/MinterTransactions');
const MinterTransactions = mt.default;
const MinterWallet = require('./MinterWallet')

class Lottery{
    constructor() {
        this.config = MinterTransactions.config.games.lottery;
        this.address = this.config.address;
    }


    async init() {
        await LotteryLib.init();
        await MinterTransactions.loadTtransactions(this.address);
    }


    async dailyWinner() {
        const players = [];
        for (const tx of LotteryLib .getPlayersList()) {
            for (let i = 0; i < tx.promoChance; i++) {
                players.push(tx)
            }
        }
        const prize = LotteryLib .getPrize();
        if (prize <= 0) return;
        const winner = players[Math.floor(Math.random() * players.length)];
        console.log(winner.txn, winner.promoChance, prize);
        await MinterWallet.sendToWinner('lottery', winner, prize);
        //await MinterTransactions.sendDayMark('lottery',this.address);

    }


    async sendPromoCode() {
        const inputTxs = MinterTransactions.transactionsIn;
        const codesSent = LotteryLib.getTransactionsSentCodes();
        const noCodesSent = inputTxs.filter(tx => codesSent.map(t => t.to).indexOf(tx.from) === -1);
        const sent = []
        for (const txData of noCodesSent) {
            const tx = await MinterWallet.send('lottery', txData.from, 0, LotteryLib.generateCode())
            sent.push(tx)
        }
        return sent;
    };

    async payForPromo() {
        // All transactions except from main address, No code and Less than price
        const payedPromo = LotteryLib.getTransactionsPayPromo();
        for (const txData of MinterTransactions.transactionsIn) {
            //if(txData.hash!=='Mtd81f7cfb8a3636e5dc3372b7ae6669f5d3e54b97cda5b7f547daa2110db273ad') continue
            //get parent address from Message
            if (payedPromo.map(tx => tx.message.payedFor).indexOf(txData.hash) === -1 && txData.value >= LotteryLib.getPrice()) {
                //console.log(payedPromo.map(tx => tx.message),txData.hash)
                const payAddress = LotteryLib.getAddressFromPromo(txData.message);
                if (!payAddress) return 'Wrong promo:' + txData.message;
                const amount = LotteryLib.getPrice() * this.config.percent;
                const message = JSON.stringify({type: this.config.types.payPromo, payedFor: txData.hash, code: txData.message});
                console.log('PAY:', payAddress, amount, message);
                await MinterWallet.send('lottery', payAddress, amount, message);
            }
        }
    };

    test(){
        console.log(MinterWallet.getAddress('lottery'))
    }

}


module.exports =  new Lottery();