import { Face, FavoriteBorder, FilterHdr, Movie } from '@material-ui/icons';

export default [
  {
    label: 'Characters',
    icon: Face,
    to: '/'
  },
  {
    label: 'Locations',
    icon: FilterHdr,
    to: '/locations'
  },
  {
    label: 'Episodes',
    icon: Movie,
    to: '/episodes'
  },
  {
    label: 'Favorites',
    icon: FavoriteBorder,
    to: '/favorites'
  }
];
