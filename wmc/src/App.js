import React from 'react';
import {BrowserRouter as Router, Switch , Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact ><Home></Home></Route>
        <Route path="/login" exact><Login></Login></Route>
        <Route path="/register" exact><Register></Register></Route>
      </Switch>
    </Router>
  );
}

export default App;
