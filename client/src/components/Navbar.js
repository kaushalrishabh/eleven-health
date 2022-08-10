import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../P-logo.png';

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand" >
                <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" />
                <span> ElevenHealth</span>
            </Link>
        </nav>
    )
}

export default Navbar;