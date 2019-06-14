import React from "react";
import Address from "client/Address";

export default function (data) {
    return <div>
        <ul className={'big-line-spacing'}>
            <li>
                <h1> Send <strong className={'big2'}> {data.price} </strong> {data.coin} to: </ h1>
                <Address text={data.address}/>
                {data.parentCode &&
                <li> And in the <strong> "Message" </strong> field, enter my promotional code: <strong className={'big2 red'}> {data.parentCode} </strong></ li>}
            </ li>
        </ ul>
    </div>

}