/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {
  Grid,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import RandomImage from '../assets/random.jpg';

const Hobbies = () => {
  const life = [
    'Avid coffee drinker',
    'Beer aficionado',
    'Lover of old RPGs',
    'Comic book geek',
    'Fiery amatuer chef',
    'Slight clean freak',
  ];

  return (
    <Box pt={6} pb={4} id='hobbies'>
      <Box>
        <Typography variant='h4' align='center'>
          <Box fontWeight='fontWeightBold'>Hobbies</Box>
        </Typography>
      </Box>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
      >
        {/* hobbies image */}
        <Grid item xs={12} md={6}>
          {/* For md screens only and above */}
          <Box sx={{display: {xs: 'none', md: 'block'}}} pt={2}>
            <img src={RandomImage}
              alt='Thomas Laurenson - hobbies'
              // eslint-disable-next-line react/no-unknown-property
              css={
                css`border-radius: 50%; height: 'auto'; max-width: 100%;`}
            />
          </Box>
        </Grid>
        {/* hobbies list */}
        <Grid item sm={12} md={6}>
          <List>
            <ListItem>
              <ListItemText>
                {life.map((item, index) => (
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

export default Hobbies;
