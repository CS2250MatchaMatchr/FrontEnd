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
            <div className="container mt-5">
                <div className="box">
                    <h1>Inbox</h1>
                    <div className="containerD">
                        <div className="checkButton">
                            <Link to="../Incoming">Check Incoming Messages</Link>
                        </div>
                        <br></br>
                        <div className="sentButton">
                            <Link to="../Sent">Revist Messages Sent</Link>
                        </div>
                    </div>
                </div >
                <br></br>
                <br></br>
                <div style={{fontSize: "45px",textAlign: "center"}}>Second Thank You To Our Sponsors, We Really Appreciate It</div>
                <br></br>
                <br></br>
                <div className="body">
                    <img className="sponsors" src={sponsor} />
                </div>
            </div>
        </>
    )
}