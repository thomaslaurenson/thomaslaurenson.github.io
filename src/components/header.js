import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Container, Box, Typography, Divider } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: "#f5f8fa",
  },
}))

const Header = ({ title, summary }) => {
  const classes = useStyles()

  return (
    <div className={classes.heroContent}>
      <Box pt={6} pb={4}>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            <Box fontWeight="fontWeightBold">{title}</Box>
          </Typography>
          <Box fontStyle="italic">
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              {summary}
            </Typography>
          </Box>
        </Container>
      </Box>
      <Divider />
    </div>
  )
}

export default Header
