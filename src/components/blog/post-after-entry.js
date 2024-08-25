import * as React from 'react'
import { Link } from 'gatsby'
import SocialShare from './social-share'

const AfterPostEntry = ({slug, title}) => {
    return (
        <>
            <SocialShare slug={slug} title={title} />
            <div className="blog-post-after-entry">

                <div className="blog-post-after-entry-info">
                    <h4></h4>
                    <p></p>
                    <Link className="btn" to="/">Learn More</Link>
                </div>
            </div>
        </>
    )
}

export default AfterPostEntry