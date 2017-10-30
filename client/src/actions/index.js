import axios from 'axios';
import fileDownload from 'js-file-download';

import {
  FETCH_CARDS,
  FETCH_CARD,
  NEW_CARD,
  DEL_CARD,
  UPDATE_CARD,
  UPDATE_CARDFILE_PENDING,
  UPDATE_CARDFILE_DONE
} from './types';

export const newCard = () => dispatch => {
  dispatch({ type: NEW_CARD });
};

export const createCards = values => async dispatch => {
  const res = await axios.post('/api/cards', values);
  dispatch({ type: FETCH_CARDS, payload: res.data });
};

export const downloadFile = cardsId => async dispatch => {
  const res = await axios.get(`/api/file/${cardsId}`);
  fileDownload(res.data, `${cardsId}.txt`);
};

export const fetchCards = () => async dispatch => {
  const res = await axios.get('/api/cards');

  dispatch({ type: FETCH_CARDS, payload: res.data });
};

export const fetchCard = cardsId => async dispatch => {
  const res = await axios.get(`/api/cards/${cardsId}`);

  dispatch({ type: FETCH_CARD, payload: res.data });
};

export const delCards = cardsId => async dispatch => {
  await axios.delete('/api/cards', { params: { cardsId } });

  dispatch({ type: DEL_CARD, payload: { cardsId } });
};

export const updateCard = card => async dispatch => {
  const res = await axios.put('/api/cards', card);

  dispatch({ type: UPDATE_CARD, payload: res.data });
};

export const makeFile = cardsId => async dispatch => {
  dispatch({ type: UPDATE_CARDFILE_PENDING, payload: { cardsId } });

  const res = await axios.post('/api/cards/makefile', { cardsId });

  //console.log('res: ' + JSON.stringify(res));
  dispatch({ type: UPDATE_CARDFILE_DONE, payload: { ...res.data, cardsId } });
};
