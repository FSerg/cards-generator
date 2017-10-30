import React from 'react';
import { Form } from 'semantic-ui-react';
import classnames from 'classnames';

const customField = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <Form.Field className={classnames({ error: touched && error })}>
      <label>{label}</label>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span className="error">{error.message}</span>}
    </Form.Field>
  );
};

export default customField;
