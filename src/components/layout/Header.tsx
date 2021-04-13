import { AppBar, Hidden, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import Logo from '../Logo';

// style of component
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(3)
  }
}));

export default function Header({ openMenu }: { openMenu: React.Dispatch<React.SetStateAction<boolean>> }) {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar>
        <Logo />

        <Typography variant="h6" color="textPrimary" component="h1" className={classes.title}>
          Rick and Morty
        </Typography>

        <Hidden smDown>
          <IconButton color="default" data-cy="button-menu" aria-label="open menu" onClick={() => openMenu(true)}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
