import { Link, useNavigate } from 'react-router-dom'
import { Container, } from 'react-bootstrap'
import axios from "axios";
import React, { useEffect, useState, useRef } from 'react'
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
    const [isNone1,setIsNone1] = useState()
    const [isNone2,setIsNone2] = useState()
    const [isNone3,setIsNone3] = useState()
    const [theButton, setTheButton] = useState()
    const hackerID = localStorage.getItem(localStorage.key("hackerID"))

    let teamIDv2 = useRef(0);
    let a = useRef(0);
    let b = useRef(0);
    let c = useRef(0);

    //Fetching all the variables from the DB
    useEffect(() => {
        let url = "http://localhost:5001/teams/fromUserID?ID=" + hackerID;
        let urmom = [];
        axios.get(url).then(async (response) => {
            /*Array Index Meaning 
              0: teamName
              1: owner
              2: member1
              3: member2
              4: member3
              5: passcode
              */
            try{
                setTeamID(response.data[0].id)
                let teamName = response.data[0].teamName;
                let owner = await axios.get("http://localhost:5001/hackers/fullNameFromID?id=" + response.data[0].owner)
                let member1 = await axios.get("http://localhost:5001/hackers/fullNameFromID?id=" + response.data[0].member1)
                let member2 = await axios.get("http://localhost:5001/hackers/fullNameFromID?id=" + response.data[0].member2)
                let member3 = await axios.get("http://localhost:5001/hackers/fullNameFromID?id=" + response.data[0].member3)
                let passcode = response.data[0].passcode;

                let ownerID, member1ID, member2ID, member3ID = "None"
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
                setTheButton(<button className="leaveButton" type="button" onClick={() => {leaveTeam(hackerID,teamData[0])}}>Leave Team</button>)
                if (ownerID==Number(hackerID)){
                    setIsOwner1(<><button className= "removeButton" type="button" onClick={() => {removeMember(teamData[7],teamData[6],teamData[0])}}>Remove Member</button><button className= "manButton" type="button" onClick={ ()=> {makeOwner(teamData[7], teamData[6], "member1")} }>Make Owner</button></>);
                    setIsOwner2(<><button className= "removeButton" type="button" onClick={() => {removeMember(teamData[8],teamData[6],teamData[0])}}>Remove Member</button><button className= "manButton" type="button" onClick={ ()=> {makeOwner(teamData[8], teamData[6], "member2")} }>Make Owner</button></>);
                    setIsOwner3(<><button className= "removeButton" type="button" onClick={() => {removeMember(teamData[9],teamData[6],teamData[0])}}>Remove Member</button><button className= "manButton" type="button" onClick={ ()=> {makeOwner(teamData[9], teamData[6], "member3")} }>Make Owner</button></>);
                    setTheButton(<button className="deleteButton" button="type" onClick={() =>{deleteTeam(hackerID,teamData[6],teamData[7], teamData[0])}}>Delete Team</button>)
                }
                console.log(member3ID)
                if (member1ID == undefined || member1ID == "None"){
                    setIsOwner1()
                    setIsOwner2()
                    setIsOwner3()
                    setIsNone1()
                    setIsNone2()
                    setIsNone3()
                }
                else if (member2ID == undefined || member2ID == "None"){
                    setIsOwner2()
                    setIsOwner3()
                    setIsNone1(<button className= "manButton" type="button" onClick={() => { viewProfile(teamData[7]) }}>View Profile</button>)
                    setIsNone2()
                    setIsNone3()
                }
                else if (member3ID == undefined || member3ID == "None"){
                    setIsOwner3()
                    setIsNone1(<button className= "manButton" type="button" onClick={() => { viewProfile(teamData[7]) }}>View Profile</button>)
                    setIsNone2(<button className= "manButton" type="button" onClick={() => { viewProfile(teamData[8]) }}>View Profile</button>)
                    setIsNone3()
                }
                else{
                    setIsNone1(<button className= "manButton" type="button" onClick={() => { viewProfile(teamData[7]) }}>View Profile</button>)
                    setIsNone2(<button className= "manButton" type="button" onClick={() => { viewProfile(teamData[8]) }}>View Profile</button>)
                    setIsNone3(<button className= "manButton" type="button" onClick={() => { viewProfile(teamData[9]) }}>View Profile</button>)
                }
                
    
                urmom = [teamName, owner, member1, member2, member3, passcode, ownerID, member1ID, member2ID, member3ID];
                setTeamData(urmom)
                console.log("Data Set :)")
                }
            catch{
                console.log("Will Catch in Next Run Through")
            }

        });
    }, [teamData]);
    
    function removeMember(memberID, ownerID, teamName) {
        console.log(memberID + " " + ownerID + " " + teamName);
        a.current = memberID;
        b.current = ownerID;
        c.current = teamName;
        // if a person who isnt an owner 
        if (hackerID != ownerID) {
            alert("You are not the owner of this team. Come back when you have attained such power.");
        } 
        // if they try to click on a remove member button when that member doesnt fuckin exist
        else if (memberID == 'none' || memberID == 'none' || memberID == 'none' || memberID == 'none') {
            alert("There's no member here, you moron.");
        } 
        //actually doing the removing
        else {
            const info = {
                memberToRemove: a.current,
                teamName: c.current
            }
            console.log(a.current + " " + c.current);
            console.log(info);
            axios.put("http://localhost:5001/teams/removeTeamMember", info)
                .then(res => {
                    alert("You have removed this member!")
                    window.location.reload(false);
                })
        }
    }
    function makeOwner(memberID, ownerID, memberNumber) {
        if (Number(hackerID) != Number(ownerID)) {
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
                window.location.reload(false);
            }).catch ((error) => {
                console.log(error);
            });
        }
    }

    function viewProfile(hackerID) {
        navigate("/TeammateProfile?id=" + hackerID)
    }

    function leaveTeam(memberID, teamName) {
        const info = {
            memberToRemove: memberID,
            teamName: teamName
        }
        axios.put("http://localhost:5001/teams/removeTeamMember", info)
            .then(res => {
                alert("Bye Bye Bitch")
                setTimeout(3000);
                navigate("/Teams")
            })
    }

    function deleteTeam(hackerID,ownerID,member1, teamName) {
        teamIDv2.current = 11;
        if (Number(hackerID) != Number(ownerID)){
            alert("Ayo what you doin my mans? Only Owners otta do this")
        }
        else if (member1 != undefined || member1 != "None"){
            const urmom = {teamName: teamName, ownerID: ownerID}
            console.log(urmom);
            axios.put("http://localhost:5001/teams/makeTeamNull", urmom)
                .then(res => {
                    console.log(res);
                    alert("Yall weren't gonna win anyways");
                    navigate("/Teams");
                })
        }
        else{
            alert("Dont bail on your teammates my man! You gotta kick them out first before deleting this team")
        }
    }

    return (
        <>
            <Header />
            <br />
            <div className='teamManage'>
                <h1>Home Page For Team: {teamData[0]}</h1>
                <div>Owner: {teamData[1]} <button className= "manButton" type="button" onClick={() => { viewProfile(teamData[6]) }}>View Profile</button></div>
                <div>Teammate 1: {teamData[2]}{isOwner1}{isNone1}</div>
                <div>Teammate 2: {teamData[3]}{isOwner2}{isNone2}</div>
                <div>Teammate 3: {teamData[4]}{isOwner3}{isNone3}</div>
                <br />
                <div className='inviteCode'>Invite Code: {teamData[5]}</div>
                <br></br>
                {theButton}
                <br />
                <div className='backLink'>
                    <Link to="/Teams">Back</Link>
                </div>
            </div>
        </>
    )
}