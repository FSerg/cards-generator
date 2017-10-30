import {
  FETCH_CARDS,
  FETCH_CARD,
  NEW_CARD,
  DEL_CARD,
  UPDATE_CARD,
  UPDATE_CARDFILE_PENDING,
  UPDATE_CARDFILE_DONE
} from '../actions/types';

const defaultState = {
  cards: [],
  card: { title: {} }
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case FETCH_CARDS:
      return {
        ...state,
        cards: action.payload
      };

    case FETCH_CARD:
      return {
        ...state,
        card: action.payload
      };

    case NEW_CARD:
      return {
        ...state,
        card: { title: '' }
      };

    case UPDATE_CARD: {
      const card = action.payload;
      return {
        ...state,
        cards: state.cards.map(item => (item.id === card._id ? card : item))
      };
    }

    case UPDATE_CARDFILE_PENDING:
      //   const newstate1 = [];
      //   _.eachRight(state.cards, card => {
      //     if (card.id === action.payload.cardsId) {
      //       newstate1.push(Object.assign({}, card, { file: 'processing...' }));
      //     } else {
      //       newstate1.push(card);
      //     }
      //   });
      //
      //   return {
      //     ...state,
      //     cards: newstate1
      //   };
      const cardId1 = action.payload.cardsId;
      return {
        ...state,
        cards: state.cards.map(
          item =>
            item.id === cardId1
              ? Object.assign({}, item, { file: 'processing...' })
              : item
        )
      };

    case UPDATE_CARDFILE_DONE:
      // console.log('action.payload: ');
      // console.log(action.payload);

      // я так и не понял почему любой другой способ создания копии state
      // менял порядок объектов в масиве (в state)
      // хоть map(), хоть slice, хоть {...state} - все они создавали новый стейт
      // с другим порядком объектов
      // пришлось извратиться с eachRight и push в новый массив
      // P.S. по документации map() не должен менять порядок объектов :(((
      // const newstate2 = [];
      // _.eachRight(state.cards, card => {
      //   if (card.id === action.payload.cardsId) {
      //     newstate2.push(
      //       Object.assign({}, card, { file: action.payload.file })
      //     );
      //   } else {
      //     newstate2.push(card);
      //   }
      // });
      //
      // return {
      //   ...state,
      //   cards: newstate2
      // };

      const cardId2 = action.payload.cardsId;
      const file = action.payload.file;
      return {
        ...state,
        cards: state.cards.map(
          item =>
            item.id === cardId2 ? Object.assign({}, item, { file }) : item
        )
      };

    case DEL_CARD: {
      const cardsId = action.payload.cardsId;
      return {
        ...state,
        cards: state.cards.filter(item => item.id !== cardsId)
      };
    }

    default:
      return state;
  }
}
