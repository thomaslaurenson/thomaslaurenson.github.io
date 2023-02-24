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
      'img': 'trophy_room',
      'github': 'https://github.com/thomaslaurenson/trophy_room',
      'url': null,
      'primarylink': 'https://github.com/thomaslaurenson/trophy_room',
      'tech': ['python', 'php', 'ps', 'bash'],
    },
    {
      'name': 'PickTheBox',
      // eslint-disable-next-line max-len
      'description': 'A simple web application to help you pick a Hack The Box machine based on properties such as difficulty, operating system type, and OSCP relevance.',
      'img': 'pickthebox',
      'github': 'https://github.com/thomaslaurenson/pickthebox',
      'url': 'https://www.thomaslaurenson.com/pickthebox/',
      'primarylink': 'https://www.thomaslaurenson.com/pickthebox/',
      'tech': ['javascript', 'react', 'vite'],
    },
    {
      'name': 'SecureMilkCarton',
      // eslint-disable-next-line max-len
      'description': 'An intentionally vulnerable web application... the difference from others is this application is designed to be secured not exploited. Great for learning!',
      'img': 'securemilkcarton',
      'github': 'https://github.com/thomaslaurenson/SecureMilkCarton',
      'url': null,
      'primarylink': 'https://github.com/thomaslaurenson/SecureMilkCarton',
      'tech': ['docker', 'java', 'mysql', 'bash'],
    },
    {
      'name': 'startrek-payroll',
      // eslint-disable-next-line max-len
      'description': 'A simple SQL injection vulnerable web application for teaching injection basics. Powered by PHP and MySQL and deployed easily using Docker.',
      'img': 'startrek_payroll',
      'github': 'https://github.com/thomaslaurenson/startrek_payroll',
      'url': null,
      'primarylink': 'https://github.com/thomaslaurenson/startrek_payroll',
      'tech': ['docker', 'php', 'mysql', 'bash'],
    },
    {
      'name': 'LiveDiff',
      // eslint-disable-next-line max-len
      'description': 'LiveDiff is fork of the popular RegShot tool - a portable, system-level differencing tool for Windows - with added forensic functionality.',
      'img': 'livediff',
      'github': 'https://github.com/thomaslaurenson/LiveDiff',
      'url': null,
      'primarylink': 'https://github.com/thomaslaurenson/LiveDiff',
      'tech': ['c'],
    },
    {
      'name': 'GMAdminMax',
      // eslint-disable-next-line max-len
      'description': 'An addon for WoW Vanilla (1.12) private servers to help teleport to common locations, spawn BiS item sets, and make it easier to run some common GM commands.',
      'img': 'gmadminmax',
      'github': 'https://github.com/thomaslaurenson/GMAdminMax',
      'url': null,
      'primarylink': 'https://github.com/thomaslaurenson/GMAdminMax',
      'tech': ['lua'],
    },
    {
      'name': 'barcomic_server',
      // eslint-disable-next-line max-len
      'description': 'An HTTP API written in Go for receiving comic book barcodes from the Barcomic Android application and either logging the barcode or sending barcode as keystrokes.',
      'img': 'barcomic_server',
      'github': 'https://github.com/TheGrayDot/barcomic_server',
      'url': null,
      'primarylink': 'https://github.com/TheGrayDot/barcomic_server',
      'tech': ['go'],
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
