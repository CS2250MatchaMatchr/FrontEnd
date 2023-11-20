import { Link } from 'react-router-dom'
import { Container , } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import React, {useEffect,useState} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from "axios";


export default function Login() {

    const initialValues = {
        email: "",
        hackerPassword: ""
    };

    const onSubmit = (data => {
        axios.post("http://localhost:5000/hackers", data).then((response) => {
            if (response != true){
                
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
import { Link } from 'react-router-dom'



export default function Login () {
    return(
        <>
            <h2>Login Page</h2>
            <Link to="/CreateAccount">Don't have an account? Create one here!</Link>
        </>
    )
}

