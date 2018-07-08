import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { matchPattern } from 'react-router/lib/PatternUtils'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './App';
import Login from './components/Login';
import Logout from './components/Logout';

import { timeline } from './components/reducers/timeline';
import { notificacao } from './components/reducers/header';

import './css/reset.css';
import './css/timeline.css';
import './css/login.css';

function verificaAutenticacao(nextState, replace) {

    const resultado = matchPattern('/timeline(/:login)', nextState.location.pathname);
    const enderecoPrivadoTimeline = resultado.paramValues[0] === undefined;

    if (enderecoPrivadoTimeline && localStorage.getItem('auth-token') === null) {
        replace('/?msg=Você precisa estar logado para acessar a aplicação.');
    }

}

const reducers = combineReducers({timeline,notificacao});
const store = createStore(reducers,applyMiddleware(thunkMiddleware));

ReactDOM.render(
    (
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={Login} />
                <Route path="/timeline(/:login)" component={App} onEnter={verificaAutenticacao} />
                <Route path="/logout" component={Logout} />
            </Router>
        </Provider>
    ),
    document.getElementById('root')
);