import React from "react"
import { Container, Box, Typography } from "@material-ui/core"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => {
  return (
    <Layout>
      <SEO title="404: Not Found" />
      <Box pt={6} pb={4}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            <Box fontWeight="fontWeightBold">404: Not Found</Box>
          </Typography>
          <Box fontStyle="italic" pb={20}>
            <Typography align="center" color="textSecondary" paragraph>
              You just hit a route that doesn&#39;t exist... oh the sadness.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Layout>
  )
}

export default NotFoundPage
