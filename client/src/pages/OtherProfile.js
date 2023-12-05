import Header from "../components/Header";
import "../styles/profile.css";
import axios from "axios";
import React, { useEffect, useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'

export default function OtherProfile() {

    const [userJson, setUserJson] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [hackersLanguage, setHackersLanguage] = useState()
    const [languageList, setLanguageList] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [pfp, setPFP] = useState()



    useEffect(() => {
        const hackerID = searchParams.get("id");
        let url = "http://localhost:5001/hackers?id=" + hackerID
        axios.get(url).then(async (response) => {
            setUserJson(response.data[0][0])
        });

        let url2 = "http://localhost:5001/Technologies?hackerID=" + hackerID
        axios.get(url2).then(async (response) => {
            setHackersLanguage(response.data[0][0])
            let ihatemylife = []
            for (let term in hackersLanguage) {
                if (hackersLanguage[term] == 1) {
                    ihatemylife.push(term);
                    ihatemylife.push(", ")
                }
            }
            Promise.all(ihatemylife).then(function (values) {
                setRefresh(true)
                setLanguageList(values)
            });
        });

    }, [refresh]);

    useEffect(() => {
        const hackerID = searchParams.get("id");
        let url = "http://localhost:5001/pfp?hackerID=" + hackerID
        axios.get(url).then(async (response) => {
            setPFP(response.data)
        });
    }, [pfp]);

    const initialValues = {
        message: ""
    }

    const onSubmit = (data => {
        let hackerID = localStorage.getItem(localStorage.key("hackerID"));
        const newMessage = {
            sender: Number(hackerID),
            receiver: userJson.id,
            message: data.message
        }
        console.log(newMessage)
        axios.post("http://localhost:5001/messages", newMessage).then((response) => {
            console.log(response)
            alert("Message Sent!")
            window.location.reload(false);
        });

    });

    const validationSchema = Yup.object().shape({
        message: Yup.string()
    })


    return (
        <>
            <Header />
            <br />
            <div className="profileContainer">
                <h2 className="profileHead">Profile</h2>

                <div className="infoImage">
                    <img src={pfp} style={{ width: 300, height: 300 }} />
                </div>

                <div className="info">
                    <p>Email: {userJson.email}</p>
                    <p>Full Name: {userJson.fullName}</p>
                    <p>Class Standing: {userJson.classStanding}</p>
                    <p>Gender: {userJson.gender}</p>
                    <p>Front Or BackEnd: {userJson.frontOrBackEnd}</p>
                    <p>Github: <a href={userJson.github}>{userJson.github}</a></p>
                    <p>Linkedin: <a href={userJson.linkedIn}>{userJson.linkedIn}</a></p>
                    <p>Biography: {userJson.biography}</p>
                    <p>Languages: {languageList}</p>

                    

                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        <Form>
                            <div>
                                <label>Send a message to {userJson.fullName}!</label>
                                <Field className="send-form-control" name="message" />
                            </div>
                            <button type="submit" className="sendButton">Send</button>
                        </Form>
                    </Formik>
                    <br />
                    <Link to="/HackerSearch">Back to Hacker Search</Link>
                </div>

                <br></br>
                <br></br>
                <br />
            </div>
        </>
    )
}