import Header from "../components/Header";
import "../styles/profile.css";
import axios from "axios";
import React, {useEffect,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'

export default function Profile() {

    const [userJson,setUserJson] = useState([]);
    const [hackersLanguage,setHackersLanguage] = useState()
    const [languageList, setLanguageList] = useState([])
    const [hackerID, setHackerID] = useState()
    const [pfp,setPFP] = useState()
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()

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
                    ihatemylife.push(term);
                    ihatemylife.push(", ")
                }
            }
            Promise.all(ihatemylife).then(function(values) {
                setRefresh(true)
                setLanguageList(values)
              });
        });
    },[refresh]);

    useEffect(() => {
        const hackerID = localStorage.getItem(localStorage.key("hackerID"));
        console.log(hackerID)
        let url = "http://localhost:5001/pfp?hackerID=" + hackerID
        axios.get(url).then(async (response) => {
            setPFP(response.data)
            console.log(pfp)
        });
    },[pfp]);

    const initialValues = {
        imageAddress: ""
    }

    const onSubmit = (data => {
        let hackerID = localStorage.getItem(localStorage.key("hackerID"));
        const pfp = {
            hackerID: hackerID,
            imageAddress: data.imageAddress
        }
        axios.put("http://localhost:5001/pfp", pfp).then((response) => {
            window.location.reload(false);
        });
           
    });

    const validationSchema = Yup.object().shape({
        imageAddress: Yup.string().url("Must be an image URL")
    })
    

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
                    <p>github: <a href={userJson.github}>{userJson.github}</a></p>
                    <p>linkedin: <a href={userJson.linkedIn}>{userJson.linkedIn}</a></p>
                    <p>biography: {userJson.biography}</p>
                    <p>Languages: {languageList}</p>
                </div>
                <br />
                <div className="editButton">
                    <Link to="/EditUser">Edit Profile</Link>
                </div>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form>
                        <div className="mb-3">
                            <label>Enter in a image url to set PFP</label>
                            <ErrorMessage name="imageAddress" component="span" />
                            <Field className="form-control" name="imageAddress"/>
                        </div>
                        <button type="submit" className="loginButton">Upload Photo</button>
                    </Form>
                </Formik>
                <img src={pfp} style={{width: 300, height: 300}}/>
            </div>
        </>
    )
}