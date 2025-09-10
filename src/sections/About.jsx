import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
} from '@mui/material';
import {PieChart, pieChartDefaultProps} from 'react-minimal-pie-chart';
import { aboutData } from '../data/constants';

const About = () => {
  const shiftSize = 3;

  return (
    <Box pt={6} pb={4} id='about'>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
      >

        {/* coder */}
        <Grid size={{ sm: 12 , md: 4 }}>
          <Typography variant='h5' align='center'>
            <Box fontWeight='fontWeightBold'>part coder</Box>
          </Typography>
          <List>
            <ListItem>
              <ListItemText>
                {aboutData.coder.map((item, index) => (
                  <Typography
                    variant='h6'
                    color='textSecondary'
                    key={index}
                  >
                    <Box display='flex' justifyContent='center' pb={1}>
                      {item}
                    </Box>
                  </Typography>
                ))}
              </ListItemText>
            </ListItem>
          </List>
        </Grid>

        {/* pie chart */}
        <Grid size={{ sm: 12 , md: 4 }}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid size={{ xs: 12 }}>
              <PieChart
                animate={true}
                animationDuration={2000}
                animationEasing='ease-out'
                paddingAngle={0}
                radius={pieChartDefaultProps.radius - shiftSize}
                segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
                data={aboutData.pieChartData}
                label={(data) => data.dataEntry.title}
                labelPosition={50}
                labelStyle={{
                  fontSize: '6px',
                  fill: 'white',
                  fontWeight: '800',
                }}
                lineWidth={100}
                startAngle={72}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* educator */}
        <Grid size={{ sm: 12 , md: 4 }}>
          <Typography variant='h5' align='center'>
            <Box fontWeight='fontWeightBold'>part educator</Box>
          </Typography>
          <List>
            <ListItem>
              <ListItemText>
                {aboutData.educator.map((item, index) => (
                  <Typography
                    variant='h6'
                    color='textSecondary'
                    key={index}
                  >
                    <Box display='flex' justifyContent='center' pb={1}>
                      {item}
                    </Box>
                  </Typography>
                ))}
              </ListItemText>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;
