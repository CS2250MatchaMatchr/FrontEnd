import React, {useEffect,useState} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from "axios";


export default function CreateAccount() {

    const initialValues = {
        email: "",
        hackerPassword: ""
    };

    const onSubmit = (data => {
        axios.post("http://localhost:5000/hackers", data).then((response) => {
            console.log("It Worked")
        });
    });

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("You must enter an email!"),
        hackerPassword: Yup.string().required().min(5)
    })


    return(
        <>
            <h2>Create Account Page</h2>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <label>Enter Email:</label>
                    <ErrorMessage name="email" component="span"/>
                    <Field name="email" placeholder="ex: urmom@hotmail.com"/>
                    <label>Enter Password:</label>
                    <ErrorMessage name="hackerPassword" component="span"/>
                    <Field name="hackerPassword" placeholder="ex: ilovemymom1738"/>
                    <button type="submit" component="span">Create Account!</button>
                </Form>
            </Formik>
        </>
    )
}
