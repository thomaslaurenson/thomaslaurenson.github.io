import React from 'react';
import {
  Grid,
  Box,
  Typography,
} from '@mui/material';
import PortfolioCard from '../components/PortfolioCard';
import { projects } from '../data/constants';
import { projects_hobbies } from '../data/constants';

const Portfolio = () => {
  return (
    <Box pt={6} pb={4} id='portfolio-section'>
      <Box pb={4}>
        <Typography variant='h4' align='center'>
          <Box fontWeight='fontWeightBold'>Security Projects</Box>
        </Typography>
      </Box>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={3}
      >
        {projects.map((project, index) => {
          return <PortfolioCard project={project} key={index} />;
        })}
      </Grid>
      <Box pt={6} pb={4}>
        <Typography variant='h4' align='center'>
          <Box fontWeight='fontWeightBold'>Hobby Projects</Box>
        </Typography>
      </Box>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={3}
      >
        {projects_hobbies.map((project, index) => {
          return <PortfolioCard project={project} key={index} />;
        })}
      </Grid>
    </Box>
  );
};

export default Portfolio;
