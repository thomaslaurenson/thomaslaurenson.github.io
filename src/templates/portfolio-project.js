import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  IconButton,
  Typography,
  Divider,
  Box,
  Button,
} from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink } from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import ImageCard from "./image-card"

const useStyles = makeStyles(theme => ({
  socialIcon: {
    color: "black",
  },
}))

const PortfolioProject = ({ project }) => {
  const classes = useStyles()

  return (
    <Grid item xs={12} sm={6}>
      <Card variant="outlined">
        <ImageCard alt={project.img} filename={project.img} />
        <Divider />
        <CardHeader
          disableTypography
          title={
            <Typography variant="h5" color="textPrimary">
              <Box fontWeight="fontWeightBold" pb={2}>
                {project.name}
              </Box>
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="textSecondary">
              {project.description}
            </Typography>
          }
        />

        <Box pl={1} pr={1}>
          {project.tech.map((tag, i) => [
            <Box pl={0.5} pr={0.5} pb={1} display="inline-block" key={i}>
              <Button variant="outlined" disableElevation disabled>
                {tag}
              </Button>
            </Box>,
          ])}
        </Box>

        <CardActions disableSpacing>
          {project.github != null && (
            <IconButton>
              <a href={project.github} aria-label="Project GitHub Link">
                <FontAwesomeIcon
                  icon={faGithub}
                  className={classes.socialIcon}
                />
              </a>
            </IconButton>
          )}
          {project.url != null && (
            <IconButton>
              <a href={project.url} aria-label="Project Website Link">
                <FontAwesomeIcon icon={faLink} className={classes.socialIcon} />
              </a>
            </IconButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  )
}

export default PortfolioProject
