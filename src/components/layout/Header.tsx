import { AppBar, Hidden, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo';

// component style
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(3),
    backgroundColor: 'inherit',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2rem'
    }
  }
}));

export default function Header({ openMenu }: { openMenu: React.Dispatch<React.SetStateAction<boolean>> }) {
  const classes = useStyles();
  const headerTitle = useSelector<{ headerTitle: { title: string } }>((state) => state.headerTitle.title);

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar>
        <NavLink to="/">
          <Logo />
        </NavLink>

        <Typography variant="h4" color="textPrimary" component="h1" className={classes.title}>
          Rick and Morty - {headerTitle}
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
