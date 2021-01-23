import React from "react"
import { Container, Grid, Box } from "@material-ui/core"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PortfolioProjectData from "../../content/yaml/projects.yml"
import PortfolioProject from "../templates/portfolio-project"

const Portfolio = () => {
  return (
    <Layout>
      <SEO title="Portfolio" />

      <Box pt={6} pb={4}>
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={3}
          >
            {PortfolioProjectData.content.map((project, index) => {
              return <PortfolioProject project={project} key={index} />
            })}
          </Grid>
        </Container>
      </Box>
    </Layout>
  )
}

export default Portfolio
