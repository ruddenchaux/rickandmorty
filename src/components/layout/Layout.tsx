import { Hidden, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
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
      paddingTop: isFavorites ? 0 : theme.spacing(2),
      paddingBottom: theme.spacing(2),

      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(7)
      }
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
      <Hidden smDown lgUp>
        <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </Hidden>
      <main className={classes.main}>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />
          ))}
          <Redirect from="*" to="/" />
        </Switch>
      </main>
      <Hidden mdUp>
        <BottomNavigation />
      </Hidden>
      <FavoriteSnackbar />
    </>
  );
}
