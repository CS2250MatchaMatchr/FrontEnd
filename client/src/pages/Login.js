import { Link, Navigate } from 'react-router-dom'
import { Container , } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import React, {useEffect,useState} from 'react'
import {Formik, Form, Field, ErrorMessage,} from 'formik'
import * as Yup from 'yup'
import axios from "axios";


export default function Login() {

    const initialValues = {
        email: "",
        hackerPassword: ""
    };

    const onSubmit = (data => {
        let url = "http://localhost:5000/hackers/getPassword?email=" + data.email + "&hackerPassword=" + data.hackerPassword
        console.log(url)
        axios.get(url).then((response) => {
            if (response.data != true){
                console.log(response);
            }
            else{
                <Navigate to ="/NoPage"/>
                console.log("HEre");
            }
        });
    });
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("You must enter an email!"),
        hackerPassword: Yup.string().required().min(5)
    })


    return(
        <>
            <h1>Matchr</h1>
            <Container>
            <h2>Sign In</h2>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <ErrorMessage name="email" component="span"/>
                    <Field name="email" placeholder="Email"/>
                    <br></br>
                    <ErrorMessage name="hackerPassword" component="span"/>
                    <Field name="hackerPassword" placeholder="Password"/>
                    <br></br>
                    <button type="submit" component="span">Sign in!</button>
                </Form>
            </Formik>
            Don't have an account?
            <br></br>
            <Link to="/CreateAccount">Create one here!</Link>
            </Container>
        </>
    )
}