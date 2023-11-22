import Header from "../components/Header";
import { Formik, Form, Field, FieldProps} from 'formik'
import axios from "axios";
import React, { useState } from 'react'
import {Button} from 'react-bootstrap'
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default function HackerSearch() {

    const [listOfHackers, setListOfHackers] = useState([]);

    const initialValues1 = {
        fullName: ""
    }

    const onSubmit1 = (data => {
        let url = "http://localhost:5001/hackers/fullName?fullName=" + data.fullName
        axios.get(url).then((response) => {
            console.log(response.data)
            if (response.data.length == 0) {
                alert("Couldn't find users");
                setListOfHackers([])
            }
            else {
                setListOfHackers(response.data);
            }
        });
    });

    const onSubmit2 = (data => {
        console.log("HI")
        let url = "http://localhost:5001/technologies/HackerFromLanguage?language=" + data.language
        console.log(url)
        axios.get(url).then((response) => {
            console.log(response.data)
        });
    });

    return(
        <>
        <Header></Header>
            <h1>Search for Hackers</h1>
            <div>Search by Name:</div>
            <Formik initialValues={initialValues1} onSubmit={onSubmit1}>
                <Form>
                        <Field name="fullName" placeholder="Search by Name" />
                        <Button type="submit" className="btn btn-success">Search!</Button>
                </Form>
            </Formik>
            <div>---OR---</div>
            <div>Search by Skills:</div>
            <Formik
                initialValues={{
                language: ""
                }}
                onSubmit={onSubmit2}
            >
                {({ values, setFieldValue }) => (
                <div>
                    <pre>{JSON.stringify(values, undefined, 2)}</pre>

                    <Dropdown
                    selection
                    placeholder="Select language desired"
                    options={[
                        {value: "Javascript", text: "Javascript"},
                        {value: "Python", text: "Python"},
                        {value: "Go", text: "Go"},
                        {value: "Java", text: "Java"},
                        {value: "Kotlin", text: "Kotlin"},
                        {value: "PHP", text: "PHP"},
                        {value: "CSharp", text: "C#"},
                        {value: "R", text: "R"},
                        {value: "Ruby", text: "Ruby"},
                        {value: "CPP", text: "C++"},
                        {value: "C", text: "C"},
                        {value: "Matlab", text: "Matlab"},
                        {value: "Typescript", text: "Typescript"},
                        {value: "SQL", text: "SQL"},
                        {value: "Scala", text: "Scala"},
                        {value: "HTML", text: "HTML"},
                        {value: "CSS", text: "CSS"},
                        {value: "NoSQL", text: "NoSQL"},
                        {value: "Rust", text: "Rust"},
                        {value: "Perl", text: "Perl"},
                    ]}
                    value={values.language}
                    onChange={(_, { value }) => setFieldValue("language", value)}
                    />
                    <Button type="submit">Search by language</Button>
                </div>
                )}
            </Formik>
            <div className="results">
                {listOfHackers.map((value,key) => {
                    return <div> {value.fullName}{value.hackerPassword} </div>
                })}
            </div>
        </>
    )
}
