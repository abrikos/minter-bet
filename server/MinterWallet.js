const minterWallet = require( 'minterjs-wallet');
const config = require("../client/lib/config");
//const api = `https://${config.mainNet}/api/v1`;
const minterTransactions = require('minter-js-sdk');
require('dotenv').config()


class MinterWallet {


    constructor() {
        this.config = config;
        this.network = config[config.net];
        this.WinnerType = "winner";
    }

    async sendToWinner(game, winner, amount) {
        await this.send(game, winner.from, amount, {message: this.config.games[game].name + ": You Win!", type: this.WinnerType, hash: winner.hash});
    }

    getAddress(game){
        const wallet = minterWallet.walletFromMnemonic(process.env[`MNEMONIC_${game}`]);
        return wallet.getAddressString()
    }

    async send(game, address, amount, message) {

        const wallet = minterWallet.walletFromMnemonic(process.env[`MNEMONIC_${game}`]);
        console.log('WalletPk',wallet.getPrivateKey())
        const minterSDK = new minterTransactions.Minter({apiType: 'node', baseURL: this.network.apiUrl});
        const txParams = new minterTransactions.SendTxParams({
            privateKey: wallet.getPrivateKey(),
            chainId: this.network.chainId,
            address,
            amount,
            coinSymbol: this.network.symbol,
            gasPrice: 1,
            message: typeof message === "string" ? message : JSON.stringify(message),
        });
        //console.log('TxParams', txParams)
        try {
            return await minterSDK.postTx(txParams)
        } catch (error) {
            //const errorMessage = error.response.data ? error.response.data.error : error;
            console.error('ERROR', error.response.data.error);
        }
    };


}


module.exports = new MinterWallet()
