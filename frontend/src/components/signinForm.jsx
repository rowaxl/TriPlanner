import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Field, reduxForm } from 'redux-form';
import { TextField, Button } from '@material-ui/core';
import validate from '../libs/validation'

const useStyles = makeStyles((theme) => ({
  form: {
    margin: 'auto',
    width: '100%',
    minHeight: 300,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  formInput: {
    width: '100%'
  }
}));

const renderTextField = (
  { input, label, meta: { touched, invalid, error }, ...custom }
) => (
  <TextField
    variant="standard"
    fullWidth
    label={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const SigninForm = props => {
  const classes = useStyles();
  const { onChange, handleSubmit, submitting, pristine } = props;

  const onSubmit = e => {
    e.preventDefault();

    handleSubmit();
  }

  return (
    <form className={classes.form} onSubmit={onSubmit} autoComplete="off">
      <div className={classes.formInput}>
        <Field label="ID" name="signin-id" component={renderTextField} type="text" onChange={onChange} />
      </div>
      <div className={classes.formInput}>
        <Field label="Password" name="signin-password" component={renderTextField} type="password" onChange={onChange} />
      </div>
      <Button type="submit" disabled={pristine || submitting} variant="contained" color="primary">SIGN IN</Button>
    </form>
  )
}

export default reduxForm({
  form: 'signin',
  validate: validate.signin,
})(SigninForm);