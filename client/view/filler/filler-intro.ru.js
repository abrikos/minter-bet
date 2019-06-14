import React from "react";
import Address from "client/Address";

export default function (data) {
    return <div>
        <ul className={'big-line-spacing'}>
            <li>Отправьте минимум <strong className={'big2'}> {data.bet} </strong> {data.coin} на: <Address text={data.address}/></li>
            <li>Скопируйте номер транзакции (TXID)</li>
            <li>Введите его в форму ниже и получите ссылку-приглашение на игру.</li>
            <li>Отправляйте ссылку-приглашение на игру тем, с кем хотите играть.</li>
            <li>Пройдите по этой ссылке и ждите пока кто.</li>
        </ ul>
    </div>

}