import * as React from 'react'
import { Link } from 'gatsby'


function Footer() {
    return (
        <footer className="footer-container">
            <div className="container-fluid">
                <div className="row">
                    <div className='offset-md-1 col-md-11 footer-credit'>
                        <p>Copyright © <Link to="/">Clevedon Ghost Signs</Link>.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer