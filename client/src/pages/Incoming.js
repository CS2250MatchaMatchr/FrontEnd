import Header from "../components/Header";
import { Formik, Form, Field, FieldProps } from 'formik'
import axios from "axios";
import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useNavigate, Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import "../styles/incomingMessage.css";

export default function Incoming() {

    const [listOfMessages, getListOfMessages] = useState()
    const [prepareHTML, setprepareHTML] = useState([<></>])
    const [goback, setGoback] = React.useState(false);

    useEffect(() => {
        const hackerID = localStorage.getItem(localStorage.key("hackerID"));
        const url = "http://localhost:5001/messages/received?receiver=" + hackerID
        axios.get(url).then(async (response) => {
            getListOfMessages(response.data[0])
        });


    }, [listOfMessages]);

    function onSubmit() {
        let htmlResponse = []
        for (let i in listOfMessages) {
            const url = "http://localhost:5001/hackers?id=" + listOfMessages[i].sender
            axios.get(url).then((response) => {
                const sender = response.data[0][0]
                let url2 = "http://localhost:5001/pfp?hackerID=" + listOfMessages[i].sender
                axios.get(url2).then((response) => {
                    console.log(response)
                    htmlResponse.push(
                        <div className="sentBox">
                            <img className="sentImage" src={response.data} style={{ maxWidth: '70px', height: 'auto' }}></img>
                            <div>
                                Time Sent: {listOfMessages[i].createdAt}
                            </div>

                            <div>
                                <b>{sender.fullName}</b> sent You A Message: <br /><p className="messageText">{listOfMessages[i].message}</p>
                            </div>

                        </div>)
                });
            });
        }
        setprepareHTML(htmlResponse);
    }

    if (goback === true) {
        return <Navigate to="/Inbox" />;
    }
    return (
        <>
            <Header />
            <br />
            <div className="incomingMessages">
                <h1>Incoming Messages</h1>

                <div className="results">
                    {prepareHTML.map((value, key) => {
                        return <React.Fragment key={key}>{value}</React.Fragment>;
                    })}
                </div>

                <button className="loadButton" onClick={onSubmit}>Load Data</button>
                <br />
                <div className="backLink">
                    <Link to="/Inbox" >Back</Link>
                </div>


            </div>
        </>
    )
}