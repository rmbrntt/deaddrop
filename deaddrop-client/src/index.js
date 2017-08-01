import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto'
import { MuiThemeProvider } from 'material-ui/styles';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { promiseMiddleware } from './middleware';

const defaultState = {
  appName: 'deaddrop',
  drops: null,
  drop: {
    title: '',
    message: '',
    lat: null,
    lng: null
  }
};

const reducer = function(state = defaultState, action) {
  switch (action.type){
    case 'HOME_LOADED':
      return {...state, drops: action.payload.drops };
    case 'DELETE_DROP':
      return {...state, drops: state.drops.filter(drop => drop.id !== action.dropId)};
    case 'SUBMIT_DROP':
      return {...state, drops: (state.drops || []).concat([action.payload.drop])};
    case 'UPDATE_FIELD_DROP_FORM':
      console.log(state)
      return { ...state, [action.key]: action.value };
    case 'DROP_FORM_LOADED':
      return {
        ...state,
        dropId: action.payload ? action.payload.drop.id : '',
        title: action.payload ? action.payload.title : '',
        message: action.payload ? action.payload.message : ''
      }
    case 'DROP_FORM_UNLOADED':
      return {

      }
  }
  return state;
};

const store = createStore(reducer, applyMiddleware(promiseMiddleware));

function Root() {
  return (
    <MuiThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
