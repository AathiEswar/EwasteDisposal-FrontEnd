import React from 'react'
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {Navbar} from "./Components" ;
import {Homepage , SearchMap } from "./Pages" ;
import State from './context/State';

const App = () => {
  axios.defaults.baseURL = "http://localhost:7000";
  axios.defaults.withCredentials = true;
  return (
    <div>
      <State>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Homepage/>} />
          <Route exact path="/search" element={<SearchMap/>} />
        </Routes>
  
      </Router>
      </State>
    </div>
  )
}

export default App