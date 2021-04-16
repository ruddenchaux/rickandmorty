import { Face, FavoriteBorder, FilterHdr, Movie } from '@material-ui/icons';
import Characters from '../pages/Characters';
import Episodes from '../pages/Episodes';
import Favorites from '../pages/Favorites';
import Locations from '../pages/Locations';

export default [
  {
    path: '/',
    component: Characters,
    exact: true,
    menu: {
      label: 'Characters',
      icon: Face
    }
  },
  {
    path: '/locations',
    component: Locations,
    menu: {
      label: 'Locations',
      icon: FilterHdr
    }
  },
  {
    path: '/episodes',
    component: Episodes,
    menu: {
      label: 'Episodes',
      icon: Movie
    }
  },
  {
    path: '/favorites',
    component: Favorites,
    menu: {
      label: 'Favorites',
      icon: FavoriteBorder
    }
  }
];
