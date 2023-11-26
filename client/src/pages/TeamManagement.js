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
        axios.get(url).then((response) => {
            //Array Index Meaning 0: teamName
            /*1: userName
              2: userRole
              3: member1Name
              4: member1Role
              5: member2Name
              6: member2Role
              7: member3Name
              8: member3Role
              */

            let urmom = [response.data[0].teamName,
            ]

            Promise.all(urmom).then((values) => {
                console.log(values)
                setTeamData(values[0])
                console.log(teamData)
            });

        });
    }, []);


    return(
        <>
            {/*<h1>Home Page For Team: {teamData.teamName}</h1>
            <div>You're Role in team: {teamData.userRole}</div>
            <div>Teammate 1: {teamData.member1} - {teamData.member1role}</div>
            <div>Teammate 2: {teamData.member2} - {teamData.member2role}</div>
            <div>Teammate 3: {teamData.member3} - {teamData.member3role}</div>*/}
        </>
    )
}