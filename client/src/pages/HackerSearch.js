import Header from "../components/Header";
import { Formik, Form, Field, FieldProps } from 'formik'
import axios from "axios";
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useNavigate, Link } from 'react-router-dom'
import "../styles/HackerSearch.css";

export default function HackerSearch() {

    const [listOfHackers, setListOfHackers] = useState([]);
    const navigate = useNavigate();

    const initialValues1 = {
        fullName: ""
    }

    const onSubmitByName = (data => {
        let url = "http://54.221.32.155:5001/hackers/fullName?fullName=" + data.fullName
        axios.get(url).then((response) => {
            if (response.data.length == 0) {
                alert("Couldn't find users");
                setListOfHackers([])
            }
            else {
                setListOfHackers(response.data);
            }
        });
    });

    const onSubmitByLanguage = (data => {
        let url = "http://54.221.32.155:5001/technologies/HackerIDFromLanguage?language=" + data.language
        let hackerPromises = []
        axios.get(url).then((response) => {
            // Response.data is an array of ID's
            for (let id in response.data.listOfID) {
                let url = "http://54.221.32.155:5001/hackers/fullNameFromID?id=" + response.data.listOfID[id];

                // Push the axios.get promise to the array
                hackerPromises.push(axios.get(url));
            }

            // Wait for all promises to be resolved
            Promise.all(hackerPromises)
                .then((values) => {
                    let hackerArray = values.map((value) => value.data[0][0]);

                    // Update the state after all promises are resolved
                    setListOfHackers(hackerArray);
                })
                .catch((error) => {
                    // Handle errors here
                    console.error(error);
                });
        });
    });

    function viewProfile(hackerID) {
        navigate("/OtherProfile?id=" + hackerID)
    }


    return (
        <>
            <Header />
            <div className="container mt-5">
                <div className="box">
                    <h1>Search for Hackers</h1>
                    <div>Search by Name:</div>
                    <Formik initialValues={initialValues1} onSubmit={onSubmitByName}>
                        <Form>
                            <Field className="form-control" name="fullName" placeholder="Search by Name" />
                            <br />
                            <button className="searchHackButton" type="submit" >Search!</button>
                        </Form>
                    </Formik>
                    <br />
                    <div>---OR---</div>
                    <br />
                    <div>Search by Skills:</div>
                    <Formik
                        initialValues={{
                            language: "Javascript"
                        }}
                        onSubmit={onSubmitByLanguage}
                    >
                        {({ values, setFieldValue }) => (
                            <Form>
                                <Dropdown
                                    selection
                                    placeholder="Select language desired"
                                    options={[
                                        { value: "Javascript", text: "Javascript" },
                                        { value: "Python", text: "Python" },
                                        { value: "Go", text: "Go" },
                                        { value: "Java", text: "Java" },
                                        { value: "Kotlin", text: "Kotlin" },
                                        { value: "PHP", text: "PHP" },
                                        { value: "CSharp", text: "C#" },
                                        { value: "R", text: "R" },
                                        { value: "Ruby", text: "Ruby" },
                                        { value: "CPP", text: "C++" },
                                        { value: "C", text: "C" },
                                        { value: "Matlab", text: "Matlab" },
                                        { value: "Typescript", text: "Typescript" },
                                        { value: "SQL", text: "SQL" },
                                        { value: "Scala", text: "Scala" },
                                        { value: "HTML", text: "HTML" },
                                        { value: "CSS", text: "CSS" },
                                        { value: "NoSQL", text: "NoSQL" },
                                        { value: "Rust", text: "Rust" },
                                        { value: "Perl", text: "Perl" },
                                    ]}
                                    value={values.language}
                                    onChange={(_, { value }) => setFieldValue("language", value)}
                                />
                                <br />
                                <button className="langButton" type="submit">Search by language</button>
                            </Form>
                        )}
                    </Formik>
                    <div className="results">
                        {listOfHackers.map((value, key) => {
                            return (<div>
                                <br />
                                <div> {value.fullName}</div>
                                <button className="profileButton" type="button" onClick={()=>{viewProfile(value.id)}}>View Profile</button>
                                <br></br>
                                <br></br>
                            </div>
                            )
                        })}
                    </div>
                    <Link to="/Teams">Back to Teams</Link>
                </div>
            </div>
        </>
    )
}