import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SigninForm from '../components/signinForm';
import CardBar from '../components/cardBar';

import {
  getFormValues,
  getFormSyncErrors,
  isValid,
} from 'redux-form';

import { hash } from '../libs/utils';
import { callSignIn } from '../apis/user';
import { useHistory } from 'react-router-dom';

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
}));

let Index = props => {
  const classes = useStyles();
  const [formError, setFormError] = useState({});
  const history = useHistory();

  const onSubmit = async () => {
    const { valid, syncErrors } = props;

    if (!valid) {
      setFormError(syncErrors);
      return;
    }
    const { values } = props;
    const id = values['signin-id'];
    const pass = hash(values['signin-password']);

    // TODO: DO SIGNIN
    const { accessToken } = await callSignIn(id, pass).catch(reason => {
      // TODO: handle signin error
    });
    
    // TODO: Set Access-token in store
    console.log(accessToken);

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
      </Card>
    </CardContent>
  );
}

Index = connect(state => ({
  values: getFormValues('signin')(state),
  syncErrors: getFormSyncErrors('signin')(state),
  valid: isValid('signin')(state)
}))(Index);

export default Index;