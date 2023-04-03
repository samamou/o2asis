import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
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
          <Route path="/" exact element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-plants" element={<MyPlants />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
