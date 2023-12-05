import Header from "../components/Header";
import { Formik, Form, Field, FieldProps } from 'formik'
import axios from "axios";
import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useNavigate, Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import "../styles/HackerSearch.css";
import "../styles/incomingMessage.css";

export default function Incoming() {

    const [listOfMessages,getListOfMessages] = useState()
    const [prepareHTML,setprepareHTML] = useState([<></>])
    const [goback, setGoback] = React.useState(false);

    useEffect(() => {
        const hackerID = localStorage.getItem(localStorage.key("hackerID"));
        const url = "http://localhost:5001/messages/received?receiver=" + hackerID
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
                let url2 = "http://localhost:5001/pfp?hackerID=" + listOfMessages[i].sender
                    axios.get(url2).then((response) => {
                        console.log(response)
                        htmlResponse.push(<div>
                            <div style={{ border: '1px solid #ccc', padding: '5px', marginBottom: '15px', marginRight: '15px', borderRadius:'20px' }}>Time Sent: {listOfMessages[i].createdAt}
                                <div><b>{sender.fullName}</b> sent You A Message: <br/><div className="message">{listOfMessages[i].message}</div></div>
                                <br></br>
                                <img src={response.data} style={{ maxWidth: '70px', height: 'auto'}}></img>
                                <br></br>
                                <br></br>
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
    return(
        <>
            <Header />
            <br />
            <div className="profile">
                <h1>Incoming Messages</h1>
                <div className="editButton">
                    <button onClick={onSubmit}>Load Data</button>
                </div>
                <br />
                <div classname="backButton">
                    <button onClick={() => { setGoback(true); }}>Go Back</button>
                </div>
                <div className="results">
                    {prepareHTML.map((value, key) => {
                        return <React.Fragment key={key}>{value}</React.Fragment>;
                    })}
                </div>
            </div>
        </>
    )
}