import React, {useState, useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom'
import "../styles/profiles.css";

const initialValues = {
  fullName: '',
  classStanding: '',
  gender: '',
  school: '',
  lookingForTeam: false,
  frontOrBackend: false,
  linkedIn: '',
};

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  classStanding: Yup.string().required('Class Standing is required'),
  gender: Yup.string().required('Gender is required'),
  school: Yup.string().required('School is required'),
  lookingForTeam: Yup.boolean().required('Looking for Team is required'),
  frontOrBackend: Yup.string().required('Frontend/Backend selection is required'),
  linkedIn: Yup.string().url('Invalid LinkedIn URL'),
});

const User = () => {
  const onSubmit = (values) => {
    // Handle form submission here (e.g., send data to backend)
    console.log(values);
    // You can use axios to send form data to your backend
    axios.post('http://localhost:5001/hackers', values)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
    <div className="matchaHeader">
      <h1>Welcome to Matchr</h1>
    </div>
    <br/>
    <div className="box">
      <h2 className="text-center">Your Profile</h2>
    </div>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
          <div className="mb-3">
              <label className="form-label">Enter Full Name:</label>
              <ErrorMessage name="fullName" component="span" />
              <Field classname = "form-control" name="fullName" placeholder="ex: John Smith" />
          </div>
          <div className="mb-3">
              <label>What Is Your Class Standing?</label>
              <ErrorMessage name="classStanding" component="span" />
              <div role="group" aria-labelledby="class-standing-label">
                <label id="class-standing-label">
                  <Field type="radio" name="classStanding" value="freshman" />
                  Freshman
                </label>
                <label>
                  <Field type="radio" name="classStanding" value="sophomore" />
                  Sophomore
                </label>
                <label>
                  <Field type="radio" name="classStanding" value="junior" />
                  Junior
                </label>
                <label>
                  <Field type="radio" name="classStanding" value="senior" />
                  Senior
                </label>
              </div>
          </div>
          <div className="mb-3">
              <label>What Is Your Gender?</label>
              <ErrorMessage name="gender" component="span" />
              <div role="group" aria-labelledby="gender-label">
                <label id="gender-label">
                  <Field type="radio" name="gender" value="male" />
                  Male
                </label>
                <label>
                  <Field type="radio" name="gender" value="female" />
                  Female
                </label>
                <label>
                  <Field type="radio" name="gender" value="other" />
                  Other
                </label>
              </div>
          </div>
          <div className="mb-3">
              <label className="form-label">What Is Your School?</label>
              <ErrorMessage name="school" component="span" />
              <Field className="form-control" name="school" placeholder="ex: Cal Poly Pomona" />

              <label className="form-label">Are You Looking for a Team?</label>
              <ErrorMessage name="lookingForTeam" component="span" />
              <div role="group" aria-labelledby="looking-for-team-label">
                <label id="looking-for-team-label">
                  <Field type="radio" name="lookingForTeam" value={true} />
                  Yes
                </label>
                <label>
                  <Field type="radio" name="lookingForTeam" value={false} />
                  No
                </label>
              </div>

              <label className="form-label">Frontend or Backend?</label>
              <ErrorMessage name="frontOrBackend" component="span" />
              <div role="group" aria-labelledby="front-back-label">
                <label id="front-back-label">
                  <Field type="radio" name="frontOrBackend" value="frontend" />
                  Frontend
                </label>
                <label>
                  <Field type="radio" name="frontOrBackend" value="backend" />
                  Backend
                </label>
                <label>
                  <Field type="radio" name="frontOrBackend" value="fullstack" />
                  Fullstack
                </label>
              </div>

              <label className="form-label">LinkedIn Profile:</label>
              <ErrorMessage name="linkedIn" component="span" />
              <Field className="form-control" name="linkedIn" placeholder="ex: https://www.linkedin.com/in/yourprofile" />
      
              <button type="submit" className="button-success">Create User Profile!</button>
        </div>
        </Form>
      </Formik>
    </>
  );
};

export default User;
