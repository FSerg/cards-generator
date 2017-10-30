import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import cardsReducer from './cardsReducer';

export default combineReducers({
  form: reduxForm,
  cardsStore: cardsReducer
});
