import React from "react"
import { Container, Grid, Box, Typography } from "@material-ui/core"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AboutHistory from "../templates/about-history"
import AboutSkills from "../templates/about-skills"
import AboutSkillsData from "../../content/yaml/skills.yml"

const About = () => {
  return (
    <Layout>
      <SEO title="About" />

      <Box pt={6} pb={4}>
        <Container maxWidth="md">
          <Box pb={2}>
            <Typography variant="h4" align="center">
              <Box fontWeight="fontWeightBold">A brief history</Box>
            </Typography>
          </Box>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <AboutHistory />
          </Grid>
        </Container>
      </Box>

      <Box pt={6} pb={4}>
        <Container maxWidth="lg">
          <Box pb={2}>
            <Typography variant="h4" align="center">
              <Box fontWeight="fontWeightBold">Developer skills</Box>
            </Typography>
          </Box>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            {AboutSkillsData.content.map((skill, index) => {
              return <AboutSkills skill={skill} key={index} />
            })}
          </Grid>
        </Container>
      </Box>
    </Layout>
  )
}

export default About
