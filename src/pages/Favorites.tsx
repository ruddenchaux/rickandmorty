/* eslint-disable react/jsx-props-no-spreading */
import { AppBar, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { setHeaderTitle } from '../store/headerTitle';

function TabPanel({ children, label, value }: { children: React.ReactNode; label: string; value: string }) {
  return (
    <div
      role="tabpanel"
      hidden={!value.includes(label)}
      id={`full-width-tabpanel-${label}`}
      aria-labelledby={`full-width-tab-${label}`}
    >
      {value.includes(label) && children}
    </div>
  );
}

function a11yProps(label: string) {
  return {
    id: `full-width-tab-${label}`,
    'aria-controls': `full-width-tabpanel-${label}`
  };
}

export default function Favorites() {
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);
  const dispatch = useDispatch();

  dispatch(setHeaderTitle('Favorites'));

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="favorites tabs"
        >
          <Tab
            label="Characters"
            {...a11yProps('favorites')}
            component={Link}
            value="/favorites"
            to="/favorites"
            data-cy="favorites-link"
          />
          <Tab
            label="Locations"
            {...a11yProps('locations')}
            component={Link}
            value="/favorites/locations"
            to="/favorites/locations"
            data-cy="favorites-link"
          />
          <Tab
            label="Episodes"
            {...a11yProps('episodes')}
            component={Link}
            value="/favorites/episodes"
            to="/favorites/episodes"
            data-cy="favorites-link"
          />
        </Tabs>
      </AppBar>

      <Switch>
        <Route exact path="/favorites">
          <TabPanel label="favorites" value={value}>
            <h1>Characters</h1>
          </TabPanel>
        </Route>
        <Route path="/favorites/locations">
          <TabPanel label="locations" value={value}>
            <h1>Locations</h1>
          </TabPanel>
        </Route>
        <Route path="/favorites/episodes">
          <TabPanel label="episodes" value={value}>
            <h1>Episodes</h1>
          </TabPanel>
        </Route>
      </Switch>
    </>
  );
}
