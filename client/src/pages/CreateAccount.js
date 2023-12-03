import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../styles/createAcc.css";



export default function CreateAccount() {

    //State to allow the localStorage of DB ID
    const [hackerID, setID] = useState([-1]);
    let id = null;
    let navigate = useNavigate()

    //useEffect Used to store data into localStorage
    useEffect(() => {
        localStorage.setItem('hackerID', hackerID);
        let storedID = localStorage.getItem('hackerID');
        console.log(storedID)
        if(storedID == -1) {
            console.log("Page Succesfully Rendered");
        }
        else {
            setID(-1)
            navigate("/User");
        }
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
            axios.post("http://localhost:5001/hackers", newHacker).then((response) => {
                if (response.data === "Fail") {

                    alert("Email already exits.");
                    
                } else {
                    
                    id = response.data
                    setID(id)
                    // navigate("/Dashboard");
                    
                }
            });
        }
        
    });

    //Form Validation: NON DB Related
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("You must enter an email!"),
        hackerPassword: Yup.string().required().min(5)
    })

    return (
        <div className="container mt-5">
            <div className="matchaHeader">
                <h1>Welcome to Matchr</h1>
            </div>
            <br/>
            <div className="box">
                <h2 className="text-center">Create Account</h2>
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
                        <Button type="submit" className="btn btn-success">Create Account!</Button>
                    </Form>
                </Formik>
                <br/>
                Already have an account?
                <br/>
                <Link to="/Login">Login here!</Link>
            </div>
        </div>
    );
    
}
