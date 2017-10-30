import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { delCards, makeFile, downloadFile } from '../../actions';

class OneCard extends Component {
  handleDelCards(cardsId) {
    this.props.delCards(cardsId);
  }

  handleDownload(cardsId) {
    this.props.downloadFile(cardsId);
  }

  renderDescription(card) {
    return (
      <div>
        <p>
          Range of numbers: {card.start_number} - {card.final_number}
        </p>
        <p>
          Prefix: {card.prefix} / Internal prefix: {card.internal_prefix}
        </p>
        <p>{card.comment}</p>
      </div>
    );
  }

  // <a style={{ textDecoration: 'underline' }} onClick={() => this.handleDownload()} href={`/${card.file}`}>
  //   file: {card.file}
  // </a>
  renderFile(card) {
    if (card.file) {
      return (
        <span style={{ paddingLeft: '10px' }}>
          <a
            style={{ textDecoration: 'underline' }}
            onClick={() => this.handleDownload(card.id)}
          >
            file: {card.file}
          </a>
        </span>
      );
    } else {
      return <span style={{ paddingLeft: '10px' }}>file: not yet</span>;
    }
  }

  render() {
    const { card } = this.props;
    return (
      <Card
        fluid
        // href={`/card/${card.id}`}
      >
        <Card.Content>
          <Card.Header>{card.title}</Card.Header>
        </Card.Content>
        <Card.Content>
          <Card.Description>
            <b>{this.renderDescription(card)}</b>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button
            onClick={() => this.handleDelCards(card.id)}
            floated="right"
            color="red"
            circular
            size="mini"
            icon="delete"
          />
          <Button
            compact
            icon="setting"
            content="edit"
            labelPosition="left"
            href={`/card/${card.id}`}
          />
          <Button onClick={() => this.props.makeFile(card.id)} compact>
            Generate
          </Button>

          {this.renderFile(card)}
        </Card.Content>
      </Card>
    );
  }
}

export default connect(null, { delCards, makeFile, downloadFile })(OneCard);
