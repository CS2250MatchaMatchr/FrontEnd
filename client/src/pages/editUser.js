import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/user.css';

export function editUser() {
  const [userData, setUserData] = useState({
    fullName: '',
    classStanding: '',
    gender: '',
    school: '',
    frontOrBackEnd: '',
    github: '',
    linkedIn: '',
    biography: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data based on hackerID from the backend
    const hackerID = localStorage.getItem('hackerID');
    if (hackerID) {
      axios.get(`http://localhost:5001/hackers/${hackerID}`)
        .then(response => {
          const fetchedUserData = response.data;
          setUserData(fetchedUserData);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          // Handle error if necessary
        });
    }
  }, []);

  const initialValues = {
    fullName: userData.fullName,
    classStanding: userData.classStanding,
    gender: userData.gender,
    school: userData.school,
    frontOrBackEnd: userData.frontOrBackEnd,
    github: userData.github,
    linkedIn: userData.linkedIn,
    biography: userData.biography,
  };

  const onSubmit = (data) => {
    const updatedUserData = {
      ...userData,
      ...data,
    };

    axios.put(`http://localhost:5001/hackers/${userData.hackerID}`, updatedUserData)
      .then(response => {
        console.log('User data updated:', response.data);
        navigate('/Technologies');
      })
      .catch(error => {
        console.error('Error updating user data:', error);
        // Handle error if necessary
      });
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    classStanding: Yup.string().required('Class Standing is required'),
    gender: Yup.string().required('Gender is required'),
    school: Yup.string().required('School is required'),
    frontOrBackEnd: Yup.string().required('Frontend/Backend selection is required'),
    github: Yup.string().required('Github link is required'),
    linkedIn: Yup.string(),
    biography: Yup.string(),
  });

  return (
    <div className="container mt-5">
      <div className="matchaHeader">
        <h1>Edit Profile Info:</h1>
      </div>
      <br />
      <div className="box">
        <h2 className="text-center">Your Profile</h2>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
            {/* Form fields similar to User.js */}
            {/* ... */}
            <Button type="submit" className="button-success">
              Update User Profile
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default editUser;
