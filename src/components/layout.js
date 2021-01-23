import React from "react"
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles"

import NavBar from "./navbar"
import Footer from "./footer"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

const theme = createMuiTheme()
theme.typography.h3 = {
  fontFamily: "Montserrat",
}
theme.typography.h4 = {
  fontFamily: "Montserrat",
}
theme.typography.h5 = {
  fontFamily: "Montserrat",
}
theme.typography.h6 = {
  fontFamily: "Montserrat",
}
theme.typography.subtitle2 = {
  fontFamily: "Montserrat",
}
theme.typography.h4 = {
  fontSize: "1.7rem",
  "@media (min-width:600px)": {
    fontSize: "2.1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3.1rem",
  },
}

const Layout = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </ThemeProvider>
    </div>
  )
}

export default Layout
