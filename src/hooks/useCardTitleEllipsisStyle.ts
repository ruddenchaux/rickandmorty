import { makeStyles } from '@material-ui/core';

export default (width: string) =>
  makeStyles(() => ({
    ellipsis: {
      width,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }));
