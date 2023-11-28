import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from "../components/Header"
import "../styles/Teams.css";

function TeamMember() {
    return (
        <div className='teamMember'>
            {/* idk what we're doing, a pfp? */}
            <div className='pfp'>*put image here*</div>
            {/* display hacker member or owner status */}
            <div className='memStatus'>Member</div>
            {/* make it expand into a dropdown */}
            <div className='memManage'>
                <button>Options</button>
            </div>
            
        </div>
    );
}

function searchTeams() {
    //TODO: make it perform a query to locate teams of certain parameters
}

function findTeam() {
    const data = document.getElementById('txtbox').value;
    console.log(data);
}

export default function Teams() {
    const [goToTeamCreation, setGoToTeamCreation] = React.useState(false);
    const [goToHackerSearch, setGoToHackerSearch] = React.useState(false);
    const [goToTeamManagement, setGoToTeamManagement] = React.useState(false);
    let hackerID = -1;

    useEffect(() => {
        hackerID = localStorage.getItem(localStorage.key("hackerID"));
    }, []);
    
    const onSubmit = (data => {
        const datas = document.getElementById('txtbox').value;
        console.log(datas);
        const url = "http://localhost:5001/teams/findTeamByPasscode?passcode=" + datas;
        axios.get(url)
            .then(res => {
                console.log(res);
                const teamId = res.data.teamId;
                console.log(teamId);
                if (teamId === "Cannot find team") {
                    alert("Team Does Not Exist");
                } else {
                    const joinJSON = {
                        hackerID: hackerID,
                        passcode: datas
                    }
                    const newUrl = "http://localhost:5001/teams/usePasscodeToJoinTeam";
                    axios.put(newUrl, joinJSON)
                        .then(res => {
                            console.log(res);
                            <Navigate to="/Teams"/>
                        })
                }
            })
    })

    const initialValue = {
        passcode: ""
    };

    


    // function from left panel that sends user to Team Creation page
    if (goToTeamCreation) {
        return <Navigate to="/CreateTeam"/>;
    }
    if (goToHackerSearch) {
        return <Navigate to="/HackerSearch"/>;
    }
    if (goToTeamManagement){
        return <Navigate to="/TeamManagement"/>;
    }

    return (
        <>
            <Header />

            {/* Should LEAD TO A DIFF PAGE where you can create a team */}
            <div className='leftPanel'>
                {/* onClick sends user to "/TeamCreation" page */}
                <button name="btn1" className="btn" onClick={() => {setGoToTeamCreation(true);}}>Create Team</button>
            </div>

            
            <div className='middlePanel'>
                {/* DISPLAYS TEAM INFO / MANAGE TEAM */}
                <div className='teamPanel' onClick={() => {setGoToTeamManagement(true);}}>
                    <h3>Manage Team</h3>
                    <div className='teamMember-container'>
                        
                    </div>
                </div>
                {/* JOIN PARTY WITH CODE BOX */}
                <div className='joinPanel'>
                    <h5>Join Team via Code</h5>
                        <Formik initialValues={initialValue} onSubmit={onSubmit}>
                        <Form>
                            <Field name='passcode' id='txtbox' placeholder='ex. as72Df9G'></Field><br/><br/>
                            <button>Join</button>
                        </Form> 
                        </Formik>   
                </div>
            </div>

            {/* FORM THAT CAN SEARCH FOR OTHER TEAMS IN DB */}
            <div className='searchPanel'>
                <button name="btn3" className="btn" onClick={() => {setGoToHackerSearch(true);}}>Search for Teams</button>
                {/* <h3>Search For Teams</h3>
                <input type="text" placeholder='Search...' onSubmit={searchTeams}></input> */}
            </div>
        </>
    );


}