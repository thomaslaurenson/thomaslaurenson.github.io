import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Box, Card, Typography, Divider } from "@material-ui/core"
import ImageBadge from "./image-badge"

const useStyles = makeStyles(theme => ({
  skillBadge: {
    width: "128px",
    [theme.breakpoints.down("md")]: {
      width: "96px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "64px",
    },
  },
}))

const HomeSkills = ({ skill }) => {
  const classes = useStyles()

  return (
    <Grid item xs={12} md={6}>
      <Card elevation={0}>
        <Box pt={2}>
          <Typography variant="h5" color="textSecondary" align="center">
            <Box pb={1} fontWeight="fontWeightBold">
              {skill.name}
            </Box>
          </Typography>
        </Box>

        <Divider />
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          pt={2}
          pl={1}
          pr={1}
          pb={2}
          justifyContent="center"
        >
          {skill.list.map((language, index) => [
            <div className={classes.skillBadge} key={index}>
              <ImageBadge
                title={language}
                alt={language}
                filename={`${language.toLowerCase()}.png`}
              />
            </div>,
          ])}
        </Box>
      </Card>
    </Grid>
  )
}
export default HomeSkills
