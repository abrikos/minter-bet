import React from "react";

export default function (data) {
    return <div>
        <ul className = {'big-line-spacing'}>
            <li> Decide to put "For" or "Against" </ li>
            <li> At the bottom of the selected column
                <ul>
                    <li> copy "Address" </ li>
                    <li> Insert it in the appropriate field of your wallet </ li>
                    <li> copy the "Message" </ li>
                    <li> Insert it in the appropriate field of your wallet </ li>
                </ ul>
            </ li>
            <li> In the wallet, select the coin <strong className = {'red'}> {data.coin} </ strong> </ li>
            <li> In the wallet, enter the amount you want to wager (more bet - more win: the bank is divided between all winners in proportion to the bets made) </ li>
            <li> Submit transaction </ li>
            <li> At midnight (UTC), the date indicated in the bet will be fixed on the price of the pair and the winners selected </ li>
            <li> The bank ({data.percent * 100}% of all bets) will be divided into shares in proportion to the bets made by the winners </ li>
            <li> To all winners, the addresses from which the bets were made will be sent to the shares according to the bets made </ li>
        </ ul>

    </ div>
}