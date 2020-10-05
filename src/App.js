import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Navbar from "./components/navbar.component";
import Register from "./components/register.component";
import Dashboard from "./components/dashboard.component";
import TestEditor from "./components/testeditor.component";
import QEditor from "./components/qeditor.component";
import AssignTest from "./components/assigntest.component";



function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path = "/" exact component = {Register} />
        <Route path = "/dashboard" component = {Dashboard} />
        <Route path = "/testeditor" component = {TestEditor} />
        <Route path = "/qeditor" component = {QEditor} />
        <Route path = "/assigntest" component = {AssignTest} />
      </div>
    </Router>
  );
}

export default App;