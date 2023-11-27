import { Link, Navigate } from 'react-router-dom'
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import { Formik, Form, Field, ErrorMessage, } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'


export default function Technologies() {

    const [hackerID, setID] = useState();
    let navigate = useNavigate()

    useEffect(() => {
        setID(localStorage.getItem('hackerID'));
    }, []);

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    
    const onSubmit = (
        async (values) => {
            await sleep(500);
            //const urmom = (JSON.stringify(values, null, 2));
            const technologies = {
                hackerID: Number(hackerID),
                Javascript: false,
                Python: false,
                Go: false,
                Java: false,
                Kotlin: false,
                PHP: false,
                CSharp: false,
                Swift:false,
                R: false,
                Ruby: false,
                CPP: false,
                C: false,
                Matlab: false,
                Typescript: false,
                SQL: false,
                Scala:false,
                HTML: false,
                CSS: false,
                NoSQL: false,
                Rust: false,
                Perl: false,
                Other: ""
            }
            for (let tech in values.Technologies){
                technologies[values.Technologies[tech]] = true
            }

            technologies.Other = values.Other

            axios.post("http://localhost:5001/technologies", technologies).then((response) => {
                console.log(response.data)
                if (response.data == "Successfully Created"){
                    navigate("/Dashboard");
                }
                else{
                    alert(response.data);
                }
            });
            


        }
        

    )

    return (
        <div>
            <h1>Sign Up</h1>
            <Formik

                initialValues={{
                    Technologies: []
                }}

                onSubmit={onSubmit}
            >
                {({ values }) => (
                    <Form>
                        <div id="checkbox-group"></div>
                        <div role="group" aria-labelledby="checkbox-group">
                            <label>
                                <Field type="checkbox" name="Technologies" value="Javascript" />
                                Javascript
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="Technologies" value="Python" />
                                Python
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="Technologies" value="Go" />
                                Go
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="Technologies" value="Java" />
                                Java
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="Technologies" value="Kotlin" />
                                Kotlin
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="Technologies" value="PHP" />
                                PHP
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="Technologies" value="CSharp" />
                                CSharp
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="Technologies" value="Swift" />
                                Swift
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="Technologies" value="R" />
                                R
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="Technologies" value="Ruby" />
                                Ruby
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="Technologies" value="CPP" />
                                CPP
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="Technologies" value="C" />
                                C
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="Technologies" value="Matlab" />
                                Matlab
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="Technologies" value="Typescript" />
                                Typescript
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="Technologies" value="SQL" />
                                SQL
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="Technologies" value="Scala" />
                                Scala
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="Technologies" value="HTML" />
                                HTML
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="Technologies" value="CSS" />
                                CSS
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="Technologies" value="NoSQL" />
                                NoSQL
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="Technologies" value="Rust" />
                                Rust
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="Technologies" value="Perl" />
                                Perl
                            </label>
                            <br />
                            <label>
                                Other
                                <Field type="text" name="Other" />
                            </label>
                        </div>

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );

}