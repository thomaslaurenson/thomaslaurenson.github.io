import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Card,
  CardMedia,
  CardHeader,
  CardActions,
  IconButton,
  Typography,
  Divider,
  Box,
  Button,
  Link,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';

const PortfolioCard = ({project}) => {
  return (
    <Grid item sm={12} md={6}>
      <Card elevation={0} variant='outlined'>
        <Link href={project.primarylink} aria-label='Project Link via Image'>
          <CardMedia
            component='img'
            alt={project.name}
            height='100%'
            image={project.img}
          /></Link>

        <Divider />

        <CardHeader
          disableTypography
          title={
            <Typography variant='h5' color='textPrimary'>
              <Box fontWeight='fontWeightBold' pb={2}>
                <Link
                  href={project.primarylink}
                  aria-label='Project Link'
                >
                  {project.name}
                </Link>
              </Box>
            </Typography>
          }
          subheader={
            <Typography variant='body2' color='textSecondary'>
              {project.description}
            </Typography>
          }
        />

        <Box pl={1} pr={1}>
          {project.tech.map((tag, i) => [
            <Box pl={0.5} pr={0.5} pb={1} display='inline-block' key={i}>
              <Button variant='outlined' disableElevation disabled>
                {tag}
              </Button>
            </Box>,
          ])}
        </Box>

        <CardActions disableSpacing>
          {project.github != null && (
            <Link href={project.github} aria-label='Project GitHub Link'>
              <IconButton>
                <GitHubIcon />
              </IconButton>
            </Link>
          )}
          {project.url != null && (
            <Link href={project.url} aria-label='Project Website Link'>
              <IconButton>
                <LinkIcon />
              </IconButton>
            </Link>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

PortfolioCard.propTypes = {
  project: PropTypes.object,
};

export default PortfolioCard;
