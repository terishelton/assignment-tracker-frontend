import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './components/shared/Header'
import Navigation from './components/shared/navigation/Navigation'
import './App.css';

class App extends React.Component {
  render () {
    return (
      <Router>
        <Header />
        <Navigation />
      </Router>
    )
  }
}

export default App;
