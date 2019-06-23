const config = require("./config");
const axios = require("axios");



class MinterTransactions {


    constructor() {
        this.config = config;
        this.network = config[config.net];
    }

    async loadTtransactions(address) {
        //this.transactions = await this.getTransactionsList().catch(e => console.log(e));
        const list = await this.explorer(`/addresses/${address}/transactions`)

        const txAll = list.map(tx => {
            const message = this.decode(tx.payload);
            tx.value = parseFloat(tx.data.value);
            tx.to = tx.data.to;
            try {
                tx.message = JSON.parse(message);
            } catch (e) {
                tx.message = message;
            }
            return tx;
        }).filter(tx => tx.message !== 'this is a gift');
        const txIn = txAll.filter(t => t.from !== address && t.message!=='gift');
        const txOut = txAll.filter(t => t.from === address);
        return {txAll,txIn,txOut};
    }

    getTransactionUrl(hash){
        return `${this.network.explorerUrl}/transactions/${hash}`
    }

    getAddressUrl(address){
        return `${this.network.explorerUrl}/address/${address}`
    }

    async getLastBlock() {
        return await this.explorer('/blocks');
    }

    async getTransaction(tx) {
        return await this.explorer(`/transactions/${tx}`)
    };


    async explorer(action) {
        try {
            const res = await axios(`${this.network.explorerApiUrl}${action}`)
            return res.data.data
        } catch (e) {
            return console.error(e)
        }
    };

    decode(value) {
        return Buffer.from(value, 'base64').toString('ascii')
    };
};


export default new MinterTransactions()
