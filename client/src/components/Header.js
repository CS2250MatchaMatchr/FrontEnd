import "../styles/dashboard.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, Link } from 'react-router-dom'

export default function Header() {

    let navigate = useNavigate()
    function goHome() {
        navigate("/Dashboard");
    }

    function goTeam() {
        navigate("/Teams");
    }

    function goProfile() {
        navigate("/Profile");
    }

    function goInbox() {
        navigate("/Inbox");
    }

    function goLogout() {
        localStorage.setItem("hackerID", -1);
        navigate("/Login");
    }

    return (
        <>
            <Navbar className="matchaHeader">
                <h1 onClick={goHome}>Matchr</h1>
                <Container>
                    <Navbar.Brand></Navbar.Brand>
                    <Nav>
                        <Nav.Link onClick={goHome}>Home</Nav.Link>
                        <Nav.Link onClick={goTeam}>Team</Nav.Link>
                        <Nav.Link onClick={goProfile}>Profile</Nav.Link>
                        <Nav.Link onClick={goInbox}>Inbox</Nav.Link>
                        <Nav.Link onClick={goLogout}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}