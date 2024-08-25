import * as React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const PostPagination = ({prev, next}) => {
    return (
        <div className="blog-post-pagination">
            <div className={`blog-post-pagination-item ${prev ? "blog-post-pagination-item--prev" : ""}`}>
                {prev && (<>
                    <div className="blog-post-pagination-hero">
                        <Link to={`/blog${prev.fields.slug}`} rel="prev">
                            <GatsbyImage className="blog-post-pagination-image" image={getImage(prev.frontmatter.hero_image)} alt={prev.frontmatter.hero_image_alt} />
                        </Link>
                    </div>
                    <div className="blog-post-pagination-info">
                        <p>← Previous Sign</p>
                        <Link className="blog-post-pagination-info--title" to={`/blog${prev.fields.slug}`} rel="prev">
                            {prev.frontmatter.title.length > 35 ? `${prev.frontmatter.title.slice(0, 35)}...` : prev.frontmatter.title}
                        </Link>
                    </div>
                </>
                )}
            </div>
            <div className={`blog-post-pagination-item ${next ? "blog-post-pagination-item--next" : ""}`}>
                {next && (<>
                    <div className="blog-post-pagination-info">
                        <p>Next Sign →</p>
                        <Link className="blog-post-pagination-info--title" to={`/blog${next.fields.slug}`} rel="next">
                            {next.frontmatter.title.length > 35 ? `${next.frontmatter.title.slice(0, 35)}...` : next.frontmatter.title}
                        </Link>
                    </div>
                    <div className="blog-post-pagination-hero">
                        <Link to={`/blog${next.fields.slug}`} rel="next">
                            <GatsbyImage className="blog-post-pagination-image" image={getImage(next.frontmatter.hero_image)} alt={next.frontmatter.hero_image_alt} />
                        </Link>
                    </div>
                </>
                )}
            </div>
        </div>
    )
}

export default PostPagination