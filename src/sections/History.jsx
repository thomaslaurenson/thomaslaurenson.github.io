import React from 'react';
import {
  Grid,
  Box,
  Typography,
} from '@mui/material';
import HistoryCard from '../components/HistoryCard';

const History = () => {
  const employers = [
    {
      'company': 'University of Auckland',
      'position': 'Senior Security Engineer',
      'avatar': 'uoa',
      'dates': '2024 - present',
    },
    {
      'company': 'Cogo',
      'position': 'Senior Security Engineer',
      'avatar': 'cogo',
      'dates': '2022 - 2023',
    },
    {
      'company': 'Quantum Security',
      'position': 'Senior Security Consultant (Pentester)',
      'avatar': 'quantum',
      'dates': '2021 - 2022',
    },
    {
      'company': 'Xero',
      'position': 'Senior Cybersecurity Education Analyst',
      'avatar': 'xero',
      'dates': '2020 - 2021',
    },
    {
      'company': 'Otago Polytechnic',
      'position': 'Lecturer',
      'avatar': 'op',
      'dates': '2017 - 2019',
    },
    {
      'company': 'University of Otago',
      'position': 'PhD Candidate/Lab Demonstrator',
      'avatar': 'uoo',
      'dates': '2013 - 2017',
    },
    {
      'company': 'Auckland University of Technology',
      'position': 'Masters Candidate/Teaching Assistant',
      'avatar': 'aut',
      'dates': '2010 - 2013',
    }];

  return (
    <Box pt={6} pb={4} id='history'>
      <Box pb={6}>
        <Typography variant='h4' align='center'>
          <Box fontWeight='fontWeightBold'>History</Box>
        </Typography>
      </Box>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={3}
      >
        {employers.map((employer, index) => {
          return <HistoryCard data={employer} key={index} />;
        })}
      </Grid>
    </Box>
  );
};

export default History;
