import React from 'react';
import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home}/>
      <Route path="/dashboard" component={Dashboard}/>
    </Router>
  );
}

export default App;