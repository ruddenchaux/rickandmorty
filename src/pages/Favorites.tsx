/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import { AppBar, makeStyles, Tab, Tabs } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import CharacterCard from '../components/characters/CharacterCard';
import EpisodeCard from '../components/episodes/EpisodeCard';
import FavoritesGrid from '../components/favorites/FavoritesGrid';
import LocationCard from '../components/locations/LocationCard';
import { setHeaderTitle } from '../store/headerTitle';

interface RouterFavoriteTabs {
  /**
   * Name of the tabs useful for accessibility
   */
  name: string;

  /**
   * Label of the tab shown at the user
   */
  label: string;

  /**
   * Path of the tab
   */
  path: string;

  /**
   * Flag for handle router match
   */
  exact?: boolean;

  /**
   * The card component used in the favorites grid
   */
  cardComponent: React.ComponentType<any>;

  /**
   * The favorite state key
   */
  favoriteStateKey: 'favoritesCharacters' | 'favoritesEpisodes' | 'favoritesLocations';
  // favoriteStateKey: string;

  /**
   * The path of the entity
   */
  entityPath: string;
}

// routes tabs config
const routesFavoritesTabs: RouterFavoriteTabs[] = [
  {
    name: 'favorites',
    label: 'Characters',
    path: '/favorites',
    exact: true,
    cardComponent: CharacterCard,
    favoriteStateKey: 'favoritesCharacters',
    entityPath: '/'
  },
  {
    name: 'locations',
    label: 'Locations',
    path: '/favorites/locations',
    cardComponent: LocationCard,
    favoriteStateKey: 'favoritesLocations',
    entityPath: '/locations'
  },
  {
    name: 'episodes',
    label: 'Episodes',
    path: '/favorites/episodes',
    cardComponent: EpisodeCard,
    favoriteStateKey: 'favoritesEpisodes',
    entityPath: '/episodes'
  }
];

// tab content component wrapper
function TabPanel({ children, name, value }: { children: React.ReactNode; name: string; value: string }) {
  return (
    <div
      role="tabpanel"
      hidden={!value.includes(name)}
      id={`full-width-tabpanel-${name}`}
      aria-labelledby={`full-width-tab-${name}`}
    >
      {value.includes(name) && children}
    </div>
  );
}

// accessibility props for the tab
function a11yProps(name: string) {
  return {
    id: `full-width-tab-${name}`,
    'aria-controls': `full-width-tabpanel-${name}`
  };
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: theme.spacing(7)
  }
}));

export default function Favorites() {
  const classes = useStyles();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  const dispatch = useDispatch();

  dispatch(setHeaderTitle('Favorites'));

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar className={classes.appBar} position="absolute" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="favorites tabs"
        >
          {/* loop a tabs */}
          {routesFavoritesTabs.map((favoriteTab) => (
            <Tab
              key={favoriteTab.name}
              label={favoriteTab.label}
              {...a11yProps(favoriteTab.name)}
              component={Link}
              value={favoriteTab.path}
              to={favoriteTab.path}
              data-cy="favorites-link"
            />
          ))}
        </Tabs>
      </AppBar>

      <Switch>
        {/* loop a route tabs */}
        {routesFavoritesTabs.map((favoriteTab) => (
          <Route
            key={favoriteTab.path}
            path={favoriteTab.path}
            exact={favoriteTab.exact}
            render={() => (
              <TabPanel name={favoriteTab.name} value={value}>
                <FavoritesGrid
                  CardComponent={favoriteTab.cardComponent}
                  favoriteStateKey={favoriteTab.favoriteStateKey}
                  label={favoriteTab.label}
                  entityPath={favoriteTab.entityPath}
                />
              </TabPanel>
            )}
          />
        ))}
      </Switch>
    </>
  );
}
