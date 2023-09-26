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

const About = () => {
  const pieChartData = [
    {title: 'coder', value: 60, color: '#a4a5a5'},
    {title: 'educator', value: 40, color: '#303030'},
  ];

  const shiftSize = 3;

  const coder = [
    'Security engineer',
    'Full stack developer',
    'Python enthusiast',
    'Open source supporter',
    'Rubber duck discusser',
  ];
  const educator = [
    'Passionate teacher',
    'Lecturer of the year',
    'Vulnerability researcher',
    'PhD in InfoSec',
    'Academic paper writer',
  ];

  return (
    <Box pt={6} pb={4} id='about'>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
      >

        {/* coder */}
        <Grid item sm={12} md={4}>
          <Typography variant='h5' align='center'>
            <Box fontWeight='fontWeightBold'>part coder</Box>
          </Typography>
          <List>
            <ListItem>
              <ListItemText>
                {coder.map((item, index) => (
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
        <Grid item sm={12} md={4}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12}>
              <PieChart
                animate={true}
                animationDuration={2000}
                animationEasing='ease-out'
                paddingAngle={0}
                radius={pieChartDefaultProps.radius - shiftSize}
                segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
                data={pieChartData}
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
        <Grid item sm={12} md={4}>
          <Typography variant='h5' align='center'>
            <Box fontWeight='fontWeightBold'>part educator</Box>
          </Typography>
          <List>
            <ListItem>
              <ListItemText>
                {educator.map((item, index) => (
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
