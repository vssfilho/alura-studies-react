import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import './index.css';

import App from './App';
import Home from './Home';
import AutorBox from './Autor';

ReactDOM.render(
    <BrowserRouter history={createBrowserHistory}>
        <div>
            <App>
                <Route exact path="/" component={Home} />
                <Route path="/autor" component={AutorBox}/> 
                <Route path="/livro" /> 
            </App>
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);
