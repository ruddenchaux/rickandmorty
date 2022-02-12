import { AppBar, Button, Hidden, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHeaderTitleSelector } from '../../hooks/store';
import itemsMenu from '../../utils/itemsMenu';
import Logo from '../Logo';

// component style
const useStyles = makeStyles((theme) => {
  return {
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
    },
    itemMenu: {
      textDecoration: 'none',
      '&.active': {
        color: 'inherit',
        backgroundColor: 'inherit',
        '& .MuiButton-label': {
          color: theme.palette.primary.main
        }
      }
    }
  };
});

export default function Header({ openMenu }: { openMenu: React.Dispatch<React.SetStateAction<boolean>> }) {
  const classes = useStyles();
  const headerTitle = useHeaderTitleSelector((state) => state.headerTitle.title);

  return (
    <AppBar className={classes.appBar} position="sticky">
      <Toolbar>
        <NavLink to="/" aria-label="Rick and Morty">
          <Logo />
        </NavLink>

        <Typography variant="h4" color="textPrimary" component="h1" className={classes.title}>
          Rick and Morty - {headerTitle}
        </Typography>

        <Hidden smDown lgUp>
          <IconButton color="default" data-cy="button-menu" aria-label="open menu" onClick={() => openMenu(true)}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <div data-cy="header-navigation">
            {itemsMenu.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                aria-label={item.label}
                className={classes.itemMenu}
                exact={item.exact}
                data-cy="header-navigation-item"
              >
                <Button>{item.label}</Button>
              </NavLink>
            ))}
          </div>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
