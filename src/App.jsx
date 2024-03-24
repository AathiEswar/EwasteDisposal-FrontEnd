import React from 'react'
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {Navbar} from "./Components" ;
import {Homepage , SearchMap } from "./Pages" ;
import AdminPage from './Pages/AdminPage';
import State from './context/State';
// Import your publishable key

 

const App = () => {

  axios.defaults.baseURL ="https://ewastedisposal.onrender.com";
  //axios.defaults.baseURL ="http://localhost:7000";
  axios.defaults.withCredentials = false;
  return (
    <div>
    
      <State>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Homepage/>} />
          <Route exact path="/search" element={<SearchMap/>} />
          <Route exact path="/admin" element={<AdminPage/>} />
        </Routes>
  
      </Router>
      </State>
    </div>
  )
}

export default App