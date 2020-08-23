import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css';
import Logo from './components/logo';

function App() {
  return (
      <Router>
          <Switch>
          <Route path = '/card/' />
          </Switch>
      </Router>
  )
}

ReactDom.render(<App />, document.getElementById('root'));