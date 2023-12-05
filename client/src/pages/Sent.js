import Header from "../components/Header";
import { Formik, Form, Field, FieldProps } from 'formik'
import axios from "axios";
import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useNavigate, Link } from 'react-router-dom'
import "../styles/HackerSearch.css";

export default function Sent() {

    const [listOfMessages,getListOfMessages] = useState()
    const [prepareHTML,setprepareHTML] = useState([<></>])

    useEffect(() => {
        const hackerID = localStorage.getItem(localStorage.key("hackerID"));
        const url = "http://localhost:5001/messages/sent?sender=" + hackerID
        axios.get(url).then(async (response) => {
            getListOfMessages(response.data[0])
        });

        
    },[listOfMessages]);

    function onSubmit(){
        let htmlResponse = []
        for (let i in listOfMessages){
            const url = "http://localhost:5001/hackers?id=" + listOfMessages[i].sender
            axios.get(url).then((response) => {
                const sender = response.data[0][0]
                htmlResponse.push(<div>
                                    <div>Time Sent: {listOfMessages[i].createdAt}</div>
                                    <div>You sent the following message to <b>{sender.fullName}</b>: {listOfMessages[i].message}</div>
                                    <br></br>
                                    <br></br>
                                  </div>)
            });
        }
        setprepareHTML(htmlResponse);
    }
    return(
        <>
            <Header></Header>
            <h1>Incoming Messages</h1>
            <button onClick={onSubmit}>Load Data</button>
            <Link to="/Inbox" >Back</Link>
            <div className="results">
                {prepareHTML.map((value, key) => {
                    return (<>{value}</>)
                })}
            </div>
        </>
    )
}