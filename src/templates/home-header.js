import React from "react"
import Image from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import {
  Container,
  Box,
  Typography,
  Divider,
  Grid,
  Hidden,
} from "@material-ui/core"

const HomeHeader = () => {
  const data = useStaticQuery(graphql`
    query ProfileQuery {
      image: file(absolutePath: { regex: "/profile.jpeg/" }) {
        childImageSharp {
          fluid(maxWidth: 400, maxHeight: 400, quality: 95) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const profile = data?.image?.childImageSharp?.fluid

  return (
    <div>
      <Box pt={6} pb={4}>
        <Container maxWidth="md">
          <Hidden xsDown>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Box display="flex" pr={2} pb={1} justifyContent="flex-end">
                  <Typography variant="h4">{"< coder >"}</Typography>
                </Box>
                <Hidden smDown>
                  <Box display="flex" pr={2}>
                    <Typography
                      variant="h5"
                      align="right"
                      color="textSecondary"
                    >
                      Security consultant and full stack developer with a DevOps mindset
                    </Typography>
                  </Box>
                </Hidden>
              </Grid>

              <Grid item xs={4}>
                <Box pb={2}>
                  <Image
                    fluid={profile}
                    alt={"Thomas Laurenson - <coder> and academic"}
                    imgStyle={{
                      borderRadius: `50%`,
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box display="flex" justifyContent="flex-start" pl={2} pb={1}>
                  <Typography variant="h4">{"educator"}</Typography>
                </Box>
                <Hidden smDown>
                  <Box display="flex" justifyContent="flex-start" pl={2}>
                    <Typography variant="h5" color="textSecondary">
                      Passionate teacher and researcher of InfoSec and Digitial
                      Forensics
                    </Typography>
                  </Box>
                </Hidden>
              </Grid>
            </Grid>
          </Hidden>
          <Hidden smUp>
            <Grid item xs={12}>
              <Box pb={2} pl={3} pr={3}>
                <Image
                  fluid={profile}
                  alt={"Thomas Laurenson - <coder> and academic"}
                  imgStyle={{
                    borderRadius: `50%`,
                  }}
                />
              </Box>
            </Grid>
          </Hidden>
        </Container>
      </Box>
      <Divider />
    </div>
  )
}

export default HomeHeader
