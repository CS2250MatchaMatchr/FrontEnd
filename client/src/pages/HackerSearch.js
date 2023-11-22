import Header from "../components/Header";
import { Formik, Form, Field, ErrorMessage} from 'formik'
import axios from "axios";
import { Container, Button} from 'react-bootstrap'

export default function HackerSearch() {
    const initialValues1 = {
        fullName: ""
    }

    const onSubmit1 = (data => {
        let url = "http://localhost:5001/hackers/fullName?fullName=" + data.fullName
        axios.get(url).then((response) => {
            console.log(response.data)
            if (response.data.length == 0) {
                alert("Couldn't find users");
            }
            else {
                alert("Found")
            }
        });
    });

    return(
        <>
        <Header></Header>
            <h1>Search for Hackers</h1>
            <Formik initialValues={initialValues1} onSubmit={onSubmit1}>
                <Form>
                        <Field name="fullName" placeholder="Search by Name" />
                        <Button type="submit" className="btn btn-success">Sign in!</Button>
                </Form>
            </Formik>
        </>
    )
}
