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
      'name': 'trophyroom',
      'description': 'Collection of my walkthroughs, hints, notes, code snippets, tool logs, and resources for vulnerable CTF-style boxes, while preparing for the OSCP certification',
      'img': 'trophyroom',
      'github': 'https://github.com/thomaslaurenson/trophyroom',
      'url': 'https://trophyroom.thomaslaurenson.com',
      'primarylink': 'https://trophyroom.thomaslaurenson.com',
      'tech': ['python', 'php', 'ps', 'bash'],
    },
    {
      'name': 'PickTheBox',
      'description': 'A simple web application to help you pick a Hack The Box machine based on properties such as difficulty, operating system type, and OSCP relevance',
      'img': 'pickthebox',
      'github': 'https://github.com/thomaslaurenson/pickthebox',
      'url': 'https://pickthebox.thomaslaurenson.com/',
      'primarylink': 'https://pickthebox.thomaslaurenson.com/',
      'tech': ['javascript', 'react', 'vite'],
    },
    {
      'name': 'startrek-payroll',
      'description': 'A simple SQL injection vulnerable web application for teaching injection basics, powered by PHP and MySQL and deployed easily using Docker',
      'img': 'startrek_payroll',
      'github': 'https://github.com/thomaslaurenson/startrek_payroll',
      'url': null,
      'primarylink': 'https://github.com/thomaslaurenson/startrek_payroll',
      'tech': ['docker', 'php', 'mysql', 'bash'],
    },
    {
      'name': 'SecureMilkCarton',
      'description': 'An intentionally vulnerable web application... the difference from others is this application is designed to be secured not exploited. Great for learning!',
      'img': 'securemilkcarton',
      'github': 'https://github.com/thomaslaurenson/SecureMilkCarton',
      'url': null,
      'primarylink': 'https://github.com/thomaslaurenson/SecureMilkCarton',
      'tech': ['docker', 'java', 'mysql', 'bash'],
    },
    {
      'name': 'LiveDiff',
      'description': 'LiveDiff is fork of the popular RegShot tool - a portable, system-level differencing tool for Windows - with added forensic functionality',
      'img': 'livediff',
      'github': 'https://github.com/thomaslaurenson/LiveDiff',
      'url': null,
      'primarylink': 'https://github.com/thomaslaurenson/LiveDiff',
      'tech': ['c'],
    },
    {
      'name': 'IRDNumberScanner',
      'description': 'Co-author of a bulk_extractor scanner plug-in to detect and validate New Zealand Inland Revenue (IR) numbers',
      'img': 'irdnumberscanner',
      'github': 'https://github.com/thomaslaurenson/IRDNumberScanner',
      'url': null,
      'primarylink': 'https://github.com/thomaslaurenson/IRDNumberScanner',
      'tech': ['C++', 'Flex', 'Python'],
    },
    {
      'name': 'mpqcli',
      'description': ' A command line tool to create, add, remove, list, extract, read, and verify MPQ archives using the StormLib library ',
      'img': 'mpqcli',
      'github': 'https://github.com/TheGrayDot/mpqcli',
      'url': null,
      'primarylink': 'https://github.com/TheGrayDot/mpqcli',
      'tech': ['c++', "cmake", "docker"],
    },
    {
      'name': 'gcd_docker',
      'description': ' A simple Docker environment for the Grand Comic Database (GCD) with some Python scripts for interacting with the database',
      'img': 'gcd_docker',
      'github': 'https://github.com/TheGrayDot/gcd_docker',
      'url': null,
      'primarylink': 'https://github.com/TheGrayDot/gcd_docker',
      'tech': ['Docker', 'Python', 'MySQL'],
    },
    {
      'name': 'wow-vmangos-docker',
      'description': 'A Docker Compose environment for running the vmangos/core World of Warcraft Vanilla (patch 1.12) server',
      'img': 'wow_vmangos_docker',
      'github': 'https://github.com/TheGrayDot/wow-vmangos-docker',
      'url': null,
      'primarylink': 'https://github.com/TheGrayDot/wow-vmangos-docker',
      'tech': ['Docker', 'Python', 'MySQL', 'Bash'],
    },
    {
      'name': 'barcomic_server',
      'description': 'An HTTP API written in Go for receiving comic book barcodes from the Barcomic Android app and either logging or sending barcode as keystrokes',
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
