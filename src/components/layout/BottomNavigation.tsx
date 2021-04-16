import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import itemsMenu from '../../utils/itemsMenu';

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
  const [value, setValue] = useState(location.pathname);

  // update the active nav link on route change
  useEffect(() => {
    setValue(location.pathname);
  }, [location]);

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
      {itemsMenu.map((item) => (
        <BottomNavigationAction
          key={item.label}
          label={item.label}
          value={item.to}
          icon={<item.icon data-cy="bottom-navigation-action-icon" />}
          data-cy="bottom-navigation-action"
        />
      ))}
    </MuiBottomNavigation>
  );
}
