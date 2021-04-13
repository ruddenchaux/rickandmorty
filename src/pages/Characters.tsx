import { Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import CharacterCard from '../components/characters/CharacterCard';
import { Character } from '../models/Character';
import { useGetAllQuery } from '../services/characters';

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
  const { data, error, isLoading } = useGetAllQuery({});

  if (error) {
    return <>Oh no, there was an error</>;
  }

  if (isLoading || !data) {
    return <>Loading...</>;
  }

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="xl">
        <Grid container spacing={4}>
          {data.map((character: Character) => (
            <Grid item key={character.id} xs={12} lg={6} xl={4}>
              <CharacterCard character={character} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
