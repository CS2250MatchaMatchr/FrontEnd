import Header from "../components/Header";
import "../styles/dashboard.css";

export default function Dashboard() {
    return (
        <>
            <Header />
            <br />
            <div class="container">
                <div class="column">
                    <h2>Profile</h2>
                    <p> This is first column of our grid system</p>
                </div>
                <div class="column">
                    <h2>Team</h2>
                    <p> This is second column of our grid system</p>
                </div>
                <div class="column">
                    <h2>Countdown</h2>
                    <p> This is third column of our grid system</p>
                </div>
            </div>
        </>
    )
}