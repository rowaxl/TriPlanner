import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  CardContent,
  Typography,
  List,
  ListSubheader,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Card,
  FormControlLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import CardBar from '../components/cardBar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { getUsers, callSignup, updateUser, deleteUser } from '../apis/user';
import { hash, USER_ROLE } from '../libs/utils';

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
    paddingTop: 80,
  },
  userIcon: {
    color: theme.palette.success.main,
    marginRight: 10,
  },
  crateUserButton: {
    background: theme.palette.success.main,
    color: '#fff',
    marginLeft: 50,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetailForm: {
    width: 500,
    height: 400,
  },
  formInput: {
    width: '100%',
    marginBottom: 20,
  },
  signupButton: {
    background: theme.palette.success.main,
    color: '#fff'
  },
  discardButton: {
    background: theme.palette.grey[400],
    color: '#fff'
  },
  buttonWrap: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-around',
  },
  deleteButton: {
    color: theme.palette.error.main
  },
  confirmDeleteButton: {
    background: theme.palette.error.main,
    color: '#fff',
  }
}));

let ManageUsers = props => {
  const { auth, userDetail } = props;
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [userDetailType, setUserDetailType] = useState('');

  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [deleteTarget, setDeleteTarget] = useState('');

  const initialUserDetail = { id: '', name: '', password: '', role: 1 };
  const [userForm, setUserForm] = useState(initialUserDetail);

  const classes = useStyles();

  useEffect(() => {
    let mounted = true;
    if (!auth)
      history.push('/');

    if (!userDetail.hasOwnProperty('role') || userDetail.role === USER_ROLE.USER)
      history.push('/');

    if (mounted) {
      readyUsers();
    }

    return () => mounted = false;
  }, [auth]);

  const readyUsers = async () => {
    const res = await getUsers(auth);

    setUsers(res);
  }

  const onChangeUserId = e => {
    setUserForm({
      ...userForm,
      id: e.target.value
    });
  }

  const onChangeUserName = e => {
    setUserForm({
      ...userForm,
      name: e.target.value
    });
  }

  const onChangeUserPassword = e => {
    setUserForm({
      ...userForm,
      password: e.target.value
    });
  }

  const handleRadioChange = e => {
    setUserForm({
      ...userForm,
      role: parseInt(e.target.value)
    });
  }

  const showCreateUser = () => {
    setShowUserDetail(true);
    setUserDetailType('create');
    setUserForm(initialUserDetail);
  }

  const showEditUser = id => {
    const target = users.find(user => user.id === id);

    setShowUserDetail(true);
    setUserDetailType('edit');
    setUserForm(target);
  }

  const closeUserDetail = () => {
    setShowUserDetail(false);
    setUserForm(initialUserDetail);
  }

  const handleCreateUser = async () => {
    // TODO: validation
    const res = await callSignup(userForm.id, userForm.name, hash(userForm.password), userForm.role);
    // TODO: catch and hanle error
    if (res) {
      setShowUserDetail(false);
      setUserForm(initialUserDetail);
      readyUsers();
    }
  }

  const handleUpdateUser = async () => {
    // TODO: validation
    let updateDetail = { id: userForm.id, name: userForm.name, role: userForm.role };
    if (userForm.password !== '') {
      Object.assign(updateDetail, { hashedPassword: hash(userForm.password) })
    }

    const res = await updateUser(auth, updateDetail);
    // TODO: catch and hanle error
    if (res) {
      setShowUserDetail(false);
      setUserDetailType('create');
      setUserForm(initialUserDetail);
      readyUsers();
    }
  }

  const confirmDeleteUser = (id) => {
    setConfirmMessage('Are you sure about delete this user?\nTrips created by user will be deleted too.');

    setShowConfirmMessage(true);
    setDeleteTarget(id);
  }

  const handleDeleteUser = async () => {
    const res = await deleteUser(auth, deleteTarget);
    // TODO: catch and hanle error
    if (res) {
      setShowConfirmMessage(false);
      setConfirmMessage('');
      setDeleteTarget('');
      readyUsers();
    }
  }

  const closeConfirmMessage = () => {
    setShowConfirmMessage(false);
    setConfirmMessage('');
    setDeleteTarget('');
  }

  const renderDeleteButton = (user) => {
    if (user.id !== userDetail.id) {
      return (
        <IconButton edge="end" aria-label="delete-user" onClick={ () => confirmDeleteUser(user.id) }>
          <DeleteIcon className={classes.deleteButton} />
        </IconButton>
      )
    }

    return <IconButton edge="end" aria-label="delete-user" />;
  }

  const renderUserList = () => {
    if (users.length < 1) {
      return <Typography variant="h5">No Users</Typography>
    }

    return users.map(user => (
      <ListItem key={user.id} alignItems="flex-start">
        <ListItemAvatar>
          <AccountCircleIcon className={classes.userIcon} fontSize="large" />
        </ListItemAvatar>
        <ListItemText
          primary={user.name}
          secondary={user.role === USER_ROLE.USER ? 'User' : 'Admin'}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit-user" onClick={() => showEditUser(user.id)} >
            <EditIcon />
          </IconButton>
          {renderDeleteButton(user)}
        </ListItemSecondaryAction>
      </ListItem>
    ))
  }

  const renderUserDetail = () => {
    if (userDetailType === 'create') {
      return (
        <CardContent>
          <Typography variant="h5">Create new user</Typography>
          <form className={classes.form} onSubmit={null} autoComplete="off">
            <div className={classes.formInput}>
              <TextField label="ID" name="signup-id" fullWidth type="text" onChange={onChangeUserId} />
            </div>
            <div className={classes.formInput}>
              <TextField label="Name" name="signup-name" fullWidth type="text" onChange={onChangeUserName} />
            </div>
            <div className={classes.formInput}>
              <TextField label="Password" name="signup-password" fullWidth type="password" onChange={onChangeUserPassword} />
            </div>
            <div className={classes.formInput}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">User Role</FormLabel>
                <RadioGroup row value={userForm.role} onChange={handleRadioChange}>
                  <FormControlLabel value={USER_ROLE.USER} control={<Radio />} label="User" />
                  <FormControlLabel value={USER_ROLE.MANAGER} control={<Radio />} label="User " />
                  <FormControlLabel value={USER_ROLE.ADMIN} control={<Radio />} label="Admin" />
                </RadioGroup>
              </FormControl>
            </div>
          </form>
          <div className={classes.buttonWrap}>
            <Button className={classes.signupButton} type="submit" variant="contained" onClick={handleCreateUser}>Submit</Button>
            <Button className={classes.discardButton} variant="contained" onClick={closeUserDetail} >Discard</Button>
          </div>
        </CardContent>
      );
    } else {
      return (
        <CardContent>
          <Typography variant="h5">User Detail</Typography>
          <form className={classes.form} onSubmit={null} autoComplete="off">
            <div className={classes.formInput}>
              <TextField label="ID" name="signup-id" fullWidth type="text" value={userForm.id} onChange={onChangeUserId} />
            </div>
            <div className={classes.formInput}>
              <TextField label="Name" name="signup-name" fullWidth type="text" value={userForm.name} onChange={onChangeUserName} />
            </div>
            <div className={classes.formInput}>
              <TextField label="Password" name="signup-password" fullWidth type="password" value={userForm.password} onChange={onChangeUserPassword} />
            </div>
            <div className={classes.formInput}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">User Role</FormLabel>
                <RadioGroup row value={userForm.role} onChange={handleRadioChange}>
                  <FormControlLabel value={USER_ROLE.USER} control={<Radio />} label="Standard User" />
                  <FormControlLabel value={USER_ROLE.MANAGER} control={<Radio />} label="User Manager" />
                  <FormControlLabel value={USER_ROLE.ADMIN} control={<Radio />} label="Admin" />
                </RadioGroup>
              </FormControl>
            </div>
          </form>
          <div className={classes.buttonWrap}>
            <Button className={classes.signupButton} type="submit" variant="contained" onClick={handleUpdateUser}>Save</Button>
            <Button className={classes.discardButton} variant="contained" onClick={closeUserDetail} >Discard</Button>
          </div>
        </CardContent>
      );
    }
  }

  const renderConfirmButton = () => {
    if (deleteTarget.length > 0) {
      return (
        <div className={classes.buttonWrap}>
          <Button className={classes.confirmDeleteButton} type="submit" variant="contained" onClick={handleDeleteUser}>DELETE</Button>
          <Button className={classes.discardButton} variant="contained" onClick={closeConfirmMessage} >Discard</Button>
        </div>
      )
    }

    return (
      <div className={classes.buttonWrap}>
        <Button className={classes.discardButton} variant="contained" onClick={closeConfirmMessage} >Close</Button>
      </div>
    );
  }

  const renderConfirmMessage = () => {
    return (
      <CardContent>
        <Typography variant="h5">Confirm</Typography>
        <Typography variant="h6" component="pre">{confirmMessage}</Typography>
        {renderConfirmButton()}
      </CardContent>
    );
  }

  return (
    <CardContent className={classes.root}>
      <CardBar />

      <Typography variant="h4" component="span">
        Manage Users
        <Button className={classes.crateUserButton} onClick={showCreateUser}>
          Create user
        </Button>
      </Typography>


      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Users
          </ListSubheader>
        }
      >
        {renderUserList()}
      </List>

      <Modal
        className={classes.modal}
        open={showUserDetail}
        onClose={closeUserDetail}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <Fade in={showUserDetail}>
          <Card className={classes.userDetailForm}>
            { renderUserDetail() }
          </Card>
        </Fade>
      </Modal>

      <Modal
        className={classes.modal}
        open={showConfirmMessage}
        onClose={closeConfirmMessage}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={showConfirmMessage}>
          <Card className={classes.confirmMessage}>
            { renderConfirmMessage() }
          </Card>
        </Fade>
      </Modal>
    </CardContent>
  )
}

export default connect(
  state => ({
    auth: state.auth,
    userDetail: state.userDetail
  })
)(ManageUsers);