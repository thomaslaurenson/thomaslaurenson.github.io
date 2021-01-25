import React from "react"
import {
  Container,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@material-ui/core"
import HomeAboutData from "../../content/yaml/about.yml"
import { PieChart } from "react-minimal-pie-chart"

const HomeAbout = () => {
  const pieChartData = [
    { title: "coder", value: 60, color: "#a4a5a5" },
    { title: "educator", value: 40, color: "#303030" },
  ]

  const shiftSize = 3

  const coder = HomeAboutData.content[0]
  const educator = HomeAboutData.content[1]

  return (
    <div>
      <Box pt={6} pb={4} bgcolor="#f5f8fa">
        <Container maxWidth="md">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography variant="h5" align="center">
                <Box fontWeight="fontWeightBold">{coder.title}</Box>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText>
                    {coder.list.map((item, index) => (
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
              <PieChart
                animate={true}
                animationDuration={1000}
                animationEasing="ease-out"
                paddingAngle={0}
                radius={PieChart.defaultProps.radius - shiftSize}
                segmentsShift={index => (index === 0 ? shiftSize : 0.5)}
                data={pieChartData}
                label={data => data.dataEntry.title}
                labelPosition={50}
                labelStyle={{
                  fontSize: "6px",
                  fill: "white",
                  fontWeight: "800",
                }}
                lineWidth={100}
                startAngle={72}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Typography variant="h5" align="center">
                <Box fontWeight="fontWeightBold">{educator.title}</Box>
              </Typography>
              <List>
                <ListItem>
                  <ListItemText>
                    {educator.list.map((item, index) => (
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
      <Divider />
    </div>
  )
}

export default HomeAbout
