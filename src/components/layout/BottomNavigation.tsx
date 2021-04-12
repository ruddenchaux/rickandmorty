import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import itemsMenu from '../../utils/itemsMenu';

// style of component
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
    >
      {itemsMenu.map((item) => (
        <BottomNavigationAction key={item.label} label={item.label} value={item.to} icon={<item.icon />} />
      ))}
    </MuiBottomNavigation>
  );
}
