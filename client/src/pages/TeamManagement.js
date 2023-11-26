import { Link, useNavigate } from 'react-router-dom'
import { Container , } from 'react-bootstrap'
import axios from "axios";
import React, {useEffect,useState} from 'react'

export default function TeamManagement() {

    //Creating all the variables
    let hackerID = -1
    let user = ''
    let member1 = ''
    let member1role = ''
    let member2 = ''
    let member2role = ''
    let member3 = ''
    let member3role = ''
    let passcode = ''
    let teamName = ''
    let role = ''

    //Fetching all the variables from the DB
    useEffect(() => {
        hackerID = localStorage.getItem(localStorage.key("hackerID"));
        let url = "http://localhost:5001/teams/fromUserID?ID=" + hackerID
        axios.get(url).then((response) => {
            console.log(response)
        });
    });

    return(
        <>
            <h1>Home Page For Team: {teamName}</h1>
            <div>You're Role in team: {role}</div>
            <div>Teammate 1: {member1} - {member1role}</div>
            <div>Teammate 2: {member2} - {member2role}</div>
            <div>Teammate 3: {member3} - {member3role}</div>
        </>
    )
}