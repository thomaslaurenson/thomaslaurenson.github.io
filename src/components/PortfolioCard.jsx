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
  Box,
  Button,
  Link,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import ArchivedRibbon from './ArchivedRibbon';

const PortfolioCard = ({project}) => {
  return (
    <Grid size={{ sm: 12 , md: 6 }}>
      <Card 
        elevation={0}
        variant="outlined"
        sx={{
          position: "relative",
          opacity: project.archived ? 0.65 : 1,
          filter: project.archived ? "saturate(0.5)" : "none",
          transition: "opacity 200ms ease, filter 200ms ease",
        }}
      >
        {project.archived && <ArchivedRibbon />}
        <Link href={project.primarylink} aria-label={project.name} target="_blank" rel="noopener noreferrer">
          <CardMedia component="picture">
            <source
              srcSet={`projects/${project.img}.webp`}
              type="image/webp"
            />
            <img
              src={`projects/${project.img}.jpg`}
              alt={project.name}
              height="100%"
              width="100%"
              loading="lazy"
            />
          </CardMedia>
        </Link>

        <CardHeader
          disableTypography
          title={
            <Typography variant="h5" color="text.primary" sx={{ fontWeight: 700, pb: 2 }}>
              <Link href={project.primarylink} aria-label={project.name} target="_blank" rel="noopener noreferrer">
                {project.name}
              </Link>
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="text.secondary">
              {project.description}
            </Typography>
          }
        />

        <Box sx={{ pl: 1, pr: 1 }}>
          {project.tech.map((tag, i) => [
            <Box sx={{ pl: 0.5, pr: 0.5, pb: 1, display: 'inline-block' }} key={i}>
              <Button variant="outlined" disableElevation disabled>
                {tag}
              </Button>
            </Box>,
          ])}
        </Box>

        <CardActions disableSpacing>
          {project.github != null && (
            <IconButton
              component="a"
              href={project.github}
              aria-label="Project GitHub Link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </IconButton>
          )}
          {project.url != null && (
            <IconButton
              component="a"
              href={project.url}
              aria-label="Project Website Link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

PortfolioCard.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    primarylink: PropTypes.string.isRequired,
    tech: PropTypes.arrayOf(PropTypes.string).isRequired,
    github: PropTypes.string,
    url: PropTypes.string,
    archived: PropTypes.bool.isRequired,
  }).isRequired,
};

export default PortfolioCard;
