import React from "react";
import {Link} from "react-router-dom";

export default function (data) {
    return <div>
        <ul className = {'big-line-spacing'}>
            <li> Choose a pair for which price you want to bet </ li>
            <li> Choose a comparison method </ li>
            <li> Select the price you want to compare with </ li>
            <li> Select the date on which, in your opinion, the price of the pair will be (Price is fixed at 00:00 of the specified UTC date) </ li>

            <li> There will be data to fill in the fields in your wallet: "Address" and "Message" </ li>
            <li> Copy and paste them into your wallet </ li>

            <li> In the wallet, select the coin <strong className = {'red'}> {data.coin} </ strong> </ li>
            <li> In the wallet, select the desired bet amount (any) </ li>
            <li> Submit transaction </ li>
            <li> Find your bid in the <Link to = {'/ price-bet / active'}> active bid list </ Link> (the first 10 characters of the address from which the bet was made are indicated) </ li>
            <li> Copy and share the link with those who want to accept your bid </ li>
            <li> At midnight (UTC) of the date you selected, the price of the pair will be fixed and the winners selected </ li>
            <li> The bank ({data.percent * 100}% of all bets) will be divided into shares in proportion to the bets made by the winners </ li>
            <li> Your bid will automatically go to the "For" list </ li>
            <li> To all winners, the addresses from which the bets were made will be sent to the shares according to the bets made </ li>
        </ ul>

    </ div>
}