module.exports = {
  siteMetadata: {
    title: `Thomas Laurenson`,
    author: {
      name: `Thomas Laurenson`,
      summary: `Developer, teacher, and researcher in the fields of Digital Forensics, Information Security and DevOps`,
    },
    description: `Personal portfolio and blog for Thomas Laurenson.`,
    siteUrl: `https://thomaslaurenson.com`,
    social: {
      email: `mailto:thomas@thomaslaurenson.com`,
      linkedin: `https://www.linkedin.com/in/thomaslaurenson`,
      github: `https://github.com/thomaslaurenson`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets/badges`,
        name: `badges`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets/cards`,
        name: `cards`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets/icons`,
        name: `icons`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: "Contents",
              tight: true,
              ordered: false,
              fromHeading: 1,
              toHeading: 3,
              className: "table-of-contents",
            },
          },
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
              showCaptions: ['title'],              markdownCaptions: true
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [],
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-fontawesome-css`,
    `gatsby-redirect-from`,
    `gatsby-plugin-meta-redirect`,
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-121684762-1`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/images/t.svg`,
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
