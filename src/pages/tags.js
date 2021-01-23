import React from "react"
import { Link, graphql } from "gatsby"
import PropTypes from "prop-types"
import { Container, Grid, Box, Button } from "@material-ui/core"
import kebabCase from "lodash/kebabCase"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Header from "../components/header"

const TagsPage = ({ data }) => {
  const group = data.allMarkdownRemark.group

  return (
    <Layout>
      <SEO title="Blog tags" />
      <Header title="Blog tags" summary="" />
      <Container maxWidth="sm">
        <Box pt={4} pb={4}>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              {group.map((tag, index) => [
                <Link to={`/tags/${kebabCase(tag.fieldValue)}/`} key={index}>
                  <Box pl={2} pr={2} pb={2} display="inline-block">
                    <Button variant="contained">
                      {/* TODO: Convert tags to sentence case */}
                      {tag.fieldValue} ({tag.totalCount})
                    </Button>
                  </Box>
                </Link>,
              ])}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  )
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
