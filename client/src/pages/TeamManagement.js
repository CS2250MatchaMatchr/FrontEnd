import { Link, useNavigate } from 'react-router-dom'
import { Container, } from 'react-bootstrap'
import axios from "axios";
import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import "../styles/TeamManagement.css";


export default function TeamManagement() {

    //Creating all the variables
    const navigate = useNavigate();
    const [teamData, setTeamData] = useState([])
    const [teamID, setTeamID] = useState()
    const [isOwner1, setIsOwner1] = useState()
    const [isOwner2, setIsOwner2] = useState()
    const [isOwner3, setIsOwner3] = useState()
    const [theButton, setTheButton] = useState(<button className="leaveButton" type="button" onClick={leaveTeam}>Leave Team</button>)
    const hackerID = localStorage.getItem(localStorage.key("hackerID"));

    //Fetching all the variables from the DB
    useEffect(() => {
        const hackerID = localStorage.getItem(localStorage.key("hackerID"));
        let url = "http://localhost:5001/teams/fromUserID?ID=" + hackerID;
        let urmom = [];
        console.log(url);
        axios.get(url).then(async (response) => {
            console.log(response);
            /*Array Index Meaning 
              0: teamName
              1: owner
              2: member1
              3: member2
              4: member3
              5: passcode
              */
            setTeamID(response.data[0].id)
            let teamName = response.data[0].teamName;
            let owner = await axios.get("http://localhost:5001/hackers/fullNameFromID?id=" + response.data[0].owner)
            let member1 = await axios.get("http://localhost:5001/hackers/fullNameFromID?id=" + response.data[0].member1)
            let member2 = await axios.get("http://localhost:5001/hackers/fullNameFromID?id=" + response.data[0].member2)
            let member3 = await axios.get("http://localhost:5001/hackers/fullNameFromID?id=" + response.data[0].member3)
            let passcode = response.data[0].passcode;

            let [ownerID, member1ID, member2ID, member3ID] = "noid"
            try {
                owner = owner.data[0][0].fullName;
                ownerID = response.data[0].owner
            } catch {
                owner = "None"
            }

            try {
                member1 = member1.data[0][0].fullName;
                member1ID = response.data[0].member1
            } catch {
                member1 = "None"
            }

            try {
                member2 = member2.data[0][0].fullName;
                member2ID = response.data[0].member2
            } catch {
                member2 = "None"
            }

            try {
                member3 = member3.data[0][0].fullName;
                member3ID = response.data[0].member3
            }  catch {
                member3 = "None"
            }
            

            urmom = [teamName, owner, member1, member2, member3, passcode, ownerID, member1ID, member2ID, member3ID]
            setTeamData(urmom);
            
            if (ownerID==Number(hackerID)){
                setIsOwner1(<><button className= "removeButton" type="button" onClick={removeMember}>Remove Member</button><button className= "manButton" type="button" onClick={ ()=> {makeOwner(teamData[7], teamData[6], "member1")} }>Make Owner</button></>);
                setIsOwner2(<><button className= "removeButton" type="button" onClick={removeMember}>Remove Member</button><button className= "manButton" type="button" onClick={ ()=> {makeOwner(teamData[8], teamData[6], "member2")} }>Make Owner</button></>);
                setIsOwner3(<><button className= "removeButton" type="button" onClick={removeMember}>Remove Member</button><button className= "manButton" type="button" onClick={ ()=> {makeOwner(teamData[9], teamData[6], "member3")} }>Make Owner</button></>);
                setTheButton(<button className="deleteButton" button="type" onclick={deleteTeam}>Delete Team</button>)
            }
            if (member1ID == "None"){
                setIsOwner1()
            }
            if (member2ID == "None"){
                setIsOwner2()
            }
            if (member3ID == "None"){
                setIsOwner3()
            }
            

            console.log([ownerID,hackerID])
            if (ownerID==Number(hackerID)){
                setIsOwner1(<><button className= "removeButton" type="button" onClick={removeMember}>Remove Member</button><button className= "manButton" type="button" onClick={ ()=> {makeOwner(teamData[7], teamData[6], "member1")} }>Make Owner</button><button className= "manButton" type="button" onClick={() => { viewProfile(teamData[7]) }}>View Profile</button></>);
                setIsOwner2(<><button className= "removeButton" type="button" onClick={removeMember}>Remove Member</button><button className= "manButton" type="button" onClick={ ()=> {makeOwner(teamData[8], teamData[6], "member2")} }>Make Owner</button><button className= "manButton" type="button" onClick={() => { viewProfile(teamData[7]) }}>View Profile</button></>);
                setIsOwner3(<><button className= "removeButton" type="button" onClick={removeMember}>Remove Member</button><button className= "manButton" type="button" onClick={ ()=> {makeOwner(teamData[9], teamData[6], "member3")} }>Make Owner</button><button className= "manButton" type="button" onClick={() => { viewProfile(teamData[7]) }}>View Profile</button></>);
            }
            if (member1ID == "None"){
                setIsOwner1()
            }
            if (member2ID == "None"){
                setIsOwner2()
            }
            if (member3ID == "None"){
                setIsOwner3()
            }
            

            urmom = [teamName, owner, member1, member2, member3, passcode, ownerID, member1ID, member2ID, member3ID];
            console.log(urmom);
            console.log("RAHHH");
            setTeamData(urmom);
            console.log(teamData);

        });
    }, []);
    
    function removeMember(memberID, ownerID, teamName) {
        console.log("removeMember");
        console.log(hackerID);
        console.log(ownerID);
        console.log(memberID);
        // if a person who isnt an owner 
        if (hackerID != ownerID) {
            alert("You are not the owner of this team. Come back when you have attained such power.");
        } 
        // if they try to click on a remove member button when that member doesnt fuckin exist
        else if (memberID == 'n' || memberID == 'o' || memberID == 'i' || memberID == 'd') {
            alert("There's no member here, you moron.");
        } 
        //actually doing the removing
        else {
            const info = {
                memberToRemove: memberID,
                teamName: teamName
            }
            axios.put("http://localhost:5001/teams/removeTeamMember", info)
                .then(res => {
                    alert("You have removed this member!")
                })
        }
    }
    function makeOwner(memberID, ownerID, memberNumber) {
        if (hackerID != ownerID) {
            alert("What yo bitch ass think you doing you not the owner you dont run shit for this team");
        }
        else {
            const id = {
                memberID: memberID,
                ownerID: ownerID,
                teamID: teamID,
                memberNumber: memberNumber
            }
            
            axios.put("http://localhost:5001/teams/switchOwnerAndMember", id).then((response) => {
                alert("Ownership changed");
            }).catch ((error) => {
                console.log(error);
            });
        }
    }

    function viewProfile(hackerID) {
        navigate("/TeammateProfile?id=" + hackerID)
    }

    function leaveTeam(ownerID) {
        console.log("leaveTeam");
    }

    function deleteTeam(ownerID) {
        console.log("deleteTeam");
    }

    return (
        <>
            <Header />
            <br />
            <div className='teamManage'>
                <h1>Home Page For Team: {teamData[0]}</h1>
                <div>Owner: {teamData[1]} <button className= "manButton" type="button" onClick={() => { viewProfile(teamData[6]) }}>View Profile</button></div>
                <div>Teammate 1: {teamData[2]}<button className= "removeButton" type="button" onClick={() => {removeMember(teamData[7], teamData[6], teamData[0])}}>Remove Member</button><button className= "manButton" type="button" onClick={makeOwner}>Make Owner</button><button className= "manButton" type="button" onClick={() => { viewProfile(teamData[7]) }}>View Profile</button></div>
                <div>Teammate 2: {teamData[3]}<button className= "removeButton" type="button" onClick={() => {removeMember(teamData[8], teamData[6], teamData[0])}}>Remove Member</button><button className= "manButton" type="button" onClick={makeOwner}>Make Owner</button><button className= "manButton" type="button" onClick={() => { viewProfile(teamData[8]) }}>View Profile</button></div>
                <div>Teammate 3: {teamData[4]}<button className= "removeButton" type="button" onClick={() => {removeMember(teamData[9], teamData[6], teamData[0])}}>Remove Member</button><button className= "manButton" type="button" onClick={() => { makeOwner(teamData[7], teamData[6], "member3") }}>Make Owner</button><button className= "manButton" type="button" onClick={() => { viewProfile(teamData[9]) }}>View Profile</button></div>
                <br />
                <div className='inviteCode'>Invite Code: {teamData[5]}</div>
                <br></br>
                <button className= "leaveButton" type="button" onClick={leaveTeam}>Leave Team</button><button className= "deleteButton" button="type" onClick={deleteTeam}>Delete Team</button>
                <br />
                <div className='backLink'>
                    <Link to="/Teams">Back</Link>
                </div>
            </div>
        </>
    )
}