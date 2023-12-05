import Header from "../components/Header";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../styles/inbox.css";
import sponsor from "../images/sponsor.png"

export default function Inbox() {
    return (
        <>
            <Header></Header>
                <div className="box">
                    <div className="inboxBox">
                         <h1 className="inboxHead">Inbox</h1>
                    <div className="inboxButtonContainer">
                        <div className="checkButton">
                            <Link to="../Incoming">Check Incoming Messages</Link>
                        </div>
                        <div className="sentButton">
                            <Link to="../Sent">Revist Messages Sent</Link>
                        </div>
                    </div>
                    </div>
                   
                <br></br>
                <br></br>
                <h1 className="tySponsors">Second Thank You To Our Sponsors, We Really Appreciate It</h1>
                <br></br>
                <br></br>
                <div className="body">
                    <img className="sponsors" src={sponsor} />
                </div>
            </div>
        </>
    )
}