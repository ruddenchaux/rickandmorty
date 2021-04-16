import { Hidden, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../../utils/routes';
import BottomNavigation from './BottomNavigation';
import Header from './Header';
import Sidebar from './Sidebar';

// component style
const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),

    [theme.breakpoints.up('md')]: {
      height: 'calc(100vh - 120px)'
    },
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 56px - 120px)'
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(7),
      paddingBottom: theme.spacing(5)
    },
    overflow: 'auto'
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
