import * as React from 'react'
import { Link } from 'gatsby'
import kebabCase from "lodash/kebabCase"

const Pagination = ({currentPage, numPages, isBlogPage, tagName}) => {
    const tagPath = tagName ? `${kebabCase(tagName)}/` : ``
    const pagPath = isBlogPage ? `/blog/` : `/tags/${tagPath}`
    return (
        <div className="blog-page-pagination">
            <div className="blog-page-pagination-prev">
                {numPages > 1 && currentPage !== 1 && 
                    <Link className="btn" to={`${currentPage === 2 ? pagPath : `${pagPath}${currentPage - 1}`}`}> <span>Prev</span></Link>
                } 
            </div>
            <div>
                {numPages > 1 &&
                    <p className="blog-page-pagination-total">{" "}{currentPage}/{numPages}{" "}</p>
                }
            </div>
            <div className="blog-page-pagination-next">
                {currentPage !== numPages &&
                    <Link className="btn" to={`${pagPath}${currentPage + 1}`}><span>Next</span> </Link>
                }                   
            </div>
        </div>
    )
}

export default Pagination