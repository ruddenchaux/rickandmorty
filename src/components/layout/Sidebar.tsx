import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../utils/routes';

const useStyles = makeStyles((theme) => {
  const listItem = {
    color: 'inherit',
    backgroundColor: 'inherit',
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main
    },
    '& .MuiListItemText-root': {
      color: theme.palette.primary.main
    }
  };

  return {
    header: {
      padding: theme.spacing(3)
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: 18,
      lineHeight: 1,
      marginTop: theme.spacing(1)
    },
    list: {
      width: 250,
      padding: theme.spacing(1)
    },
    listItem: {
      '&:hover': listItem,
      '&.active': listItem
    }
  };
});

export default function Sidebar({
  openMenu,
  setOpenMenu
}: {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const classes = useStyles();

  const closeDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpenMenu(false);
  };

  const header = (
    <div className={classes.header}>
      <Typography className={classes.subtitle1} variant="subtitle1" component="h2">
        Rick and Morty
      </Typography>
      <Typography variant="subtitle2">Discover the worlds of Rick and Morty</Typography>
    </div>
  );

  const list = (
    <div className={classes.list} role="presentation" onClick={closeDrawer()} onKeyDown={closeDrawer()}>
      <List>
        {routes.map((item) => (
          <ListItem
            button
            key={item.menu.label}
            className={classes.listItem}
            component={NavLink}
            to={item.path}
            exact
            data-cy="item-menu"
          >
            <ListItemIcon>
              <item.menu.icon data-cy="item-menu-icon" />
            </ListItemIcon>
            <ListItemText primary={item.menu.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Drawer anchor="right" data-cy="sidebar" open={openMenu} onClose={closeDrawer()}>
      {header}
      <Divider />
      {list}
    </Drawer>
  );
}
