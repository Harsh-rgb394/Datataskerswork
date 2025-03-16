import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const ContactDetails = () => {
    const { id } = useParams();
    const [contact, setcontact] = useState(null);
    // const contact = contacts.find((c) => c.id === Number(id));
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("/Contact.json").then((res) => {
            setcontact(res.data.find((c) => c.id === parseInt(id)));
        });
    }, [id]);

    // TP1UL2RPXTEQZPXMRTG3EJ1L reovering code for twillio
    const handleSendOTP = async () => {
        try {
            const response = await axios.post("http://localhost:5000/send-otp", {
                contactName: `${contact.firstName} ${contact.lastName}`,
                phone: contact.phone
            })
            if (response.data.success) {
                setMessage(response.data.message);
            }

        } catch (error) {
            console.error(error);

        }


    }

    if (!contact) {
        return <div>Loading...</div>
    }
    return (
        <div className="container mt-5">
            <div className="box">
                <h2 className="title is-4 has-text-centered">
                    {contact?.firstName} {contact?.lastName}
                </h2>

                <p className="subtitle is-6 has-text-centered">
                    📞 Phone: <strong>{contact?.phone}</strong>
                </p>

                <div className="buttons is-centered">
                    <button className="button is-primary is-fullwidth" onClick={handleSendOTP}>
                        Send OTP
                    </button>
                </div>

                {message && (
                    <div className="notification is-success mt-3 has-text-centered">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactDetails;