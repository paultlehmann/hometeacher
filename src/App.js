import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Navbar from "./components/navbar.component";
import Register from "./components/register.component";
import Dashboard from "./components/dashboard.component";



function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path = "/" exact component = {Register} />
        <Route path = "/dashboard" component = {Dashboard} />
      </div>
    </Router>
  );
}

export default App;