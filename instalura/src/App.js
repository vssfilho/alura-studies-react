import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { timeline } from './components/reducers/timeline';

import Header from './components/Header';
import Timeline from './components/Timeline';

const store = createStore(timeline, applyMiddleware(thunkMiddleware));

class App extends Component {
  render() {
    return (
      <div id="root">
        <div className="main">
          <Header />
          <Timeline login={this.props.params.login} store={store} />
        </div>
      </div>
    );
  }
}

export default App;
