import { Hidden, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Characters from '../../pages/Characters';
import Episodes from '../../pages/Episodes';
import Favorites from '../../pages/Favorites';
import Locations from '../../pages/Locations';
import FavoriteSnackbar from '../favorites/FavoriteSnackbar';
import BottomNavigation from './BottomNavigation';
import Header from './Header';
import Sidebar from './Sidebar';

// routes config
const routes = [
  {
    path: '/',
    exact: true,
    component: Characters
  },
  {
    path: '/locations',
    component: Locations
  },
  {
    path: '/episodes',
    component: Episodes
  },
  {
    path: '/favorites',
    component: Favorites
  }
];

// component style
const useStyles = (isFavorites: boolean) =>
  makeStyles((theme) => ({
    main: {
      backgroundColor: theme.palette.background.default,
      marginTop: isFavorites ? theme.spacing(13) : theme.spacing(8),
      paddingTop: theme.spacing(3),
      paddingBottom: isFavorites ? theme.spacing(5) : theme.spacing(5),

      [theme.breakpoints.up('md')]: {
        height: `calc(100vh - 120px ${isFavorites ? '- 48px' : ''})`
      },
      [theme.breakpoints.down('sm')]: {
        height: `calc(100vh - 176px ${isFavorites ? '- 48px' : ''})`
      },
      [theme.breakpoints.down('xs')]: {
        marginTop: isFavorites ? theme.spacing(13) : theme.spacing(7)
      },
      overflow: 'auto'
    }
  }));

export default function Layout() {
  const location = useLocation();
  const classes = useStyles(location.pathname.startsWith('/favorites'))();

  // open/close sidebar state
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <Header openMenu={setOpenMenu} />
      <Hidden smDown>
        <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </Hidden>
      <main className={classes.main}>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />
          ))}
        </Switch>
      </main>
      <Hidden mdUp>
        <BottomNavigation />
      </Hidden>
      <FavoriteSnackbar />
    </>
  );
}
