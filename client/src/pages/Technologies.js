import { Link, Navigate } from 'react-router-dom'
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Formik, Form, Field, ErrorMessage, } from 'formik'
import React, { useEffect, useState } from 'react'


export default function Technologies() {

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    
    const onSubmit = (
        async (values) => {
            await sleep(500);
            const urmom = (JSON.stringify(values, null, 2));
            console.log(urmom);
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
                        {/* 
                This first checkbox will result in a boolean value being stored. Note that the `value` prop
                on the <Field/> is omitted
              */}

                        {/* 
                Multiple checkboxes with the same name attribute, but different
                value attributes will be considered a "checkbox group". Formik will automagically
                bind the checked values to a single array for your benefit. All the add and remove
                logic will be taken care of for you.
              */}
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



    /*
    return (
    
        <div>
            <h1>Sign Up</h1>
            <Formik>
                {({ values }) => (
                    <Form>
    
                        {/* 
                Multiple checkboxes with the same name attribute, but different
                value attributes will be considered a "checkbox group". Formik will automagically
                bind the checked values to a single array for your benefit. All the add and remove
                logic will be taken care of for you.
              }
    
                        <div id="checkbox-group"></div>
                        <div role="group" aria-labelledby="checkbox-group">
                            <label>
                                <Field type="checkbox" name="checked" value="One" />
                                Javascript
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="checked" value="Two" />
                                Python
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="checked" value="Three" />
                                Go
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="checked" value="Three" />
                                Java
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="checked" value="Three" />
                                Kotlin
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="checked" value="Three" />
                                PHP
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="checked" value="Three" />
                                CSharp
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="checked" value="Three" />
                                Swift
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="checked" value="Three" />
                                R
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="checked" value="Three" />
                                Ruby
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="checked" value="Three" />
                                CPP
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="checked" value="Three" />
                                C
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="checked" value="Three" />
                                Matlab
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="checked" value="Three" />
                                Typescript
                            </label>
                            <label>
                                <Field type="checkbox" name="checked" value="Three" />
                                SQL
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="checked" value="Three" />
                                Scala
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="checked" value="Three" />
                                HTML
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="checked" value="Three" />
                                CSS
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="checked" value="Three" />
                                NoSQL
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="checked" value="Three" />
                                Rust
                            </label>
                            <br />
                            <label>
                                <Field type="checkbox" name="checked" value="Three" />
                                Perl
                            </label>
                            <br />
                            <label>
                                Other
                                <Field type="text" name="checked" />
                            </label>
                        </div>
    
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    
    
    );
    */

}