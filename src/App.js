import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Navbar from "./components/navbar.component";
import Register from "./components/register.component";
import Dashboard from "./components/dashboard.component";
import TestEditor from './components/testeditor.component';



function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path = "/" exact component = {Register} />
        <Route path = "/dashboard" component = {Dashboard} />
        <Route path = "/testeditor" component = {TestEditor} />
      </div>
    </Router>
  );
}

export default App;