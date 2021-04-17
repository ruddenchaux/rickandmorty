import {
  AppBar,
  Container,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  makeStyles,
  Slide,
  Toolbar,
  Typography
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useGridStyle from '../../hooks/useGridStyle';
import { Character } from '../../models/Character';
import { CharactersDialogState, setDialogOpen } from '../../store/charactersDialog';
import CharacterCard from './CharacterCard';

// component style
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  title: {
    flex: 1
  },
  dialog: {
    background: theme.palette.background.default,
    padding: 0
  }
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CharactersFullScreenDialog() {
  const classes = useStyles();
  const gridClasses = useGridStyle();

  const open = useSelector<CharactersDialogState, boolean>((state) => state.charactersDialog.open);
  const title = useSelector<CharactersDialogState, string>((state) => state.charactersDialog.title);
  const characters = useSelector<CharactersDialogState, Character[]>((state) => state.charactersDialog.characters);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setDialogOpen(false));
  };

  return (
    <Dialog
      fullScreen
      scroll="paper"
      open={open || false}
      onClose={handleClose}
      TransitionComponent={Transition as React.ComponentType<TransitionProps>}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography data-cy="characters-fullscreen-dialog-title" variant="h6" className={classes.title}>
            {title}
          </Typography>
          <IconButton
            data-cy="characters-fullscreen-close-btn"
            autoFocus
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DialogContent className={classes.dialog} data-cy="characters-fullscreen-dialog-content">
        <Container className={gridClasses.cardGrid} maxWidth="xl">
          <Grid container spacing={4}>
            {characters?.map((item: Character) => (
              <Grid item key={item.id} xs={12} sm={12} md={12} lg={6} xl={4}>
                <CharacterCard isLoading={false} item={item} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </DialogContent>
    </Dialog>
  );
}
