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
};

const reducer = function(state = defaultState, action) {
  switch (action.type){
    case 'HOME_LOADED':
      return {...state, drops: action.payload.drops };
    case 'DELETE_DROP':
      return {...state, drops: state.drops.filter(drop => drop.id !== action.dropId)};
    case 'UPDATE_DROP':
      return;
    case 'CREATE_DROP':
      return {...state, drops: (state.drops || []).concat([action.payload.drop])};
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
