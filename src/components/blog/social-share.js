import * as React from 'react'
import { useStaticQuery, graphql } from "gatsby"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   faFacebookF,  
//   faLinkedinIn,
//   faTwitter,
// } from '@fortawesome/free-brands-svg-icons'
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const SocialShare = ({slug, title}) => {
    const { site } = useStaticQuery(query)
    const url = `${site.siteMetadata.siteUrl}/blog${slug}`
    return (
        <div className="social-sharing">
            <h4>Share This Sign</h4>
            <ul>
                <li className="facebook-share-list">
                  <a className="facebook-share" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">
                    {/* <FontAwesomeIcon className="social-share-icon" icon={faFacebookF} />Facebook */}
                  </a>
                </li>
                <li className="linkedin-share-list">
                  <a className="linkedin-share" href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">
                    {/* <FontAwesomeIcon className="social-share-icon" icon={faLinkedinIn} />LinkedIn */}
                  </a>
                </li>
                <li className="twitter-share-list">
                  <a className="twitter-share" href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20ghost%20sign%20on%20Clevedon%20Ghost%20Signs&url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">
                    {/* <FontAwesomeIcon className="social-share-icon" icon={faTwitter} />Twitter */}
                  </a>
                </li>
                <li className="email-share-list">
                  <a className="email-share" href={`mailto:?subject=Check%20out%20this%20ghost%20sign%20on%20Clevedon%20Ghost%20Signs&body=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">
                    {/* <FontAwesomeIcon className="social-share-icon" icon={faEnvelope} />Email */}
                  </a>
                </li>
            </ul>
        </div>
    )
}
export default SocialShare

const query = graphql`
query {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

