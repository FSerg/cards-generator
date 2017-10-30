import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Header, Button, Form, Segment } from 'semantic-ui-react';

import customField from './customField';

class CardsForm extends Component {
  componentWillReceiveProps = nextProps => {
    // Load Contact Asynchronously
    const { card } = nextProps;
    if (card.id !== this.props.card.id) {
      // Initialize form only once
      this.props.initialize(card);
    }
  };

  render() {
    const { handleSubmit, pristine, submitting, card } = this.props;

    return (
      <Segment padded tertiary>
        <Header as="h2">{card.id ? 'Edit Cards' : 'Add New Cards'}</Header>

        <Form onSubmit={handleSubmit} size={'mini'}>
          <Field
            label="Title"
            name="title"
            type="text"
            placeholder="Input title"
            errorStyle={{ marginTop: '-10px' }}
            component={customField}
          />

          <Form.Group widths="equal">
            <Form.Field>
              <Field
                label="Start number"
                name="start_number"
                type="text"
                placeholder="0001"
                component={customField}
              />
            </Form.Field>

            <Form.Field>
              <Field
                label="Final number"
                name="final_number"
                type="text"
                placeholder="0999"
                component={customField}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field>
              <Field
                label="Prefix"
                name="prefix"
                type="text"
                placeholder="2300"
                component={customField}
              />
            </Form.Field>

            <Form.Field>
              <Field
                label="Internal prefix"
                name="internal_prefix"
                type="text"
                placeholder="6600"
                component={customField}
              />
            </Form.Field>
          </Form.Group>

          <Form.Field>
            <label>Comment</label>
            <Field
              name="comment"
              component="textarea"
              type="text"
              placeholder="any comments"
            />
          </Form.Field>

          <Button
            size="mini"
            type="submit"
            primary
            disabled={pristine || submitting}
          >
            Submit
          </Button>

          <Button
            size="mini"
            type="button"
            negative
            onClick={this.props.onCancel}
          >
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'You must provide a title!';
  }
  if (!values.start_number) {
    errors.start_number = 'You must provide a start number!';
  }
  if (!values.final_number) {
    errors.final_number = 'You must provide a final number!';
  }
  if (!values.prefix) {
    errors.prefix = 'You must provide a prefix!';
  }
  if (!values.internal_prefix) {
    errors.internal_prefix = 'You must provide a internal prefix!';
  }

  return errors;
}

export default reduxForm({
  form: 'generatorForm',
  validate
})(CardsForm);
