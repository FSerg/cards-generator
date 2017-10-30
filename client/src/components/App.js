import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

// import Header from './Header';
import Landing from './Landing';
import CardsList from './Cards/CardsList';
import CardsFormPage from './Cards/CardsFormPage';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Container text style={{ marginTop: '5em' }}>
            <Route exact={true} path="/" component={Landing} />
            <Route exact path="/generator" component={CardsList} />
            <Route exact path="/card/:cardId" component={CardsFormPage} />
          </Container>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
