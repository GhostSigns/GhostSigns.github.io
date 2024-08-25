import * as React from 'react'
import { Link } from 'gatsby'
import ClevedonGhostSignsLogo from '../images/Clevedon_Ghost_Signs_Logo.svg'
import { useState } from 'react'

const toggleNav = (e, setShowCollapsedNav, showCollapsedNav) => {
    e.preventDefault()
    setShowCollapsedNav(!showCollapsedNav)
}

const Nav = ({isHero}) => {
    const [showCollapsedNav, setShowCollapsedNav] = useState(false)
    return (
        <nav className={`navbar fixed-top navbar-expand-xl navbar-dark ${isHero ? "menu-scrolling-hero" : "menu-scrolling-content"}`}>
            <div className="me-auto tog-container">
                <Link className="navbar-brand" to="/">
                    <img src={ClevedonGhostSignsLogo} alt="Clevedon Ghost Signs Logo"/>
                </Link>
                <button className="navbar-toggler" type="button" onClick={(e) => toggleNav(e, setShowCollapsedNav, showCollapsedNav )} data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <div className={`collapse navbar-collapse nav-collapse ${showCollapsedNav ? "show" : ""}`} id="navbarCollapse">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link text-accent" to="/blog">Signs</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-accent" to="/about">About</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className="nav-link text-accent" to="/contact" rel="noreferrer">Contact</Link>
                    </li> */}
                </ul>
            </div>  
        </nav>
    )
}

export default Nav