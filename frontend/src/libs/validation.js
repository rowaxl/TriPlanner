export default {
  signin: (values) => {
    const errors = {};
    const required = [
      'signin-id',
      'signin-password'
    ];

    required.forEach(field => {
      if (!values[field])
        errors[field] = 'Required';
    });

    return errors;
  } 
}