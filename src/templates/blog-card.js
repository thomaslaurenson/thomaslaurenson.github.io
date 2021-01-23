import React from "react"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import { makeStyles } from "@material-ui/core/styles"
import {
  Box,
  Card,
  CardHeader,
  Typography,
  Divider,
  Grid,
} from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarWeek, faTags } from "@fortawesome/free-solid-svg-icons"
import ImageBlog from "./image-blog"

const useStyles = makeStyles(theme => ({
  titleText: {
    color: "black",
    textDecoration: "none",
    fontWeight: "bold",
    "&:hover": {
      color: "#666666",
    },
  },
  tagButtonLink: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      color: "#666666",
    },
  },
  tagsIcon: {
    marginLeft: "10px",
  },
}))

const BlogCard = ({ post }) => {
  const classes = useStyles()

  const title = post.frontmatter.title || post.fields.slug

  return (
    <Card elevation={0}>
      <article
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <CardHeader
            disableTypography
            title={
              <Link
                to={post.fields.slug}
                itemProp="url"
                className={classes.titleText}
              >
                <Box fontWeight="fontWeightBold">
                  <Typography
                    variant="h4"
                    color="textPrimary"
                    itemProp="headline"
                    className={classes.titleText}
                  >
                    {title}
                  </Typography>
                </Box>
                <Divider />
              </Link>
            }
            subheader={
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" pt={1}>
                    <Box>
                      <FontAwesomeIcon icon={faCalendarWeek} size="lg" />
                    </Box>
                    <Box pl={2}>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                        paragraph={false}
                      >
                        {post.frontmatter.date}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" justifyContent="flex-end" pt={1}>
                    <Box>
                      {post.frontmatter.tags.map((tag, index) => [
                        <Typography display="inline" key={index}>
                          <Link
                            to={`/tags/${kebabCase(tag)}/`}
                            rel="prev"
                            className={classes.tagButtonLink}
                          >
                            {tag}
                          </Link>
                          {post.frontmatter.tags.length !== index + 1
                            ? ",\u00A0"
                            : ""}
                        </Typography>,
                      ])}
                      <FontAwesomeIcon
                        icon={faTags}
                        size="lg"
                        className={classes.tagsIcon}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            }
          />
        </header>

        <ImageBlog
          alt={post.frontmatter.thumbnail}
          filename={post.frontmatter.thumbnail}
        />

        <section>
          <Box pt={1} pl={2} pr={2}>
            <Typography
              variant="body1"
              color="textSecondary"
              dangerouslySetInnerHTML={{
                __html: post.excerpt,
              }}
              itemProp="description"
            />
          </Box>
        </section>
      </article>
    </Card>
  )
}

export default BlogCard
