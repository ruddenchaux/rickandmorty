import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(3)
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),

    [theme.breakpoints.down('lg')]: {
      paddingLeft: '8rem',
      paddingRight: '8rem'
    },

    [theme.breakpoints.down('md')]: {
      paddingLeft: '12rem',
      paddingRight: '12rem'
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6)
    },
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  loadingText: {
    textAlign: 'center',
    color: theme.palette.text.hint
  }
}));
