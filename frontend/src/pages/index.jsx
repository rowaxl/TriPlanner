import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SignInForm from '../components/signinForm';
import { formValueSelector } from 'redux-form';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center"
  },
  signinForm: {
    margin: "50px auto",
    padding: 20,
    minWidth: 350,
    width: "30%",
    minHeight: 350
  }
}));

let Index = props => {
  const classes = useStyles();

  const callSignIn = () => {
    const { idValue, passwordValue } = props;
    // TODO: Call signin API
  }

  return (
    <CardContent>
      <Typography className={classes.title} variant="h4">
        Welcome to TriPlanner!
      </Typography>

      <Typography className={classes.title} variant="h6">
        You can manage your Trip plans Easily! Please Sign in and continue!
      </Typography>

      <Card className={classes.signinForm} elevation={3}>
        <Typography className={classes.title} variant="h4">
          Sign In
        </Typography>
        <SignInForm handleSubmit={callSignIn} />
      </Card>
    </CardContent>
  );
}

const selector = formValueSelector('signin');
Index = connect(state => {
  const idValue = selector(state, 'signin-id');
  const passwordValue = selector(state, 'signin-password');

  return {
    idValue,
    passwordValue,
  }
})(Index)

export default Index;