import { Link, useNavigate } from 'react-router-dom'
import { Container , } from 'react-bootstrap'
import axios from "axios";
import React, {useEffect,useState} from 'react'

export default function TeamManagement() {

    //Creating all the variables

    const [teamData, setTeamData] = useState([])

    //Fetching all the variables from the DB
    useEffect(() => {
        const hackerID = localStorage.getItem(localStorage.key("hackerID"));
        let url = "http://localhost:5001/teams/fromUserID?ID=" + hackerID
        let urmom = []
        axios.get(url).then(async (response) => {
            /*Array Index Meaning 
              0: teamName
              1: owner
              2: member1
              3: member2
              4: member3
              5: passcode
              */
            
            let teamName = response.data[0].teamName;
            let owner = await axios.get("http://localhost:5001/hackers/fullNameFromID?id=" + response.data[0].owner)
            let member1 = await axios.get("http://localhost:5001/hackers/fullNameFromID?id=" + response.data[0].member1)
            let member2 = await axios.get("http://localhost:5001/hackers/fullNameFromID?id=" + response.data[0].member2)
            let member3 = await axios.get("http://localhost:5001/hackers/fullNameFromID?id=" + response.data[0].member3)
            let passcode = response.data[0].passcode;

            try{
                owner = owner.data[0][0].email; 
            } catch {
                owner = "None"
            }

            try{
                member1 = member1.data[0][0].email; 
            } catch {
                member1 = "None"
            }

            try{
                member2 = member2.data[0][0].email; 
            } catch {
                member2 = "None"
            }

            try{
                member3 = member3.data[0][0].email; 
            } catch {
                member3 = "None"
            }

            urmom = [teamName,owner,member1,member2,member3,passcode]
            setTeamData(urmom);

        });
    }, []);


    return(
        <>
            <h1>Home Page For Team: {teamData[0]}</h1>
            <div>Owner: {teamData[1]}</div>
            <div>Teammate 1: {teamData[2]}</div>
            <div>Teammate 2: {teamData[3]}</div>
            <div>Teammate 3: {teamData[4]}</div>
            <div>Invite Code: {teamData[5]}</div>
        </>
    )
}