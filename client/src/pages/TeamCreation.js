import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, Navigate } from 'react-router-dom'
import { Container , } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import React, {useEffect,useState} from 'react'
import {Formik, Form, Field, ErrorMessage,} from 'formik'
import * as Yup from 'yup'
import axios from "axios";

export default function TeamCreation() {

    const [hackerID, setID] = useState([]);

    useEffect(() => {
        setID(localStorage.getItem(localStorage.key("hackerID")));
    });

    const initialValues = {
        teamName: ""
    };

    const onSubmit = (data => {
        setID()
        const team = {
            teamName: data.teamName,
            owner: hackerID,
            member1: null,
            member2: null,
            member3: null
        }
    });

    const validationSchema = Yup.object().shape({
        teamName: Yup.string().required("You must enter a team name before submitting!")
    })

    return(
        <>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <label>Enter desired team name: </label>
                    <Field name="teamName"/>
                    <br></br>
                    <button>Create new team!</button>
                </Form>
            </Formik>
        </>
    )
}