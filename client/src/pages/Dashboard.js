import Header from "../components/Header";
import "../styles/dashboard.css";
import sponsor from "../images/sponsor.png"

export default function Dashboard() {
    return (
        <>
            <Header />
            <br />
            <div class="containerD">
                <div class="column">
                    <h2>Profile</h2>
                    <p>First and last name:</p>
                    <p>Email:</p>
                    <p>School:</p>
                    <p>Class standing:</p>
                    <p>Github:</p>
                    <p>LinkedIn:</p>
                    <p>Biography:</p>
                </div>
                <div class="column">
                    <h2>Team</h2>
                    <h3>Team name</h3>
                    <p>Team member 1</p>
                    <p>Team member 2</p>
                    <p>Team member 3</p>
                    <p>Team member 4</p>
                </div>
                <div class="column">
                    <h2>Countdown</h2>
                    <p>There are</p>
                    <h1>ur mom</h1>
                    <p>days until the hackaton.</p>
                </div>
            </div>
            <div className="body">
                <img className="sponsors" src={sponsor} />
            </div>
        </>
    )
}