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

export default function Teams() {
    const [goToTeamCreation, setGoToTeamCreation] = React.useState(false);

    // function from left panel that sends user to Team Creation page
    if (goToTeamCreation) {
        return <Navigate to="/CreateTeam"/>;
    }

    return (
        <>
            <Header />

            {/* Should LEAD TO A DIFF PAGE where you can create a team */}
            <div className='leftPanel'>
                {/* onClick sends user to "/TeamCreation" page */}
                <button name="btn1" className="btn" onClick={() => {setGoToTeamCreation(true);}}>Create Team</button>
            </div>

            {/* DISPLAYS TEAM INFO / MANAGE TEAM */}
            <div className='teamPanel'>
                <h3>Manage Team</h3>
                <div className='teamMember-container'>
                    <TeamMember />
                    <TeamMember />
                    <TeamMember />
                    <TeamMember />
                </div>
                
            </div>

            {/* FORM THAT CAN SEARCH FOR OTHER TEAMS IN DB */}
            <div className='searchPanel'>
                {/* <button name="btn3" className="btn" >Search for Teams</button> */}
                <h3>Search For Teams</h3>
                <input type="text" placeholder='Search...' onSubmit={searchTeams}></input>
            </div>
            
        </>
    );


}