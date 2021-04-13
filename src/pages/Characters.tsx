import { Container, makeStyles, Grid } from '@material-ui/core';
import React from 'react';
import CharacterCard from '../components/characters/CharacterCard';

// component style
const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(3)
  },
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),

    [theme.breakpoints.down('lg')]: {
      paddingLeft: '8rem',
      paddingRight: '8rem'
    },

    [theme.breakpoints.down('md')]: {
      paddingLeft: '12rem',
      paddingRight: '12rem'
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6)
    }
  }
}));

export default function Characters() {
  const classes = useStyles();

  const cardData = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1'
    },
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20'
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [
      {
        name: 'Close Rick-counters of the Rick Kind'
      },
      {
        name: 'The Rickshank Rickdemption'
      }
    ],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z'
  };

  return (
    <>
      {/* <Typography data-cy="characters-title" className={classes.title} color="textPrimary" variant="h3" component="h2">
        Characters
      </Typography> */}

      <Container className={classes.cardGrid} maxWidth="xl">
        <Grid container spacing={4}>
          {Array(20)
            .fill(0)
            .map((i) => (
              <Grid item key={i} xs={12} lg={6} xl={4}>
                <CharacterCard character={cardData} key={i} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}
