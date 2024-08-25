module.exports = {
  siteMetadata: {
    title: `Clevedon Ghost Signs · An archive of the remaining ghost signs of Clevedon`,
    shortTitle: `Clevedon Ghost Signs`,
    siteUrl: `https://clevedonghostsigns.co.uk`,
    titleTemplate: `%s · Clevedon Ghost Signs`,
    description:
      ``,
    image: `/clevedon-ghost-signs-og-image.jpg`,
    keywords: ``,
    // maskedIcon: `/safari-pinned-tab.svg`,
    authors: [
      {
        name: `Tam Love-Pryde`,
        social: `https://www.linkedin.com/in/tamlove`,
      }
    ]
  },
  plugins: [ 
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Clevedon Ghost Signs`,
      short_name: `CGS`,
      start_url: `/`,
      background_color: `#122C54`,
      theme_color: `#122C54`,
      lang: `en`,
      display: `standalone`,
      icon: `src/images/icon.png`,
      cache_busting_mode: `query`,
    },
  },
    "gatsby-plugin-sitemap", 
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Clevedon Ghost Signs RSS Feed",
          },
        ],
      },
    },
    `gatsby-plugin-preload-fonts`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
        path: `${__dirname}/src/articles`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`
  ]
};