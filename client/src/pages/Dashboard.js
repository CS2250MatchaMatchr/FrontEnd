import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import "../styles/dashboard.css";
import sponsor from "../images/sponsor.png"
import { ref } from 'yup';

export default function Dashboard() {
    const [userJson,setUserJson] = useState([]);
    const [teamOr, setTeamOr] = useState()
    const [teamJson, setTeamJson] = useState({
        teamName: ""
    })
    const [teamHook, setTeamHook] = useState()
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        const hackerID = localStorage.getItem(localStorage.key("hackerID"));
        let url = "http://localhost:5001/hackers?id=" + hackerID
        let url3 = "http://localhost:5001/teams/fromUserID?ID=" + hackerID
        let promise3 = axios.get(url3).then((response) => {
            setTeamJson(response.data[0]);
        })
        let promise1 = axios.get(url).then(async (response) => {
            const data = await response.data[0][0]
            setUserJson(data)
    
        });
        let url2 = "http://localhost:5001/teams/checkAlreadyInTeam?hackerID=" + hackerID
        let promise2 = axios.get(url2).then(async (response) => {
            const data = await response.data[0]
            console.log(data)
            setTeamOr(data)
        })

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

        if (teamOr === "NOT YET IN TEAM"){
            setTeamHook(<div class="column">
             <h1>Join a Team You bitch ass loser</h1>
            </div>)
        }
        else{
            setTeamHook(
                <div class="column">
                  <h2>Team: {teamJson.teamName}</h2>
                </div>
              );
            }
        return () => clearInterval(interval);
        
    },[teamJson,teamOr]);

    const [countdown,setCountdown] = useState('');

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
                    <p>linkedin: {userJson.linkedIn}</p>
                    <p>biography: {userJson.biography}</p>
                </div>
                {teamHook}
                <div class="column">
                    <h2>Countdown</h2>
                    <p>There are</p>
                    <h1>{countdown}</h1>
                    <p>until the hackaton.</p>
                </div>
            </div>
            <div className="body">
                <img className="sponsors" src={sponsor} />
            </div>
        </>
    )
}