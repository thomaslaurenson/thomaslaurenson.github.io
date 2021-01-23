import React from "react"
import { graphql } from "gatsby"
import { Container, Box } from "@material-ui/core"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogCard from "../templates/blog-card"
import Header from "../components/header"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const totalCount = data.allMarkdownRemark.totalCount
  const posts = data.allMarkdownRemark.nodes

  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout>
      <SEO title="Blog tags" />
      <Header title={tagHeader} summary="" />
      <Container maxWidth="md">
        <Box pt={4} pb={3}>
          {posts.map(post => {
            return (
              <Box key={post.fields.slug} pt={2} pb={6}>
                <BlogCard post={post} />
              </Box>
            )
          })}
        </Box>
      </Container>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      nodes {
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
`
