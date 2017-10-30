import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { newCard, createCards, fetchCard, updateCard } from '../../actions';
import CardsForm from './CardsForm';

class CardsFormPage extends Component {
  state = {
    redirect: false
  };

  componentDidMount = () => {
    if (this.props.isNewCard) {
      this.props.newCard();
    } else {
      const { cardId } = this.props.match.params;
      if (cardId) {
        this.props.fetchCard(cardId);
      } else {
        this.props.newCard();
      }
    }
  };

  cancel = () => {
    if (this.props.isNewCard) {
      this.props.onCancel();
    } else {
      this.setState({ redirect: true });
    }
  };

  submit = card => {
    if (!card.id) {
      return this.props
        .createCards(card)
        .then(response => {
          // this.setState({ redirect: true });
          this.props.onCardsGeneratorSubmit();
        })
        .catch(err => {
          console.log('createCards error: ', err);
        });
    } else {
      return this.props
        .updateCard(card)
        .then(response => this.setState({ redirect: true }))
        .catch(err => {
          console.log('updateCard error: ', err);
        });
    }
  };

  render() {
    return (
      <div>
        {this.state.redirect ? (
          <Redirect to="/generator" />
        ) : (
          <CardsForm
            card={this.props.card}
            onSubmit={this.submit}
            onCancel={this.cancel}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    card: state.cardsStore.card
  };
}

export default connect(mapStateToProps, {
  newCard,
  createCards,
  fetchCard,
  updateCard
})(CardsFormPage);
