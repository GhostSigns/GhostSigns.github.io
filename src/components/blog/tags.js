import * as React from 'react'
import { Link } from 'gatsby'
import kebabCase from "lodash/kebabCase"

const Tags = ({tags}) => {
    return (
        <div className="blog-post-tags">
            {tags.map(tag => (
                <Link className="blog-post-tag" key={tag} to={`/tags/${kebabCase(tag)}`}>{tag}</Link> 
            ))}
        </div>
    )
}

export default Tags