import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import {
  Container,
  Box,
  Hidden,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  Typography,
  IconButton,
  Divider,
} from "@material-ui/core/"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: 1400,
    backgroundColor: "black",
  },
  toolbar: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  titleText: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    "&:hover": {
      color: "#666666",
    },
  },
  drawerPaper: {
    width: "calc(100vw - (100vw - 100%))",
    overflow: "auto",
  },
  fullList: {
    backgroundColor: "#222222",
  },
  socialIcon: {
    color: "white",
    "&:hover": {
      color: "#666666",
    },
  },
}))

const NavBar = () => {
  const classes = useStyles()

  const data = useStaticQuery(graphql`
    query NavBarSocialQuery {
      site {
        siteMetadata {
          social {
            email
            linkedin
            github
          }
        }
      }
    }
  `)

  const social = data.site.siteMetadata?.social

  const [open, setOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  const dropDownMenuList = () => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        <Link to="/about/" className={classes.titleText}>
          <ListItem style={{ display: "flex", justifyContent: "center" }}>
            <Box fontWeight="fontWeightBold">
              {" "}
              <Typography variant="h6" className={classes.titleText}>
                about
              </Typography>
            </Box>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/portfolio/" className={classes.titleText}>
          <ListItem style={{ display: "flex", justifyContent: "center" }}>
            <Box fontWeight="fontWeightBold">
              {" "}
              <Typography variant="h6" className={classes.titleText}>
                portfolio
              </Typography>
            </Box>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/blog/" className={classes.titleText}>
          <ListItem style={{ display: "flex", justifyContent: "center" }}>
            <Box fontWeight="fontWeightBold">
              {" "}
              <Typography variant="h6" className={classes.titleText}>
                blog
              </Typography>
            </Box>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link to="/tags/" className={classes.titleText}>
          <ListItem style={{ display: "flex", justifyContent: "center" }}>
            <Box fontWeight="fontWeightBold">
              {" "}
              <Typography variant="h6" className={classes.titleText}>
                tags
              </Typography>
            </Box>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <Box
        display="flex"
        justifyContent="center"
        justifyItems="center"
        pt={1}
        pb={1}
      >
        <Box p={2} display="inline">
          <a href={social?.email} aria-label="Email Link">
            <FontAwesomeIcon
              icon={faEnvelope}
              size="lg"
              className={classes.socialIcon}
            />
          </a>
        </Box>
        <Box p={2} display="inline">
          <a href={social?.github} aria-label="GitHub Link">
            <FontAwesomeIcon
              icon={faGithub}
              size="lg"
              className={classes.socialIcon}
            />
          </a>
        </Box>
        <Box p={2} display="inline">
          <a href={social?.linkedin} aria-label="LinkenIn Link">
            <FontAwesomeIcon
              icon={faLinkedinIn}
              size="lg"
              className={classes.socialIcon}
            />
          </a>
        </Box>
      </Box>
    </div>
  )

  const appBarList = () => (
    <div>
      <Link to="/about/">
        <Box display="inline-block" p={1} fontWeight="fontWeightBold">
          <Typography variant="h6" className={classes.titleText}>
            about
          </Typography>
        </Box>
      </Link>
      <Link to="/portfolio/">
        <Box
          display="inline-block"
          p={1}
          fontWeight="fontWeightBold"
          className={classes.titleText}
        >
          <Typography variant="h6" className={classes.titleText}>
            portfolio
          </Typography>
        </Box>
      </Link>
      <Link to="/blog/">
        <Box
          display="inline-block"
          p={1}
          fontWeight="fontWeightBold"
          className={classes.titleText}
        >
          <Typography variant="h6" className={classes.titleText}>
            blog
          </Typography>
        </Box>
      </Link>
      <Link to="/tags/">
        <Box
          display="inline-block"
          p={1}
          fontWeight="fontWeightBold"
          className={classes.titleText}
        >
          <Typography variant="h6" className={classes.titleText}>
            tags
          </Typography>
        </Box>
      </Link>
    </div>
  )

  const appBarListSocial = () => (
    <div>
      <Box pl={4} p={1} display="inline">
        <a href={social?.email} aria-label="Email Link">
          <FontAwesomeIcon
            icon={faEnvelope}
            size="lg"
            className={classes.socialIcon}
          />
        </a>
      </Box>
      <Box p={1} display="inline">
        <a href={social?.github} aria-label="GitHub Link">
          <FontAwesomeIcon
            icon={faGithub}
            size="lg"
            className={classes.socialIcon}
          />
        </a>
      </Box>
      <Box p={1} display="inline">
        <a href={social?.linkedin} aria-label="LinkedIn Link">
          <FontAwesomeIcon
            icon={faLinkedinIn}
            size="lg"
            className={classes.socialIcon}
          />
        </a>
      </Box>
    </div>
  )

  const appBarTitle = () => (
    <Typography variant="h5" className={classes.title}>
      <Link to="/" className={classes.titleText}>
        Thomas Laurenson
      </Link>
    </Typography>
  )

  return (
    <div className={classes.root}>
      <AppBar position="relative" className={classes.appBar}>
        {/* md, lg */}
        <Hidden smDown implementation="css">
          <Toolbar>
            <Container maxWidth="lg">
              <Box display="flex" alignItems="center">
                {appBarTitle()}
                {appBarList()}
                {appBarListSocial()}
              </Box>
            </Container>
          </Toolbar>
        </Hidden>

        {/* sm */}
        <Hidden xsDown mdUp implementation="css">
          <Toolbar>
            {appBarTitle()}
            {appBarList()}
          </Toolbar>
        </Hidden>

        {/* xs */}
        <Hidden smUp implementation="css">
          <Toolbar>
            {appBarTitle()}
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <FontAwesomeIcon icon={faBars} />
            </IconButton>
            <Drawer
              variant="temporary"
              classes={{
                paper: classes.drawerPaper,
              }}
              anchor="top"
              open={open}
              onClose={handleDrawerToggle}
            >
              <div className={classes.toolbar} />
              {dropDownMenuList()}
            </Drawer>
          </Toolbar>
        </Hidden>
      </AppBar>
    </div>
  )
}

export default NavBar
