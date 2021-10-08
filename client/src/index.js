import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

//les reducer s'occupe de la logique d'action au données
//selon une action donnée elle efectue un traitement sut le state
//ici les reducers concernes les demandes
import reducers from './reducers';

import App from './App';
import './styles/index.scss';

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
