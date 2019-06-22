const m = require('./MinterTransactions');
const MinterTransactions = m.default;
const  LZUTF8 = require('lzutf8');

class FillerTransactions {
    types={
        turn:'turn',
        start:'start',
        accept:'accept',
    }
    constructor() {
        this.config = MinterTransactions.config.games.filler;
        this.config.coin = MinterTransactions.config[MinterTransactions.config.net].symbol;

    }

    async init() {
        this.tranasctions = await MinterTransactions.loadTtransactions(this.config.address);
    }

    async compressMessage(message){
        const input = Buffer.from(JSON.stringify(message), 'base64');
        const x = LZUTF8.compress(JSON.stringify(message),{outputEncoding:'Base64'})
        console.log(input.toString('Base64'))
        return 'zlib.deflate(input)'
    }

}

export default new FillerTransactions()