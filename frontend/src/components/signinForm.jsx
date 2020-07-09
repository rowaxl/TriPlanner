import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import { TextField, Button } from '@material-ui/core';
import validate from '../libs/validation'

const renderTextField = (
  { input, label, meta: { touched, error }, ...custom }
) => {
  return (
    <TextField
      variant="standard"
      fullWidth
      label={label}
      error={touched && error !== undefined}
      helperText={error}
      {...input}
      {...custom}
    />
  )
};

const useStyles = makeStyles((theme) => ({
  signinForm: {
    margin: 'auto',
    width: '100%',
    minHeight: 300,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  signinFormInput: {
    width: '100%'
  }
}));

const ContactForm = props => {
  const { handleSubmit } = props;
  const classes = useStyles();

  const onSubmit = event => {
    event.preventDefault();

    // TODO: If validation failed, prevent submit
    handleSubmit();
  }

  return (
    <form className={classes.signinForm} onSubmit={onSubmit} autoComplete="off">
      <div className={classes.signinFormInput}>
        <Field label="ID" name="signin-id" component={renderTextField} type="text" />
      </div>
      <div className={classes.signinFormInput}>
        <Field label="Password" name="signin-password" component={renderTextField} type="password" />
      </div>
      <Button type="submit" variant="contained" color="primary">SIGN IN</Button>
    </form>
  );
}


export default reduxForm({
  form: 'signin',
  validate: validate.signin
})(ContactForm);