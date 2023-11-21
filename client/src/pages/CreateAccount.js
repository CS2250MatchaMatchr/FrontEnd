import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../styles.css";


export default function CreateAccount() {

    //State to allow the localStorage of DB ID
    const [hackerID, setID] = useState([]);
    let id = null;
    let navigate = useNavigate()

    //useEffect Used to store data into localStorage
    useEffect(() => {
        localStorage.setItem('hackerID', hackerID);
    });

    //Initial Form Values
    const initialValues = {
        email: "",
        hackerPassword: ""
    };

    //Logic once onSubmit is clicked
    const onSubmit = (data => {
        if (data.hackerPassword != data.passwordConfirmation) {
            alert("Passwords are not the same.")
        } else {
            const newHacker = {"email": data.email, 
                                "hackerPassword": data.hackerPassword,
                                "fullName": "",
                                "classStanding": "",
                                "gender": "",
                                "school": "",
                                "frontOrBackEnd": "",
                                "github": "",
                                "biography": "",
                                "lookingForTeam": true
                                };
            axios.post("http://localhost:5000/hackers", newHacker).then((response) => {
                if (response === "Fail") {

                    alert("Email already exits.");
                    
                } else {
                    
                    id = response.data
                    setID(id)
                    navigate("/createTeam");
                    
                }
            });
        }
        
    });

    //Form Validation: NON DB Related
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
