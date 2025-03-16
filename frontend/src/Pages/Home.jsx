import React from "react";
import { Link } from "react-router-dom";


const Home = () => {


    return (
        <div className="container mt-5">
            <div className="box has-background-white-ter p-5">
                <h1 className="title has-text-link">Welcome to the Contacts App</h1>
                <p className="subtitle has-text-grey">
                    This application allows you to manage contacts, send OTP messages, and track sent messages.
                </p>
                <h2 className="title is-5 mt-4 has-text-info">How to Use:</h2>
                <ul className="content has-text-grey-dark">
                    <li>Navigate to <b>Contacts</b> to view the available contacts.</li>
                    <li>Select a contact and click <b>Send OTP</b> to generate and send an OTP message.</li>
                    <li>Go to <b>Sent Messages</b> to review all sent OTPs.</li>
                </ul>
                <div className="buttons mt-4">
                    <Link to="/contactspage" className="button is-link">View Contacts</Link>
                    <Link to="/sent-messages" className="button is-info">Sent Messages</Link>
                </div>
            </div>
        </div>
    )
}

export default Home;