import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import routes from '../../utils/routes';

// component style
const useStyles = makeStyles(() => ({
  bottomNavigation: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%'
  }
}));

export default function BottomNavigation() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);

  return (
    <MuiBottomNavigation
      className={classes.bottomNavigation}
      value={value}
      onChange={(event, to) => {
        history.push(to);
        setValue(to);
      }}
      showLabels
      data-cy="bottom-navigation"
    >
      {routes.map((item) => (
        <BottomNavigationAction
          key={item.menu.label}
          label={item.menu.label}
          value={item.path}
          icon={<item.menu.icon data-cy="bottom-navigation-action-icon" />}
          data-cy="bottom-navigation-action"
        />
      ))}
    </MuiBottomNavigation>
  );
}
