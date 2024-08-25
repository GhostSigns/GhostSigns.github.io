import React from "react"
import PropTypes from "prop-types"
import kebabCase from "lodash/kebabCase"
import { Link, graphql } from "gatsby"
import { useState } from 'react'
import Layout from "../components/layout"
import Pagination from "../components/blog/pagination"
import { Waypoint } from 'react-waypoint'
import SEO from '../components/seo'

const TagsPage = ({data, pageContext}) => {
  const [isHero, setIsHero] = useState(true)
  const group = data.allMdx.group
  const {limit, skip, currentPage, numPages} = pageContext
  const tagsNum = group.slice(skip).length
  const tags = tagsNum < limit ? group.slice(skip, tagsNum + skip) : group.slice(skip, limit + skip)

  return (
    <Layout isHero={isHero} simpleNav={true}>
      <header className="blog-page-header">
        <h1>Tags</h1>
        <h3>Looking to read more?</h3>
      </header> 
      <Waypoint onEnter={() => setIsHero(true)} onLeave={() => setIsHero(false)} topOffset={100} />
      <div className="container">
        <div className="row tags-page">
          <div className="col-12">
            <p className="blog-breadcrumbs"><Link to="/blog">Blog</Link> {'>'} <Link to="/tags">Tags</Link></p>
            <ul className="tags-page-list">
              {tags.map(tag => (
                <li key={tag.fieldValue}>
                  <Link className="blog-post-tag" to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                    {tag.fieldValue} <span className="tag-count">({tag.totalCount})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Pagination currentPage={currentPage} numPages={numPages} isBlogPage={false} />
      </div>
  </Layout>
  )
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query tagsListQuery($skip: Int!, $limit: Int!){
    allMdx(
        limit: 2000
    ) {
      group(
          field: frontmatter___tags
          limit: $limit
          skip: $skip
          ) {
        fieldValue
        totalCount
      }
    }
  }
`

export const Head = () => (
  <SEO title="Tags" description="Discover more signs and content from Clevedon Ghost Signs" article={false} />
)