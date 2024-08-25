import * as React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from 'gatsby-plugin-image'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   faLinkedin,
// } from '@fortawesome/free-brands-svg-icons'

const AuthorSection = ({author, posted}) => {
  const { site } = useStaticQuery(query)
  const authorBio = site.siteMetadata.authors
  const authorInfo = authorBio.filter(bio => bio.name === author)
  const { name, social } = authorInfo.length === 1 ? authorInfo[0] : authorBio.at(-1)

    return (
        <div className="post-author">
          {author === authorBio[0].name && <StaticImage className="post-author-image" src="../../images/blog/Clevedon_Ghost_Signs_Tam_Love.png" alt={`Author ${name}`} />}
            <div className="post-author-content">
              {/* <p className="post-author-name"><a href={social} target="_blank"><FontAwesomeIcon className="post-author-social" icon={faLinkedin} /></a> {name}</p> */}
              <p className="post-author-info">{posted}</p>
            </div>
        </div>
    )
}


export default AuthorSection

const query = graphql`
query {
  site {
    siteMetadata {
      authors {
        name
        social
      }
    }
  }
}
`