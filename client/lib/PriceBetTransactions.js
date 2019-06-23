const axios = require('axios');
const moment = require('moment');
const m = require('./MinterTransactions');
const MinterTransactions = m.default;

class PriceBetTransactions {
    constructor() {
        this.config = MinterTransactions.config.games.priceBet;
        this.config.coin = MinterTransactions.config[MinterTransactions.config.net].symbol;
        this.votes = {for: 'For', against: 'Against'}
    }

    async init() {
        const txs = await MinterTransactions.loadTtransactions(this.config.address);
        this.transactionsIn = txs.txIn.filter(tx=>tx.value).map(tx => {
            tx.value = tx.value * this.config.percent;
            return tx
        });
    }

    arraySum(txs) {
        return txs.reduce((a, b) => a + (b.value || 0), 0);
    }

    sumOfChoice(hash, choice) {
        return this.arraySum(this.getVotes(hash, choice));
    }

    sumTotal(hash) {
        return this.sumOfChoice(hash, 'for') + this.sumOfChoice(hash, 'against');
    }

    prizeToVote(voteHash, choice) {
        let voteBet = this.transactionsIn.find(tx => tx.hash === voteHash);
        const betHash = voteBet.message.hash || voteHash;
        if (!voteBet) return -777;
        const sum = this.sumOfChoice(betHash, choice);
        const totalSum = this.sumTotal(betHash);
        return totalSum * voteBet.value / sum;
        //const allVotes = this.getVotes(bet.message.hash);
    }


    getActiveBets() {
        return this.transactionsIn.filter(tx => this.checkBetMessage(tx.message))
    }

    votesCount(hash) {
        return this.getVotes(hash, 'for').length + this.getVotes(hash, 'against').length;
    }

    getStartBet(hash){
        return this.transactionsIn.find(tx => tx.hash === hash);
    }

    getVotes(hash, choice) {
        if (choice === 'for') {
            const startBet = [this.getStartBet(hash)];
            return startBet.concat(this.transactionsIn.filter(tx => this.checkVoteMessage(tx.message) && tx.message.hash === hash && tx.message.choice === 'for'));
        } else {
            return this.transactionsIn.filter(tx => this.checkVoteMessage(tx.message) && tx.message.hash === hash && tx.message.choice === 'against')
        }
    }


    checkVoteMessage(message) {
        return message
            && Object.keys(this.votes).indexOf(message.choice) !== -1
    }

    checkBetMessage(message) {
        return message
            && message.pair && message.pair.from && message.pair.to
            && message.date > 0
            && ['gt', 'lt', 'eq', 'bt'].indexOf(message.comparision) !== -1
            && (message.price > 0 || (message.priceLow > 0 && message.priceHi > 0))
    }

    voteMessage(hash, choice) {
        return JSON.stringify({hash, choice})
    }

    parseBetMessage(message) {
        const pair = `${message.pair.from}/${message.pair.to}`;
        const comparision = message.comparision === 'lt' ? `${message.pair.from} < ${message.price} ${message.pair.to}` :
            (message.comparision === 'gt' ? `${message.price} ${message.pair.to} < ${message.pair.from}` :
                (message.comparision === 'eq' ? `${message.pair.from} = ${message.price} ${message.pair.to}` :
                    `${message.priceLow} ${message.pair.to} < ${message.pair.from} < ${message.priceHi} ${message.pair.to}`));
        return {
            pair,
            date: moment(message.date).format('YYYY-MM-DD HH:mm'),
            comparision
        }
    }

    async cryptocompare(action, from, to, time, limit) {
        const url = `https://min-api.cryptocompare.com/data/${action}?fsym=${from}&tsym=${to}&tsyms=${to}&ts=${time}&limit=${limit || 100}&extraParams=your_app_name`;
        try {
            const res = await axios(url)
            return res.data.Data
        } catch (e) {
            console.error(e)
            return [];
        }
    }

    async getPriceHistory(pair) {
        await this.cryptocompare('histohour', pair.from, pair.to, 0);

    }

}

export default new PriceBetTransactions()