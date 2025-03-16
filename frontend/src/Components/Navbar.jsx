import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Navbar() {
    const [isActive, setIsActive] = useState(false);

    return (
        <nav className="navbar has-background-light" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item has-text-link">
                    📞 Contacts App
                </Link>
                <a
                    role="button"
                    className={`navbar-burger ${isActive ? "is-active" : ""}`}
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarMenu"
                    onClick={() => setIsActive(!isActive)}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbarMenu" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
                <div className="navbar-end">
                    <Link to="/contactspage" className="navbar-item has-text-info">Contacts</Link>
                    <Link to="/sent-messages" className="navbar-item has-text-info">Sent Messages</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;