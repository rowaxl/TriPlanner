import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ExploreIcon from '@material-ui/icons/Explore';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupIcon from '@material-ui/icons/Group';

import { makeStyles } from '@material-ui/core/styles';

import { updateAuth, updateUserDetail } from '../actions';
import { callGetUserDetail } from '../apis/user';
import { USER_ROLE } from '../libs/utils';

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
  drawerList: {
    width: 250
  },
  userIcon: {
    color: theme.palette.success.main,
    marginRight: 10,
  },
  userNameWrap: {
    marginRight: 20,
    display: 'flex',
    alignItem: 'center',
  }
}));

const CardBar = props => {
  const { auth, userId, setAuth, setUserDetail } = props;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userName, setUserName] = useState('');
  const [drawerItems, setDrawerItems] = useState([]);

  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (auth) {
      getUserDetail();
    }
  }, [auth]);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  }

  const renderDrawerButton = () => {
    if (!auth) {
      return <></>;
    }

    return (
      <IconButton edge="start" className={classes.menuButton} aria-label="menu" onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
    )
  }

  const getUserDetail = async () => {
    if (!userId) {
      return;
    }

    const { detail } = await callGetUserDetail(auth, userId);

    if (detail !== null) {
      setUserName(detail.name);

      setUserDetail(detail);

      if (detail.role !== USER_ROLE.USER) {
        setDrawerItems([
          { label: 'Home', path: '/trips', icon: <ExploreIcon color="primary" /> },
          { label: 'Browse', path: '/browse', icon: <SearchIcon color="primary" /> },
          { label: 'Manage User', path: '/manage-users', icon: <GroupIcon color="primary" /> },
          { label: 'Sign Out', path: '/signout', icon: <ExitToAppIcon color="secondary" /> }
        ]);
      } else {
        setDrawerItems([
          { label: 'Home', path: '/trips', icon: <ExploreIcon color="primary" /> },
          { label: 'Browse', path: '/browse', icon: <SearchIcon color="primary" /> },
          { label: 'Sign Out', path: '/signout', icon: <ExitToAppIcon color="secondary" /> }
        ]);
      }
    }
  }

  const renderUserName = () => {
    if (!auth) {
      return <></>;
    }

    return (
      <div className={classes.userNameWrap}>
        <AccountCircleIcon className={classes.userIcon} fontSize="large" />
        <Typography variant="h6" component="span">
          {userName}
        </Typography>
      </div>
    );
  }

  const renderDrawerItems = () => drawerItems.map(({ label, path, icon }) => (
      <ListItem button key={label} selected={history.location.pathname === path} onClick={_ => handleLink(path)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{label}</ListItemText>
      </ListItem>
    )
  )

  const handleLink = path => {
    if (path === '/signout') {
      setAuth('');
      setUserDetail({});
      history.push('/');
      return;
    }

    history.push(path);
  }

  return (
    <AppBar className={classes.cardAppBar} elevation={0}>
      <Toolbar>
        <Typography className={classes.title} variant="h5">
          TRI<span className={classes.titleEmphasize}>P</span>LANNER
        </Typography>

        {renderUserName()}

        {renderDrawerButton()}
        <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer}>
          <List className={classes.drawerList}>
            { renderDrawerItems() }
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  )
};

export default connect(
  state => ({
    auth: state.auth,
    userId: state.userDetail._id,
  }),
  dispatch => ({
    setAuth: (auth) => dispatch(updateAuth(auth)),
    setUserDetail: (detail) => dispatch(updateUserDetail(detail))
  })
)(CardBar);
