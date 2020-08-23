import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css';
import Navbar from './components/navbar';
import cardCreate from './pages/cardCreate';
import cardList from './pages/cardList';
import cardInfo from './pages/cardInfo';
import cardUpdate from './pages/cardUpdate';

function App() {
  return (
    <Router>
      <Navbar/>
          <Switch>
          <Route path = '/card/create' exact component = {cardCreate}/>
          <Route path = '/card/list' exact component = {cardList}/>
          <Route path = '/card/info/:id' exact component = {cardInfo}/>
          <Route path = '/card/update/:id' exact component = {cardUpdate}/>
          </Switch>
      </Router>
  )
}

ReactDom.render(<App />, document.getElementById('root'));