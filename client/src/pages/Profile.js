import Header from "../components/Header";
import "../styles/profile.css";

export default function Profile() {
    return (
        <>
            <Header />
            <br />
            <div className="profile">
                <h2>Profile</h2>
                
                <div className="info">
                    <p>email</p>
                    <p>fullName</p>
                    <p>classStanding</p>
                    <p>gender</p>
                    <p>gender</p>
                    <p>frontOrBackEnd</p>
                    <p>github</p>
                    <p>linkedin</p>
                    <p>biography</p>
                </div>
                <br />
                <button className="editButton">Edit</button>
            </div>
        </>
    )
}