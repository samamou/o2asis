import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Dash1 from './pages/Dashboard';
import Dash2 from './pages/Dash2';
import Contact from './pages/Contact';
import MyPlants from './pages/MyPlants';

import Header from './components/Header';
import Footer from './components/Footer';
import './styles/Home.css';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Routes> 
          <Route path="/" exact element={<Home />}/>
          <Route path="/dashboard" element={<Dash1 />} />
          <Route path="/Dash2" element={<Dash2 />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-plants" element={<MyPlants />} />
        </Routes>
        
      </div>
      
    </Router>
  );
}

export default App;
