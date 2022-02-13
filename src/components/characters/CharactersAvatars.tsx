/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
import { Grid, Link, makeStyles, Typography } from '@material-ui/core';
import { Alert, Skeleton } from '@material-ui/lab';
import React from 'react';
import { useDispatch } from 'react-redux';
import useMediaQueries from '../../hooks/useMediaQueries';
import { Character } from '../../models/Character';
import { setDialogCharacters, setDialogOpen, setDialogTitle } from '../../store/charactersDialog';
import Logo from '../Logo';
import CharacterAvatar from './CharacterAvatar';

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

export default function CharactersAvatars({
  label,
  characters,
  dialogTitle,
  isLoading
}: {
  label: string;
  characters: Character[];
  dialogTitle: string;
  isLoading: boolean;
}) {
  let avatarsCount = 5;
  const classes = useStyles();
  const { xs, sm, md, lg, xl } = useMediaQueries();
  const dispatch = useDispatch();

  const openFullScreenDialog = () => {
    dispatch(setDialogCharacters(characters));
    dispatch(setDialogTitle(dialogTitle));
    dispatch(setDialogOpen(true));
  };

  if (xs) {
    avatarsCount = 9;
  }

  if (sm) {
    avatarsCount = 6;
  }

  if (md) {
    avatarsCount = 8;
  }

  if (lg) {
    avatarsCount = 3;
  }

  if (xl) {
    avatarsCount = 4;
  }

  const viewMore =
    characters?.length > avatarsCount ? (
      <>
        &nbsp;
        <Link
          component="button"
          variant="body2"
          data-cy="characters-view-more"
          onClick={() => {
            openFullScreenDialog();
          }}
        >
          View more
        </Link>
      </>
    ) : null;

  const noCharactersMessage = !characters?.length ? (
    <Alert variant="outlined" icon={<Logo width={20} height={20} />} severity="info">
      Here don&apos;t are characters
    </Alert>
  ) : null;

  return (
    <div className={classes.container}>
      {isLoading ? (
        <Skeleton height={20} />
      ) : (
        <>
          <Typography variant="subtitle2" component="label" color="textSecondary">
            {label}
          </Typography>

          {viewMore}
        </>
      )}

      <div className={classes.avatarsContainer}>
        <Grid container>
          {(isLoading ? Array.from(new Array(avatarsCount)) : characters.slice(0, avatarsCount)).map(
            (character, index) => (
              <Grid item key={index}>
                <CharacterAvatar data-cy="character-avatar" character={character} isLoading={isLoading} />
              </Grid>
            )
          )}
        </Grid>
        {!isLoading ? noCharactersMessage : null}
      </div>
    </div>
  );
}
