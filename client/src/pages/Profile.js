import Header from "../components/Header";
import { Link } from 'react-router-dom';
import "../styles/profile.css";
import axios from "axios";
import React, {useEffect,useState} from 'react'

export default function Profile() {

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

    

    return (
        <>
            <Header />
            <br />
            <div className="profile">
                <h2>Profile</h2>
                
                <div className="info">
                    <p>email: {userJson.email}</p>
                    <p>fullName: {userJson.fullName}</p>
                    <p>classStanding: {userJson.classStanding}</p>
                    <p>gender: {userJson.gender}</p>
                    <p>frontOrBackEnd: {userJson.frontOrBackEnd}</p>
                    <p>github: {userJson.github}</p>
                    <p>linkedin: {userJson.linkedin}</p>
                    <p>biography: {userJson.biography}</p>
                </div>
                <br />
                <Link to="/editUser" className="button">Edit</Link>

            </div>
        </>
    )
}