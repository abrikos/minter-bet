//require = require("esm")(module)
//const Minter = require('./minter-app');
//const m  = require( '../client/lib/MinterCore');
//const Minter = m.default
//const l  = require( '../client/lib/Lottery');
//const pb  = require( '../client/lib/PriceBet');
const LotteryWallet = require('./LotteryWallet');
const FillerWallet = require('./FillerWallet');
const argv = require('minimist')(process.argv.slice(2));
const moment = require('moment');

console.log('====================================== ',moment().format('YYYY-MM-DD HH:mm'),' ====================================================');
console.log('====================================== ',argv,' ====================================================');
init(argv);


async function init(argv) {
    await LotteryWallet.init();
    await FillerWallet.init();
    if (argv.day) {
        LotteryWallet.dailyWinner();
    } else if (argv.minute) {
        LotteryWallet.sendPromoCode();

    } else if (argv.minute5) {
        LotteryWallet.payForPromo();

    } else if (argv.hour) {

    } else if (argv.test) {
        FillerWallet.test();
        //LotteryWallet.test();
        //PriceBet.test();
    }

}



