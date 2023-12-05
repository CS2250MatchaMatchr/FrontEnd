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
    const [countdown,setCountdown] = useState('');
    useEffect(() => {
        const hackerID = localStorage.getItem(localStorage.key("hackerID"));
        let url = "http://localhost:5001/hackers?id=" + hackerID
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
        
        let url3 = "http://localhost:5001/teams/fromUserID?ID=" + hackerID
        let promise3 = axios.get(url3).then((response) => {
            setTeamJson(response.data[0]);
        })

        if (teamJson == "NOT YET IN TEAM" || teamJson == undefined){
            setTeamHook(<div class="column">
            <h1>Join a Team Loser You Can't Win This Alone!</h1>
            </div>)
        } 
        else{
            setTeamHook(
                    <h2 className='teamHead'>Team: {teamJson.teamName}</h2>
                ); 
        }
        
    },[teamJson,teamOr]);

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
    },[])
    return (
        <>
            <Header />
            <br />
            <div class="containerD">
                <div class="column">
                    <h2>Profile</h2>
                    <p>Full Name: {userJson.fullName}</p>
                    <p>Class Standing: {userJson.classStanding}</p>
                    <p>Gender: {userJson.gender}</p>
                    <p>Front Or BackEnd: {userJson.frontOrBackEnd}</p>
                    <p>Github: <a href={userJson.github}>{userJson.github}</a></p>
                    <p>Linkedin:<a href={userJson.linkedIn}>{userJson.linkedIn}</a></p>
                    <p>Biography: {userJson.biography}</p>
                </div>
                <div class="teamHook">
                    {teamHook}
                </div>
                <div class="column">
                    <h2>Countdown</h2>
                    <p>There are</p>
                    <h1>{countdown}</h1>
                    <p>until the hackaton.</p>
                </div>
            </div>
            <div style={{fontSize: "45px",textAlign: "center"}}>Thank You To Our Sponsors</div>
            <br></br>
            <br></br>
            <div className="body">
                <img className="sponsors" src={sponsor} />
            </div>
        </>
    )
}