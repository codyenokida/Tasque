import React from 'react';
import Home from './Components/Home/Home';
import Todo from './Components/Todo/Todo'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home}/>
      <Route path="/todo" component={Todo}/>
    </Router>
  );
}

export default App;