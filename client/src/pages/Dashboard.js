import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import "../styles/dashboard.css";

export default function Dashboard() {
    const [userJson,setUserJson] = useState([]);

    useEffect(() => {
        const hackerID = localStorage.getItem(localStorage.key("hackerID"));
        console.log(hackerID)
        let url = "http://localhost:5001/hackers?id=" + hackerID
        axios.get(url).then(async (response) => {
            console.log(response);
            setUserJson(response.data[0][0])
            console.log(userJson)
        });
    },[]);

    const [countdown,setCountdown] = useState('');


    useEffect(() => {
        const countDownDate = new Date("Feb 29, 2024 00:00:00").getTime();

        const interval = setInterval(function() {
            const now = new Date().getTime();

            const distance = countDownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const countdownString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            setCountdown(countdownString);

            if(distance < 0) {
                clearInterval(interval);
                setCountdown("NOW");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <Header />
            <br />
            <div class="containerD">
                <div class="column">
                    <h2>Profile</h2>
                    <p>FullName: {userJson.fullName}</p>
                    <p>classStanding: {userJson.classStanding}</p>
                    <p>gender: {userJson.gender}</p>
                    <p>frontOrBackEnd: {userJson.frontOrBackEnd}</p>
                    <p>github: {userJson.github}</p>
                    <p>linkedin: {userJson.linkedin}</p>
                    <p>biography: {userJson.biography}</p>
                </div>
                <div class="column">
                    <h2>Team</h2>
                    <h3>Team name</h3>
                    <p>Team member 1</p>
                    <p>Team member 2</p>
                    <p>Team member 3</p>
                    <p>Team member 4</p>
                </div>
                <div class="column">
                    <h2>Countdown</h2>
                    <p>There are</p>
                    <h1>{countdown}</h1>
                    <p>days until the hackaton.</p>
                </div>
            </div>
        </>
    )
}