import Header from "../components/Header";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

export default function Inbox() {
    return(
        <>
            <Header></Header>
            <Link to="../Incoming">Check Incoming Messages</Link>
            <br></br>
            <Link to="../Sent">Revist Messages Sent</Link>
        </>
    )
}