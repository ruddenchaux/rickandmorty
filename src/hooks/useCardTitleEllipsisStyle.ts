import { makeStyles } from '@material-ui/core';

export default () =>
  makeStyles(() => ({
    ellipsis: {
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    favoriteActions: {
      padding: 0,
      float: 'right'
    }
  }));
