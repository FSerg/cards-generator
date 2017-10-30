import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

const Landing = () => {
  return (
    <div>
      <Header as="h1">Discount Cards Generator</Header>
      <p>Just a pet-project to generate files for front-office softwsre</p>
      <p>
        Go to <Link to="/generator">generator...</Link>
      </p>
    </div>
  );
};

export default Landing;
