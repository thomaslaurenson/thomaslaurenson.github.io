import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Box, Divider, Typography } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCoffee,
  faBeer,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  styledLink: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      color: "#666666",
    },
  },
  footerContainer: {
    backgroundColor: "#f5f8fa",
  },
  scrollUp: {
    width: "100px",
    height: "50px",
    marginBottom: "-10px",
    backgroundColor: "#f5f8fa",
    borderRadius: "150px 150px 0 0",
    border: "1px solid #e0e0e0",
    borderBottomColor: "#f5f8fa",
    transitionProperty: "all",
    transitionDuration: "0.3s",
    transitionTimingFunction: "ease",
    transitionDelay: "0s",
    "&:hover": {
      color: "#666666",
      MozTransform: "translateY(-9px)",
      MsTransform: "translateY(-9px)",
      OTransform: "translateY(-9px)",
      WebkitTransform: "translateY(-9px)",
      transform: "translateY(-9px)",
    },
  },
}))

const Footer = () => {
  const classes = useStyles()

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className={classes.root}>
      <Box display="flex" width={"100%"} justifyContent="center">
        <Box
          className={classes.scrollUp}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={scrollTop}
        >
          <FontAwesomeIcon icon={faChevronUp} size="lg" />
        </Box>
      </Box>
      <Divider />
      <footer className={classes.footerContainer}>
        <Grid container>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" pt={2} pb={2}>
              <Typography variant="body2">
                © {new Date().getFullYear()}, Thomas Laurenson
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" pb={2} pr={1} pl={1}>
              <Typography variant="body2">
                Built with <FontAwesomeIcon icon={faCoffee} /> and{" "}
                <FontAwesomeIcon icon={faBeer} /> using{" "}
                <a
                  href="https://www.gatsbyjs.com"
                  className={classes.styledLink}
                >
                  Gatsby
                </a>
                ,{" "}
                <a
                  href="https://material-ui.com/"
                  className={classes.styledLink}
                >
                  Material UI
                </a>{" "}
                and{" "}
                <a
                  href="https://fontawesome.com/"
                  className={classes.styledLink}
                >
                  Font Awesome
                </a>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </footer>
    </div>
  )
}

export default Footer
