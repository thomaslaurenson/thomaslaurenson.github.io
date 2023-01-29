import React from 'react';
import {
  Grid,
  Box,
  Typography,
} from '@mui/material';
import HistoryCard from '../components/HistoryCard';

const History = () => {
  const employeers = [
    {
      'company': 'Cogo',
      'position': 'Senior Security Engineer',
      'avatar': 'employeers/cogo.jpg',
      'dates': '2022 - Present',
    },
    {
      'company': 'Quantum Security',
      'position': 'Senior Security Consultant (Pentester)',
      'avatar': 'employeers/quantum.png',
      'dates': '2021 - 2022',
    },
    {
      'company': 'Xero',
      'position': 'Senior Cybersecurity Education Analyst',
      'avatar': 'employeers/xero.png',
      'dates': '2020 - 2021',
    },
    {
      'company': 'Otago Polytechnic',
      'position': 'Lecturer',
      'avatar': 'employeers/op.png',
      'dates': '2017 - 2019',
    },
    {
      'company': 'University of Otago',
      'position': 'PhD Candidate/Lab Demonstrator',
      'avatar': 'employeers/uoo.png',
      'dates': '2013 - 2017',
    },
    {
      'company': 'Auckland University of Technology',
      'position': 'Masters Candidate/Teaching Assistant',
      'avatar': 'employeers/aut.png',
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
        {employeers.map((employeer, index) => {
          return <HistoryCard data={employeer} key={index} />;
        })}
      </Grid>
    </Box>
  );
};

export default History;
