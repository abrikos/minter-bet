const m = require('./MinterTransactions');
const MinterTransactions = m.default;

class FillerTransactions {
    constructor() {
        this.config = MinterTransactions.config.games.filler;
        this.config.coin = MinterTransactions.config[MinterTransactions.config.net].symbol;

    }

    async init() {
        this.tranasctions = await MinterTransactions.loadTtransactions(this.config.address);
    }


}

export default new FillerTransactions()