import React from 'react';
import {
  Grid,
  Box,
  Typography,
} from '@mui/material';
import PortfolioCard from '../components/PortfolioCard';

const Portfolio = () => {
  const projects = [
    {
      'name': 'trophy_room',
      // eslint-disable-next-line max-len
      'description': 'Collection of my walkthroughs, hints, notes, code snippets, tool logs, and resources for vulnerable CTF-style boxes, while preparing for the OSCP certification.',
      'img': 'projects/trophy_room.png',
      'github': 'https://github.com/thomaslaurenson/trophy_room',
      'url': null,
      'primarylink': 'https://github.com/thomaslaurenson/trophy_room',
      'tech': ['python', 'php', 'ps', 'bash'],
    },
    {
      'name': 'SecureMilkCarton',
      // eslint-disable-next-line max-len
      'description': 'An intentionally vulnerable web application... the difference from others is this application is designed to be secured not exploited. Great for learning!',
      'img': 'projects/securemilkcarton.png',
      'github': 'https://github.com/thomaslaurenson/SecureMilkCarton',
      'url': null,
      'primarylink': 'https://github.com/thomaslaurenson/SecureMilkCarton',
      'tech': ['docker', 'java', 'mysql', 'bash'],
    },
    {
      'name': 'startrek-payroll',
      // eslint-disable-next-line max-len
      'description': 'A simple SQL injection vulnerable web application for teaching injection basics. Powered by PHP and MySQL and deployed easily using Docker.',
      'img': 'projects/startrek_payroll.png',
      'github': 'https://github.com/thomaslaurenson/startrek_payroll',
      'url': null,
      'primarylink': 'https://github.com/thomaslaurenson/startrek_payroll',
      'tech': ['docker', 'php', 'mysql', 'bash'],
    },
    {
      'name': 'LiveDiff',
      // eslint-disable-next-line max-len
      'description': 'LiveDiff is fork of the popular RegShot tool - a portable, system-level differencing tool for Windows - with added forensic functionality.',
      'img': 'projects/livediff.png',
      'github': 'https://github.com/thomaslaurenson/LiveDiff',
      'url': null,
      'primarylink': 'https://github.com/thomaslaurenson/LiveDiff',
      'tech': ['c'],
    },
    {
      'name': 'thomaslaurenson.com',
      // eslint-disable-next-line max-len
      'description': 'A personal website with a portfolio built using a modern JavaScript stack including React, Vite, and Material UI.',
      'img': 'projects/thomaslaurenson.com.png',
      'github': 'https://github.com/thomaslaurenson/thomaslaurenson.github.io/',
      'url': null,
      'primarylink': 'https://github.com/thomaslaurenson/thomaslaurenson.github.io/',
      'tech': ['javascript', 'react', 'vite'],
    },
    // {
    //   'name': '',
    //   'description': '',
    //   'img': '',
    //   'github': '',
    //   'url': '',
    //   'primarylink': '',
    //   'tech': [],
    // },
  ];

  return (
    <Box pt={6} pb={4} id='portfolio'>
      <Box pb={4}>
        <Typography variant='h4' align='center'>
          <Box fontWeight='fontWeightBold'>Portfolio</Box>
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
    </Box>
  );
};

export default Portfolio;
