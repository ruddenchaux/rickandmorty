import { Container, Grid, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import CharacterCard from '../components/characters/CharacterCard';
import { Character } from '../models/Character';
import { useGetAllQuery } from '../services/characters';

// component style
const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(3)
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
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
  // number of flyers for page
  const pageSize = 20;

  // start page number of flyers
  const startPage = 1;

  const classes = useStyles();

  // current page number state
  const [page] = useState(startPage);

  const { data, error, isLoading } = useGetAllQuery(page);

  if (error) {
    return <Alert severity="error">Ops.. Something went wrong! :-(</Alert>;
  }

  if (!isLoading && !data?.length) {
    return <Alert severity="info">There are no Characters!</Alert>;
  }

  if (!isLoading && !data?.length) {
    return <Alert severity="info">There are no Characters!</Alert>;
  }

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="xl">
        <Grid container spacing={4}>
          {(isLoading ? (data || []).concat(Array.from(new Array(pageSize))) : data || []).map(
            (character: Character, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Grid item key={index} xs={12} lg={6} xl={4}>
                <CharacterCard isLoading={isLoading} character={character} />
              </Grid>
            )
          )}
        </Grid>
      </Container>
    </>
  );
}
