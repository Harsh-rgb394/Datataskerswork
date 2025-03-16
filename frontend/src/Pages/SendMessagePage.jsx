import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SendMessagePage() {
    const [messages, setmessages] = useState([])

    const getallmessages = async () => {

        try {
            const response = await axios.get("https://datataskerswork.onrender.com/sent-messages");
            // console.log(response.data);
            if (response.data) {
                setmessages(response.data);
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getallmessages();
    })
    return (
        <div>
            {/* <h1>Send Message Page</h1> */}
            <div className="container mt-5">
                <h2 className="title is-4 has-text-link">Sent Messages</h2>

                <div className="box has-background-white-ter">
                    {messages.length === 0 ? (
                        <p className="has-text-centered has-text-grey">No messages sent yet.</p>
                    ) : (
                        <div className="table-container">
                            <table className="table is-fullwidth is-striped is-hoverable">
                                <thead>
                                    <tr>
                                        <th>Contact Name</th>
                                        <th>OTP</th>
                                        <th>Sent At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages?.map((msg, index) => (
                                        <tr key={index}>
                                            <td>{msg.contactName}</td>
                                            <td>
                                                <span className="tag is-info is-light">{msg.otp}</span>
                                            </td>
                                            <td>{new Date(msg.timestamp).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SendMessagePage;