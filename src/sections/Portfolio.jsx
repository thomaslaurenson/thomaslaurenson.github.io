import React from 'react';
import {
  Grid,
  Box,
  Typography,
} from '@mui/material';
import PortfolioCard from '../components/PortfolioCard';
import { projects, projectsHobbies } from '../data/constants';

const Portfolio = () => {
  return (
    <Box sx={{ pt: 6, pb: 4 }} id='portfolio'>
      <Box sx={{ pb: 4 }}>
        <Typography variant='h4' align='center' sx={{ fontWeight: 700 }}>
          Security Projects
        </Typography>
      </Box>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={3}
      >
        {projects.map((project, index) => {
          return <PortfolioCard project={project} key={index} />;
        })}
      </Grid>
      <Box sx={{ pt: 6, pb: 4 }}>
        <Typography variant='h4' align='center' sx={{ fontWeight: 700 }}>
          Hobby Projects
        </Typography>
      </Box>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={3}
      >
        {projectsHobbies.map((project, index) => {
          return <PortfolioCard project={project} key={index} />;
        })}
      </Grid>
    </Box>
  );
};

export default Portfolio;
