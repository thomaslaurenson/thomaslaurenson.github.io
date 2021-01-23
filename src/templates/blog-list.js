import React from "react"
import { graphql, Link } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import { Container, Grid, Box, Button } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogCard from "../templates/blog-card"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  linkButton: {
    textDecoration: "none",
  },
}))

const BlogIndex = ({ data, pageContext }) => {
  const classes = useStyles()

  const posts = data.allMarkdownRemark.edges

  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/blog/" : `/blog/${currentPage - 1}`
  const nextPage = `/blog/${currentPage + 1}`

  return (
    <div className={classes.root}>
      <Layout>
        <SEO title="Blog posts" />

        <Container maxWidth="md">
          <Box pt={4} pb={3}>
            {posts.map(({ node }) => {
              return (
                <Box key={node.fields.slug} pt={2} pb={2}>
                  <BlogCard post={node} />
                </Box>
              )
            })}
          </Box>

          <nav className="blog-nav">
            <Box pb={3}>
              <Grid container>
                <Grid item xs={12} sm={12} md={6}>
                  <Box
                    display="flex"
                    width={"100%"}
                    justifyContent="flex-start"
                  >
                    {!isFirst && (
                      <Link
                        to={prevPage}
                        rel="prev"
                        className={classes.styledLink}
                      >
                        <Button
                          variant="contained"
                          startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                        >
                          Previous page
                        </Button>
                      </Link>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Box display="flex" width={"100%"} justifyContent="flex-end">
                    {!isLast && (
                      <Link
                        to={nextPage}
                        rel="next"
                        className={classes.styledLink}
                      >
                        <Button
                          variant="contained"
                          endIcon={<FontAwesomeIcon icon={faArrowRight} />}
                        >
                          Next page
                        </Button>
                      </Link>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </nav>
        </Container>
      </Layout>
    </div>
  )
}

export default BlogIndex

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 500)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            tags
            title
            description
            thumbnail
          }
        }
      }
    }
  }
`
