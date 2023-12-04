import { Link, useNavigate } from 'react-router-dom'
import { Container, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage, } from 'formik'
import * as Yup from 'yup'
import axios from "axios";
import "../styles/createAcc.css";
import "../styles/login.css";


export default function Login() {

    //State to allow the localStorage of DB ID
    const [hackerID, setID] = useState([-1]);
    let id = null
    let navigate = useNavigate()

    //useEffect Used to store data into localStorage
    useEffect(() => {
        localStorage.setItem('hackerID', hackerID);
        let currentID = localStorage.getItem('hackerID');
        console.log("CurrentId:" + currentID)
        if (currentID == -1){
            console.log("Page Succesfully Loaded :)")
        }
        else{
            setID(-1)
            navigate("/Dashboard");
        }
    });

    const initialValues = {
        email: "",
        hackerPassword: ""
    };

    const onSubmit = (data => {
        let url = "http://localhost:5001/hackers/getPassword?email=" + data.email + "&hackerPassword=" + data.hackerPassword
        axios.get(url).then((response) => {
            console.log(response.data)
            if (response.data === "Incorrect Password" || response.data === "Email does not exist") {
                console.log(response.data)
                alert(response.data);
            }
            else {
                setID(response.data)
            }
        });
    });
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("You must enter an email!"),
        hackerPassword: Yup.string().required().min(5)
    })


    return (
            <div className="container mt-5">
                <div className="matchaHeader">
                    <h1>Welcome to Matchr</h1>
                </div>
                <br></br>
                <div className="box">
                    <h2 className="text-center">Sign In</h2>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        <Form>
                            <div className="mb-3">
                                <ErrorMessage name="email" component="span" />
                                <Field className="form-control" name="email" placeholder="Email" />
                            </div>
                            <div className="mb-3">
                                <ErrorMessage name="hackerPassword" component="span" />
                                <Field className="form-control" name="hackerPassword" type="password" placeholder="Password" />
                            </div>
                            <button type="submit" className="loginButton">Sign in!</button>
                        </Form>
                    </Formik>
                    <br></br>
                    <div className="mb-3">
                        ---------- or ----------
                    </div>

                    <div className="mb-3">
                        Don't have an account?
                    </div>
                    <div>
                        <Link to="/CreateAccount">Create one here!</Link>
                    </div>
                    
                </div>
            </div>
    );
}