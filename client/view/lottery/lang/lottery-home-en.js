import React from "react";
import Address from "../../../Address";

export default function (data) {
    return <div><ul className = {'big-line-spacing'}>
        <li>
            <h1> Send <strong className = {'big2'}> {data.price} </strong> {data.coin} to: </ h1>
            <Address text={data.address}/>
            {data.parentCode &&
            <li> And in the <strong> "Message" </strong> field, enter my promotional code: <strong className = {'big2 red'}> {data.parentCode} </strong> </ li>}
        </ li>
        <li>
            You still ask me a question: <strong className = {'big2'}> "Why?" </strong>
        </ li>

        <li>
            And then, <strong className = {'big2'}> so that </strong> I, with all due respect, provide you
            the ability to <strong className = {'big2'}> get&nbsp;{data.coin}s </strong> more, and
            good day and much <strong className = {'big2'}> more. </strong>
        </ li>

        <li>
            I’m surprised if you don’t ask again: "<strong className = {'big2'}> Why </strong> are so luxurious
            gifts <strong className = {'big2'}>? </strong> "
        </ li>

        <li>
            With all the pleasure of my heart I will answer this question: "I am in full confidence
            that you will be invited (be sure <strong className = {'big2'}> for </strong> good things about
            this <a href="#rules"> below </a>) in
            our fun
            The campaign has several new, not freeloaders, but <strong className = {'big2'}> partners! </strong>
        </ li>

        <li>
            And (so that Babylonian confusion does not arise among us who comes from whose uncle and how much to fill)
            personally to you, to the address of your wallet personally will be sent
            personally your unique promo code. With the help of which you will be able to replenish our ranks of lovers of gesheft.
        </ li>

        <li>
            I am completely absorbed in the confidence that you are a person who understands and already have the goal to ask: <strong className = {'big2'}>Is it
            pyramid? </strong>
            And I, honestly, will answer you honestly: <strong className = {'big2'}> Yes!
            But ... </strong>
            But not only! <strong className = {'big2'}>This is also a lottery! </strong>
        </ li>

        <li>
            Each, elusive neither by sight, nor hearing, is the moment when they begin yesterday and tomorrow, or else
            saying <strong className = {'big2'}> Daily </strong> will be configured and sent <strong
            className = {'big2'}> prize </strong> to one of the fortunate lucky people of a lived day who decided to give
            yourself in the hands of Fortune.
            And to become the darling of daily destiny and get <strong
            className = {'big2'}> {data.percentDaily * 100}% of the daily bank </strong> promotional codes will help you, and this is also a good thing, about which more <a
            href = "# rules"> below </a>.
        </ li>
    </ ul>


        <a id={'rules'}>
            <h4> All that is <span className = {'red'}> below </ span> can be called "Lottery Terms and Conditions" </ h4>
        </a></div>
}