import React from "react"
import { Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"
import { makeStyles } from "@material-ui/core/styles"
import { Container, Grid, Box, Typography, Divider } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCalendarWeek,
  faTags,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons"

import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"
import ImageBlog from "./image-blog"

const useStyles = makeStyles(theme => ({
  styledLink: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      color: "#666666",
    },
  },
  "@global": {
    "ul li p": {
      margin: 0,
    },
  },
}))

const BlogPostTemplate = ({ data }) => {
  const classes = useStyles()
  const post = data.markdownRemark
  const { previous, next } = data

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Header
        title={post.frontmatter.title}
        summary={post.frontmatter.description}
      />
      <Container maxWidth="md">
        <article
          className="post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <Box pb={2}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" pt={1}>
                    <Box>
                      <FontAwesomeIcon icon={faCalendarWeek} size="lg" />
                    </Box>
                    <Box pl={2}>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                        paragraph={false}
                      >
                        {post.frontmatter.date}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="flex-end" pt={1}>
                    <Box>
                      {post.frontmatter.tags.map((tag, index) => [
                        <Typography display="inline" key={index}>
                          <Link
                            to={`/tags/${kebabCase(tag)}/`}
                            rel="prev"
                            className={classes.styledLink}
                          >
                            {tag}
                          </Link>
                          {post.frontmatter.tags.length !== index + 1
                            ? ",\u00A0"
                            : ""}
                        </Typography>,
                      ])}
                    </Box>
                    <Box pl={2}>
                      <FontAwesomeIcon icon={faTags} size="lg" />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </header>

          <Box pb={3}>
            <ImageBlog
              alt={post.frontmatter.thumbnail}
              filename={post.frontmatter.thumbnail}
            />
          </Box>

          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
          <Divider />
        </article>
        <nav className="post-nav">
          <Box pb={5}>
            <Grid container>
              <Grid item xs={12} sm={12} md={6}>
                <Box display="flex" width={"100%"} justifyContent="flex-start">
                  {previous && (
                    <Link
                      to={`/blog${previous.fields.slug}`}
                      rel="prev"
                      className={classes.styledLink}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                      {` `}
                      {previous.frontmatter.title}
                    </Link>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box display="flex" width={"100%"} justifyContent="flex-end">
                  {next && (
                    <Link
                      to={`/blog${next.fields.slug}`}
                      rel="next"
                      className={classes.styledLink}
                    >
                      {next.frontmatter.title}
                      {` `}
                      <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </nav>
      </Container>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        description
        thumbnail
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
