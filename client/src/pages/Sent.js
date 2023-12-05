import Header from "../components/Header";
import { Formik, Form, Field, FieldProps } from 'formik'
import axios from "axios";
import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useNavigate, Link } from 'react-router-dom'
import "../styles/Sent.css";

export default function Sent() {

    const [listOfMessages, getListOfMessages] = useState()
    const [prepareHTML, setprepareHTML] = useState([<></>])

    useEffect(() => {
        const hackerID = localStorage.getItem(localStorage.key("hackerID"));
        const url = "http://localhost:5001/messages/sent?sender=" + hackerID
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
                const url2 = "http://localhost:5001/hackers?id=" + listOfMessages[i].receiver
                axios.get(url2).then((response) => {
                    const receiver = response.data[0][0]
                    let url3 = "http://localhost:5001/pfp?hackerID=" + listOfMessages[i].receiver
                    axios.get(url3).then((response) => {
                        console.log(response)
                        htmlResponse.push(
                        <div className="sentBox">
                            <img className="sentImage" src={response.data}></img>
                            <div>
                                Time Sent: {listOfMessages[i].createdAt}
                            </div>
                            <div>
                                You sent the following message to <b>{receiver.fullName}</b>: <p className="messageText">{listOfMessages[i].message}</p>
                            </div>
                        </div>)
                    });
                });
            });
        }
        setprepareHTML(htmlResponse);
    }
    return (
        <>
            <Header />
            <br />
            <div className="incomingMessages">
                <h1>Sent Messages</h1>

                <div className="results">
                    {prepareHTML.map((value, key) => {
                        return (<>{value}</>)
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