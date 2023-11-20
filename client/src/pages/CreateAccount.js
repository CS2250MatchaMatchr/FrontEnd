import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../styles.css";

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

    // return(
    //     <>
    //         <h2>Create Account Page</h2>
    //         <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    //             <Form>
    //                 <label>Enter Email:</label>
    //                 <ErrorMessage name="email" component="span"/>
    //                 <Field name="email" placeholder="ex: urmom@hotmail.com"/>
    //                 <label>Enter Password:</label>
    //                 <ErrorMessage name="hackerPassword" component="span"/>
    //                 <Field name="hackerPassword" placeholder="ex: ilovemymom1738"/>
    //                 <button type="submit" component="span">Create Account!</button>
    //             </Form>
    //         </Formik>
    //     </>
    // )

    return (
        <div className="container mt-5">
            <div className="box">
                <h1 className="text-center">Matchr</h1>
                <h2 className="text-center">Create Account Page</h2>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form>
                        <div className="mb-3">
                            <label className="form-label">Enter Email:</label>
                            <ErrorMessage name="email" component="span" />
                            <Field className="form-control" name="email" placeholder="ex: urmom@hotmail.com" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Enter Password:</label>
                            <ErrorMessage name="hackerPassword" component="span" />
                            <Field className="form-control" name="hackerPassword" type="password" placeholder="ex: ilovemymom1738" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm password:</label>
                            <ErrorMessage name="passwordConfirmation" component="span" />
                            <Field className="form-control" name="passwordConfirmation" type="password" />
                        </div>
                        <Button type="submit" className="btn btn-primary">Create Account!</Button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
    
}
