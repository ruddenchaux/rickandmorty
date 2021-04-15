/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import { Grid, Link, makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { useDispatch } from 'react-redux';
import useMediaQueries from '../../hooks/useMediaQueries';
import { Location } from '../../models/Location';
import { setDialogCharacters, setDialogOpen, setDialogTitle } from '../../store/charactersDialog';
import LocationCardResidentAvatar from './LocationCardResidentAvatar';

// component style
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(3)
  },
  avatarsContainer: {
    paddingTop: theme.spacing(1)
  },
  viewMore: {
    paddingTop: theme.spacing(1)
  }
}));

export default function LocationCardResidents({ location, isLoading }: { location: Location; isLoading: boolean }) {
  let avatarsCount = 5;
  const classes = useStyles();
  const { xs, sm, md, lg, xl } = useMediaQueries();
  const dispatch = useDispatch();

  const openFullScreenDialog = () => {
    dispatch(setDialogCharacters(location.residents));
    dispatch(setDialogTitle(`Residents of ${location.name}`));
    dispatch(setDialogOpen(true));
  };

  if (xs) {
    avatarsCount = 10;
  }

  if (sm) {
    avatarsCount = 6;
  }

  if (md) {
    avatarsCount = 10;
  }

  if (lg) {
    avatarsCount = 3;
  }

  if (xl) {
    avatarsCount = 4;
  }

  return (
    <>
      <div className={classes.container}>
        {isLoading ? (
          <Skeleton height={20} />
        ) : (
          <>
            <Typography variant="subtitle2" component="label" color="textSecondary">
              Residents
            </Typography>

            {location.residents.length > avatarsCount ? (
              <>
                &nbsp;
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    openFullScreenDialog();
                  }}
                >
                  View more
                </Link>
              </>
            ) : null}
          </>
        )}

        <div className={classes.avatarsContainer}>
          <Grid container>
            {(isLoading ? Array.from(new Array(avatarsCount)) : location.residents.slice(0, avatarsCount)).map(
              (resident, index) => (
                <Grid item key={index}>
                  <LocationCardResidentAvatar resident={resident} isLoading={isLoading} />
                </Grid>
              )
            )}
          </Grid>
        </div>
      </div>
    </>
  );
}
