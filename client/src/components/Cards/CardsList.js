import React, { Component } from 'react';
import { Header, Button } from 'semantic-ui-react';

import OneCard from './OneCard';
import CardsFormPage from './CardsFormPage';
import { connect } from 'react-redux';
import { fetchCards, delCards } from '../../actions';

class CardsList extends Component {
  state = {
    showForm: false
  };

  componentDidMount() {
    this.props.fetchCards();
  }

  render() {
    return (
      <div>
        <Button
          positive
          floated="right"
          onClick={() => this.setState({ showForm: true })}
        >
          Add cards
        </Button>

        <Header as="h2">Cards list</Header>
        {this.state.showForm && (
          <CardsFormPage
            isNewCard={true}
            onCardsGeneratorSubmit={() => this.setState({ showForm: false })}
            onCancel={() => this.setState({ showForm: false })}
          />
        )}

        {this.props.cards.map(card => {
          return <OneCard key={card.id} card={card} />;
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cards: state.cardsStore.cards };
}

export default connect(mapStateToProps, { fetchCards, delCards })(CardsList);
