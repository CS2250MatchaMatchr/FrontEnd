import Header from "../components/Header";
import { Link } from 'react-router-dom';
import "../styles/profile.css";
import axios from "axios";
import React, {useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';


export default function Profile() {

    const [userJson,setUserJson] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const hackerID = localStorage.getItem(localStorage.key("hackerID"));
        console.log(hackerID)
        let url = "http://localhost:5001/hackers?id=" + hackerID
        axios.get(url).then(async (response) => {
            setUserJson(response.data[0][0])
        });

        let url2 = "http://localhost:5001/Technologies?hackerID=" + hackerID
        axios.get(url2).then(async (response) => {
            setHackersLanguage(response.data[0][0])
            let ihatemylife = []
            for (let term in hackersLanguage){
                if (hackersLanguage[term] == 1){
                    console.log("hi")
                    ihatemylife.push(term);
                    ihatemylife.push(", ")
                }
            }
            Promise.all(ihatemylife).then(function(values) {
                console.log(values);
                setRefresh(true)
                setLanguageList(values)
              });
        });


    },[refresh]);

    

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
                    <p>Languages: {languageList}</p>
                </div>
                <br />
                <Link to="/editUser" className="button">Edit</Link>

            </div>
        </>
    )
}