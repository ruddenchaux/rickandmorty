import { Hidden, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Characters from '../../pages/Characters';
import Episodes from '../../pages/Episodes';
import Favorites from '../../pages/Favorites';
import Locations from '../../pages/Locations';
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

// style of component
const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('md')]: {
      height: 'calc(100vh - 160px)'
    },
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 56px - 160px)'
    }
  }
}));

export default function Layout() {
  const classes = useStyles();

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
    </>
  );
}
