import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useState } from 'react'
import kebabCase from "lodash/kebabCase"
import Layout from "../components/layout"
import { Waypoint } from 'react-waypoint'
import Pagination from "../components/blog/pagination"
import SEO from '../components/seo'

const Tags = ({ pageContext, data }) => {
  const [isHero, setIsHero] = useState(true)
  const { tag, currentPage, numPages } = pageContext
  const { edges, totalCount } = data.allMdx
  return (
    <Layout isHero={isHero} simpleNav={true}>
      <header className="blog-page-header">
        <h1>{tag}</h1>
        <h3>{`${totalCount} article${totalCount === 1 ? "" : "'s"} tagged with "${tag}"`}</h3>
      </header> 
      <Waypoint onEnter={() => setIsHero(true)} onLeave={() => setIsHero(false)} topOffset={100} />
      <div className="container">
        <div className="row tag-page">
          <div className="col-12">
          <p className="blog-breadcrumbs"><Link to="/blog">Blog</Link> {'>'} <Link to="/tags">Tags</Link> {'>'} <Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link></p>
            <ul className="standard-post-list">
              {
                edges.map(n => (
                  <article className="standard-post-list-item" key={n.node.id} itemScope itemType="http://schema.org/Article">
                    <div className="standard-post-list-hero">
                      <Link className="standard-post-list-hero--link" to={`/blog${n.node.fields.slug}`}>
                        <GatsbyImage className="standard-post-list-image" image={getImage(n.node.frontmatter.hero_image)} alt={n.node.frontmatter.hero_image_alt} />
                      </Link>
                    </div>
                    <div className="standard-post-list-info">
                      <h3 className="standard-post-list-title">
                        <Link className="standard-post-list-title--link" to={`/blog${n.node.fields.slug}`}>
                          {n.node.frontmatter.title.length > 35 ? `${n.node.frontmatter.title.slice(0, 35)}...` : n.node.frontmatter.title}
                        </Link>
                      </h3>
                      <hr className="standard-post-list-divider" />
                      <p>{n.node.frontmatter.date}</p>
                    </div>
                  </article>
                ))
              }
            </ul>
          </div>
        </div>
        <Pagination currentPage={currentPage} numPages={numPages} tagName={tag} />
      </div>
    </Layout>
  )
}
Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String, $skip: Int!, $limit: Int!) {
    allMdx(
      limit: $limit
      skip: $skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            hero_image_alt
            hero_image {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          id
          excerpt
        }
      }
    }
  }
`

export const Head = ({pageContext}) => (
  <SEO title={`Tag: ${pageContext.tag}`}  article={false} />
)