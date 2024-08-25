import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useState } from 'react'
import Layout from '../components/layout'
import Pagination from '../components/blog/pagination'
import Tags from '../components/blog/tags'
import AuthorSection from '../components/blog/author'
import { Waypoint } from 'react-waypoint'
import SEO from '../components/seo'

const BlogPage = ({data, pageContext}) => {
    const [isHero, setIsHero] = useState(true)
    const {currentPage, numPages} = pageContext
    const firstPost = data.allMdx.nodes[0]
    const slug = firstPost.fields.slug
    return (
        <Layout isHero={isHero} simpleNav={true}>
            <header className="blog-page-header">
                <h1>Signs</h1>
                <h3>The ghost signs of Clevedon</h3>
            </header> 
            <Waypoint onEnter={() => setIsHero(true)} onLeave={() => setIsHero(false)} topOffset={100} />
            <div className="container"> 
                <div className="row blog-page">
                    {currentPage === 1 ? <>
                        <div className="col-lg-6 col-xl-7">
                            <article className="featured-post" key={firstPost.id} itemScope itemType="http://schema.org/Article">
                                <Link to={`/blog${slug}`}>    
                                    <GatsbyImage className="featured-post-hero" image={getImage(firstPost.frontmatter.hero_image)} alt={firstPost.frontmatter.hero_image_alt} />
                                </Link>
                                <div className="featured-post-info">
                                    <h2 className="featured-post-title">
                                        <Link className="featured-post-title--link" to={`/blog${slug}`}>
                                            {firstPost.frontmatter.title}
                                        </Link>
                                    </h2>
                                    <Tags tags={firstPost.frontmatter.tags} />
                                    <AuthorSection author={firstPost.frontmatter.author} 
                                        posted={firstPost.frontmatter.date} />
                                    <p className="featured-post-excerpt">{firstPost.excerpt}</p>
                                </div>
                            </article>
                        </div>
                        <div className="col-lg-6 col-xl-5">
                            <ul className="featured-post-list">
                                {
                                    data.allMdx.nodes.filter(node => node.id !== firstPost.id).map(node => (
                                        <article className="featured-post-list-item" key={node.id} itemScope itemType="http://schema.org/Article">
                                            <div className="featured-post-list-hero">
                                                <Link className="featured-post-list-hero--link" to={`/blog${node.fields.slug}`}>
                                                    <GatsbyImage className="featured-post-list-image" image={getImage(node.frontmatter.hero_image)} alt={node.frontmatter.hero_image_alt} />
                                                </Link>
                                            </div>
                                            <div className="featured-post-list-info">
                                                <h3 className="featured-post-list-title">
                                                    <Link className="featured-post-list-title--link" to={`/blog${node.fields.slug}`}>
                                                        {node.frontmatter.title.length > 35 ? `${node.frontmatter.title.slice(0, 35)}...` : node.frontmatter.title}
                                                    </Link>
                                                </h3>
                                                <hr className="featured-post-list-divider" />
                                                <p>{node.frontmatter.date}</p>
                                            </div>
                                        </article>
                                    ))
                                }
                            </ul>
                        </div>
                    </> :  
                        <div className="col-12">
                            <ul className="standard-post-list">
                                {
                                    data.allMdx.nodes.map(node => (
                                        <article className="standard-post-list-item" key={node.id} itemScope itemType="http://schema.org/Article">
                                            <div className="standard-post-list-hero">
                                                <Link className="standard-post-list-hero--link" to={`/blog${node.fields.slug}`}>
                                                    <GatsbyImage className="standard-post-list-image" image={getImage(node.frontmatter.hero_image)} alt={node.frontmatter.hero_image_alt} />
                                                </Link>
                                            </div>
                                            <div className="standard-post-list-info">
                                                <h3 className="standard-post-list-title">
                                                    <Link className="standard-post-list-title--link" to={`/blog${node.fields.slug}`}>
                                                        {node.frontmatter.title.length > 35 ? `${node.frontmatter.title.slice(0, 35)}...` : node.frontmatter.title}
                                                    </Link>
                                                </h3>
                                                <hr className="standard-post-list-divider" />
                                                <p>{node.frontmatter.date}</p>
                                            </div>
                                        </article>
                                    ))
                                }
                            </ul>
                        </div>}
                </div>
                <Pagination currentPage={currentPage} numPages={numPages} isBlogPage={true} />
            </div>
        </Layout>
    )
}

export const query = graphql`
    query blogListQuery($skip: Int!, $limit: Int!) {
        allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: $limit
        skip: $skip
        ) {
            nodes {
                fields {
                    slug
                }
                frontmatter {
                    date(formatString: "MMMM D, YYYY")
                    title
                    author
                    hero_image_alt
                    hero_image {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                    tags
                }
                id
                excerpt
            }
        }
    }
`

export default BlogPage

export const Head = () => (
    <SEO title="Signs" description="The ghost signs of CLevedon" keywords="Ghost Signs, Clevedon, Lettering, Hand Lettering, Signs" article={false} />
)