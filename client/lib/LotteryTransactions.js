const moment = require('moment');
const mt = require('./MinterTransactions');
const MinterTransactions = mt.default;

class LotteryTransactions {
    constructor() {
        this.WinnerType = "winner";
        this.config = MinterTransactions.config.games.lottery;
        this.config.coin = MinterTransactions.config[MinterTransactions.config.net].symbol;
    }

    async init() {

        const txs = await MinterTransactions.loadTtransactions(this.config.address);
        this.transactions = txs.txAll;
        const dayMarks = this.transactions.filter(tx => tx.message && tx.message.type === this.WinnerType);
        let lastDate;

        for (const tx of dayMarks) {
            const time = tx.txn;
            if (!lastDate) {
                lastDate = time;
                continue;
            }
            if (lastDate < time) {

                lastDate = time;
            }
        }

        this.transactionsDay = lastDate ? this.transactions.filter(t => t.txn > lastDate) : this.transactions;
        this.transactionsIn = this.transactionsDay.filter(t => t.from !== this.config.address && t.message!=='gift');
        this.transactionsOut = this.transactionsDay.filter(t => t.from === this.config.address);
        this.transactionsWinners = this.transactions.filter(t => t.from === this.config.address && t.message && t.message.type === this.WinnerType);

    }


    async getLastBlock(){
        return await MinterTransactions.getLastBlock()
    }


    getPrice() {
        return this.config.price;
    };


    getAddressFromPromo(promo) {
        const parentTx = this.getTransactionsSentCodes().filter(t => t.message === promo);
        if (!parentTx.length) return;
        return parentTx[0].to;
    }


    getPlayersList() {
        const validPromos = this.getValidCodes();
        //const dayTxsIn = .filter(t => moment(t.timestamp).unix() > moment().subtract(1, 'days').startOf('day').unix());
        //const dayTxsOut = MinterTransactions.getTransactionsPayPromo().filter(t => moment(t.timestamp).unix() > moment().subtract(1, 'days').startOf('day').unix());
        if (!this.transactionsIn.length) return [];
        const players = [];
        const price = this.getPrice();
        for (const tx of this.transactionsIn) {
            const promo = validPromos.indexOf(tx.message) !== -1 ? this.config.promoChance : 0;

            tx.promoChance = promo + Math.ceil(tx.value/price)
            players.push(tx)
        }
        return players;

    }

    getPlayersCount() {
        return this.transactionsIn.length;
    }

    getPrize() {
        const dayTxsIn = this.transactionsIn;
        const dayTxsOut = this.getTransactionsPayPromo().filter(t => moment(t.timestamp).unix() > moment().subtract(1, 'days').startOf('day').unix());
        let sum = 0;
        for (const tx of dayTxsIn) {
            sum += tx.value;
        }
        let diff = 0
        for (const tx of dayTxsOut) {
            diff -= tx.value;
        }
        return (sum + diff) * this.config.percentDaily;

    }

    getValidCodes() {
        return this.getTransactionsSentCodes().map(tx => tx.message)
    }

    getTransactionsWinner() {
        return this.transactionsWinners;
    }

    getTransactionsWithValidPromo() {
        //const txList = await MinterTransactions.getTransactionsList();
        const codesSent = this.getValidCodes();
        return this.transactionsIn.filter(t => t.message && (typeof t.message === "string") && codesSent.indexOf(t.message) !== -1)
    };

    getTransactionsSentCodes() {
        return this.transactions.filter(t => t.from === this.config.address && (typeof t.message === "string") && t.message.indexOf(this.config.codePrepend) !== -1)
    };

    getTransactionsPayPromo() {
        return this.transactionsOut.filter(t => t.message && t.message.type === this.config.types.payPromo)
    };


    generateCode() {
        return this.config.codePrepend + new Date().valueOf();
    }



}

export default new LotteryTransactions()