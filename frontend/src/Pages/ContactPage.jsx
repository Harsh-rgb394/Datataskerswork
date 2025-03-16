import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"


function ContactPage() {
    const [contacts, setcontacts] = useState([]);

    const fetchallcontacts = async () => {
        try {
            const response = await axios.get("/Contact.json");
            console.log(response.data);

            if (response) {
                setcontacts(response.data);
            }

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {
        fetchallcontacts();
    }, [])
    return (
        // <div>
        //     <h1>Contact Page</h1>
        // </div>
        <div className="container mt-5">
            <h2 className="title is-4 has-text-link">Contacts</h2>

            <div className="box has-background-white-ter">
                <div className="columns is-multiline">
                    {contacts?.map((contact) => (
                        <div key={contact.id} className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
                            <div className="card">
                                <div className="card-content">
                                    <p className="title is-5">{contact.firstName} {contact.lastName}</p>
                                    <Link to={`/contact/${contact.id}`} className="button is-link is-light is-fullwidth">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ContactPage;