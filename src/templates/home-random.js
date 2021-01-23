import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import {
  Container,
  Grid,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core"

import HomeRandomData from "../../content/yaml/random.yml"

const HomeRandom = () => {
  const data = useStaticQuery(graphql`
    query RandomQuery {
      image: file(absolutePath: { regex: "/random.jpeg/" }) {
        childImageSharp {
          fluid(maxWidth: 400, maxHeight: 400, quality: 95) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const random = data?.image?.childImageSharp?.fluid

  const tech = HomeRandomData.content[0]
  const life = HomeRandomData.content[1]

  return (
    <div>
      <Box pt={6} pb={4}>
        <Container maxWidth="md">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography variant="h5" align="center">
                <Box fontWeight="fontWeightBold">{tech.title}</Box>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText>
                    {tech.list.map((item, index) => (
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        key={index}
                      >
                        <Box display="flex" justifyContent="center" pb={1}>
                          {item}
                        </Box>
                      </Typography>
                    ))}
                  </ListItemText>
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={6} sm={4}>
              <Box pb={2}>
                <Image
                  fluid={random}
                  alt={"Randomness"}
                  imgStyle={{
                    borderRadius: `50%`,
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="h5" align="center">
                <Box fontWeight="fontWeightBold">{life.title}</Box>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText>
                    {life.list.map((item, index) => (
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        key={index}
                      >
                        <Box display="flex" justifyContent="center" pb={1}>
                          {item}
                        </Box>
                      </Typography>
                    ))}
                  </ListItemText>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  )
}

export default HomeRandom
