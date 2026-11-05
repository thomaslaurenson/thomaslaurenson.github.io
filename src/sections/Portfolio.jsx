import React from 'react';
import {
  Grid,
  Box,
  Typography,
} from '@mui/material';
import PortfolioCard from '../components/PortfolioCard';
import { projects, projectsEngineering, projectsHobbies } from '../data/constants';

const sections = [
  { title: 'Security Projects', projects },
  { title: 'Engineering Projects', projects: projectsEngineering },
  { title: 'Hobby Projects', projects: projectsHobbies },
];

const Portfolio = () => {
  return (
    <Box sx={{ pt: 6, pb: 4 }} id='portfolio'>
      {sections.map((section, sectionIndex) => (
        <React.Fragment key={section.title}>
          <Box sx={{ pt: sectionIndex === 0 ? 0 : 6, pb: 4 }}>
            <Typography variant='h4' component='h2' align='center'>
              {section.title}
            </Typography>
          </Box>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={3}
          >
            {section.projects.map((project, index) => {
              return <PortfolioCard project={project} key={index} />;
            })}
          </Grid>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Portfolio;
