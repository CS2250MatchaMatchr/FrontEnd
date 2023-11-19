import { Link } from 'react-router-dom'



export default function Login () {
    return(
        <>
            <h2>Login Page</h2>
            <Link to="/CreateAccount">Don't have an account? Create one here!</Link>
        </>
    )
}

