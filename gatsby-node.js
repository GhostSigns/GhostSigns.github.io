const path = require(`path`)
const {
    createFilePath
} = require(`gatsby-source-filesystem`)
const _ = require("lodash")

exports.createPages = async ({
    graphql,
    actions,
    reporter
}) => {
    const {
        createPage
    } = actions

    // Define templates
    const blogPost = path.resolve(`./src/templates/blog-post.js`)
    const blogPostsList = path.resolve(`./src/templates/blog-posts-list.js`)
    const tagsList = path.resolve(`./src/templates/tags-list.js`)
    const tagTemplate = path.resolve(`./src/templates/tag.js`)

    // Get all markdown blog posts sorted by date and all tags
    const result = await graphql(
        `
        {
          allMdx(
            sort: { fields: [frontmatter___date], order: ASC }
            limit: 1000
          ) {
            nodes {
              id
              fields {
                slug
              }
              internal {
                contentFilePath
              }
            }
          }
          tagsGroup: allMdx(limit: 2000) {
            group(field: frontmatter___tags) {
              fieldValue
              totalCount
            }
          }
        }
      `
    )

    if (result.errors) {
        reporter.panicOnBuild(
            `There was an error loading your blog posts`,
            result.errors
        )
        return
    }

    // Extract blog post data from query
    const posts = result.data.allMdx.nodes
    // Create blog post pages
    if (posts.length > 0) {
        posts.forEach((post, index) => {
            const previousPostId = index === 0 ? null : posts[index - 1].id
            const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

            createPage({
                path: `/blog${post.fields.slug}`,
                component: `${blogPost}?__contentFilePath=${post.internal.contentFilePath}`,
                context: {
                    id: post.id,
                    previousPostId,
                    nextPostId,
                },
            })
        })
    }

    // Create blog posts list page with pagination
    const postsPerPage = 4
    const numPages = Math.ceil(posts.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
            path: i === 0 ? `/blog` : `/blog/${i + 1}`,
            component: blogPostsList,
            context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numPages,
                currentPage: i + 1,
            },
        })
    })

    // Extract tag data from query
    const tags = result.data.tagsGroup.group

    // Create tags list page with pagination
    const tagsPerPage = 10
    const numTagPages = Math.ceil(tags.length / tagsPerPage)
    Array.from({ length: numTagPages }).forEach((tag, i) => {
        createPage({
            path: i === 0 ? `/tags` : `/tags/${i + 1}`,
            component: tagsList,
            context: {
                limit: tagsPerPage,
                skip: i * tagsPerPage,
                numPages: numTagPages,
                currentPage: i + 1,
            },
        })
    })

    // Create tags detail page with pagination
    const tagsPerDetailPage = 4
    tags.forEach((tag) => {
        const numTagDetailPages = Math.ceil(tag.totalCount / tagsPerDetailPage)

        Array.from({ length: numTagDetailPages}).forEach((tagInner, i) => {
            createPage({
                path: i === 0 ? `/tags/${_.kebabCase(tag.fieldValue)}/` : `/tags/${_.kebabCase(tag.fieldValue)}/${i + 1}`,
                component: tagTemplate,
                context: {
                    tag: tag.fieldValue,
                    limit: tagsPerDetailPage,
                    skip: i * tagsPerDetailPage,
                    numPages: numTagDetailPages,
                    currentPage: i + 1,
                },
            })
        })
    })
}

// Create nodes
exports.onCreateNode = ({
    node,
    actions,
    getNode
}) => {
    const {
        createNodeField
    } = actions

    if (node.internal.type === `Mdx`) {
        const value = createFilePath({
            node,
            getNode
        })

        createNodeField({
            name: `slug`,
            node,
            value,
        })
    }
}