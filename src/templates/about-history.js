import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Grid,
  Box,
  Card,
  CardHeader,
  Avatar,
  Typography,
  Divider,
} from "@material-ui/core"
import HomeHistoryData from "../../content/yaml/history.yml"
import ImageIcon from "./image-icon"

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}))

const AboutHistory = () => {
  const classes = useStyles()

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      {HomeHistoryData.content.map((data, index) => (
        <Box p={0.5} width={"100%"} key={index}>
          <Grid item xs={12}>
            <Card elevation={0}>
              <CardHeader
                disableTypography
                avatar={
                  <Avatar variant="square" className={classes.large}>
                    <ImageIcon alt={data.avatar} filename={data.avatar} />
                  </Avatar>
                }
                title={
                  <Typography variant="h6" color="textPrimary">
                    {data.position}
                  </Typography>
                }
                subheader={
                  <Grid container justify="space-between">
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="textSecondary">
                        {data.company}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        align="right"
                      >
                        {data.dates}
                      </Typography>
                    </Grid>
                  </Grid>
                }
              />
            </Card>
            <Divider />
          </Grid>
        </Box>
      ))}
    </Grid>
  )
}

export default AboutHistory
