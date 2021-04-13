import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

// component style
const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(3)
  }
}));

export default function Locations() {
  const classes = useStyles();

  return (
    <Typography className={classes.title} color="textPrimary" variant="h3" component="h2">
      Locations
    </Typography>
  );
}
