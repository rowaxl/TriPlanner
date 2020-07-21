import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  Modal,
  Backdrop,
  Fade,
  Button,
  TextField,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import SigninForm from '../components/signinForm';
import CardBar from '../components/cardBar';

import {
  getFormValues,
  getFormSyncErrors,
  isValid,
} from 'redux-form';

import { hash, USER_ROLE } from '../libs/utils';
import { callSignIn, callSignup } from '../apis/user';
import { updateAuth, updateUserDetail } from '../actions';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center"
  },
  titleEmphasize: {
    color: theme.palette.success.main,
    fontWeight: 800,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh',
  },
  signinForm: {
    margin: "50px auto",
    padding: 20,
    minWidth: 350,
    width: "30%",
    minHeight: 350,
    border: "none",
  },
  showSignupButton: {
    color: theme.palette.success.main,
    marginLeft: 10,
    marginBottom: 5,
  },
  signupForm: {
    width: 500,
    height: 300,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formInput: {
    width: '100%',
    marginBottom: 10,
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
}));

let Index = props => {
  const classes = useStyles();
  const [formError, setFormError] = useState({});
  const [showSignup, setShowSignup] = useState(false);
  const [signupID, setSignupID] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const { auth, setAuth, setUserId } = props;

  const history = useHistory();

  useEffect(() => {
    if (auth && auth.length > 0)
      history.push('/trips');
  });

  const onSubmit = async () => {
    const { valid, syncErrors } = props;

    if (!valid) {
      setFormError(syncErrors);
      return;
    }
    const { values } = props;
    const id = values['signin-id'];
    const pass = hash(values['signin-password']);

    const { accessToken, userId } = await callSignIn(id, pass);

    if (!accessToken || !userId) {
      // TODO: error modal
      console.log('Failed to signin');
      return;
    }
    
    // Set Access-token in store
    setAuth(accessToken);

    setUserId(userId);

    history.push('/trips');
  }

  const mapFormError = () => {
    const errors = [];
    if (formError['signin-id'] !== undefined) {
      errors.push('ID is required');
    }
    
    if (formError['signin-password'] !== undefined) {
      errors.push("Password is required");
    }

    return errors.map(e => <Typography key={e} color="error">{e}</Typography>);
  }

  const onChanged = () => {
    setFormError({}); // reset form error
  }

  const openSignup = () => {
    setShowSignup(true);
  };

  const closeSignup = () => {
    setShowSignup(false);
    setSignupID('');
    setSignupName('');
    setSignupPassword('');
  }

  const onChangeSignupId = e => {
    setSignupID(e.target.value);
  }

  const onChangeSignupName = e => {
    setSignupName(e.target.value);
  }

  const onChangeSignupPassword = e => {
    setSignupPassword(e.target.value);
  }

  const handleSignup = async () => {
    await callSignup(signupID, signupName, hash(signupPassword), USER_ROLE.USER).catch(reason => {
      // TODO: handle signup error
    });

    setShowSignup(false);

    const { accessToken, userId } = await callSignIn(signupID, hash(signupPassword)).catch(reason => {
      // TODO: handle signin error
    });

    // Set Access-token in store
    setAuth(accessToken);
    setUserId(userId);

    history.push('/trips');
  }

  return (
    <CardContent className={classes.root}>
      <CardBar />

      <Typography className={classes.title} variant="h4">
        Welcome to TRI<span className={classes.titleEmphasize}>P</span>LANNER!
      </Typography>

      <Typography className={classes.title} variant="h6">
        The easiest travel plan manager
      </Typography>

      <Card className={classes.signinForm} variant="outlined">
        <Typography className={classes.title} variant="h4">
          Sign In
        </Typography>
        <SigninForm handleSubmit={onSubmit} onChange={onChanged} />
        {mapFormError()}

        <Typography variant="h5" component="span">
          If you don't have account, 
        </Typography>
        <Button
          id="button-signup"
          className={classes.showSignupButton}
          onClick={openSignup}
        >
          Sign up
        </Button>
        !
      </Card>

      <Modal
        className={classes.modal}
        open={showSignup}
        onClose={closeSignup}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <Fade in={showSignup}>
          <Card className={classes.signupForm}>
            <CardContent>
              <Typography variant="h5">Sign up</Typography>
              <form id="signup-form" className={classes.form} onSubmit={null} autoComplete="off">
                <div className={classes.formInput}>
                  <TextField label="ID" id="signup-id" fullWidth type="text"  onChange={onChangeSignupId} />
                </div>
                <div className={classes.formInput}>
                  <TextField label="Name" id="signup-name" fullWidth type="text"  onChange={onChangeSignupName} />
                </div>
                <div className={classes.formInput}>
                  <TextField label="Password" id="signup-password" fullWidth type="password" onChange={onChangeSignupPassword} />
                </div>
              </form>
              <div className={classes.buttonWrap}>
                <Button id="button-submit-signup" className={classes.signupButton} type="submit" variant="contained" onClick={handleSignup}>Sign up</Button>
                <Button id="button-discard-signup" className={classes.discardButton} variant="contained" onClick={closeSignup} >Discard</Button>
              </div>
            </CardContent>
          </Card>
        </Fade>
      </Modal>
    </CardContent>
  );
}

const mapStateToProps = state => ({
  values: getFormValues('signin')(state),
  syncErrors: getFormSyncErrors('signin')(state),
  valid: isValid('signin')(state),
  auth: state.auth
});

const matDispatchToProps = dispatch => ({
  setAuth: (auth) => dispatch(updateAuth(auth)),
  setUserId: (id) => dispatch(updateUserDetail({ _id: id }))
});

Index = connect(mapStateToProps, matDispatchToProps)(Index);

export default Index;