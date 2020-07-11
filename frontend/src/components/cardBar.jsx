import React from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cardAppBar: {
    position: 'absolute',
    background: theme.palette.grey[900],
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#EEE"
  },
  title: {
    flexGrow: 1,
  },
  titleEmphasize: {
    color: theme.palette.success.main,
    fontWeight: 800,
  },
}));


const CardBar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.cardAppBar} elevation={0}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h5">
          TRI<span className={classes.titleEmphasize}>P</span>LANNER
        </Typography>
      </Toolbar>
    </AppBar>
  )
};

export default CardBar;