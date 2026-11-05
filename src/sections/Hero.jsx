import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SchoolIcon from '@mui/icons-material/School';
import TerminalIcon from '@mui/icons-material/Terminal';
import { intro, roles, socialLinks } from '../data/constants';

const roleIcons = {
  engineer: TerminalIcon,
  researcher: SchoolIcon,
};

// Filled card: highest surface container, no border
const RoleCard = ({ role }) => {
  const Icon = roleIcons[role.key];

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'm3.surfaceContainerHighest',
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Stack direction='row' spacing={1.5} sx={{ alignItems: 'center', mb: 1 }}>
          <Icon sx={{ color: 'primary.main' }} />
          <Typography variant='h5' component='h2'>
            {role.title}
          </Typography>
        </Stack>
        <Typography variant='subtitle1' sx={{ mb: 2 }}>
          {role.summary}
        </Typography>
        <Box component='ul' sx={{ listStyle: 'disc', m: 0, pl: 2.5 }}>
          {role.highlights.map((item) => (
            <Typography
              component='li'
              variant='body1'
              color='text.secondary'
              key={item}
              sx={{ py: 0.5 }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

RoleCard.propTypes = {
  role: PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    highlights: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const Hero = () => {
  return (
    <Box sx={{ pt: { xs: 4, sm: 8 }, pb: 4 }} id='hero'>
      <Stack
        direction='row'
        spacing={{ xs: 2, sm: 3 }}
        sx={{ alignItems: 'center', mb: { xs: 4, sm: 6 } }}
      >
        <Box
          component='picture'
          sx={{
            flexShrink: 0,
            width: { xs: 80, sm: 112 },
            height: { xs: 80, sm: 112 },
            overflow: 'hidden',
            borderRadius: 4, // 16px: Material 3 "large" corner
          }}
        >
          <source srcSet='profile.avif' type='image/avif' />
          <source srcSet='profile.webp' type='image/webp' />
          <Box
            component='img'
            src='profile.jpg'
            alt=''
            width={112}
            height={112}
            loading='eager'
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              // The source is a full-length photo; zoom in on the face
              transform: 'scale(1.75)',
              transformOrigin: '52% 14%',
            }}
          />
        </Box>
        <Box>
          <Typography
            variant='h3'
            component='h1'
            sx={{ fontSize: { xs: '1.75rem', sm: '2.25rem' } }}
          >
            {intro.name}
          </Typography>
          <Typography variant='body1' color='text.secondary' sx={{ mt: 0.5 }}>
            {intro.tagline}
          </Typography>
          <Stack direction='row' spacing={0.5} sx={{ mt: 1, ml: -1 }}>
            <IconButton component='a' href={socialLinks.email} aria-label='Email'>
              <EmailIcon />
            </IconButton>
            <IconButton
              component='a'
              href={socialLinks.github}
              aria-label='GitHub'
              target='_blank'
              rel='noopener noreferrer'
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              component='a'
              href={socialLinks.linkedin}
              aria-label='LinkedIn'
              target='_blank'
              rel='noopener noreferrer'
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </Stack>

      <Grid container spacing={3}>
        {roles.map((role) => (
          <Grid size={{ xs: 12, sm: 6 }} key={role.key}>
            <RoleCard role={role} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Hero;
