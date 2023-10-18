import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Benefits from '../components/Benefits';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-background">
      {/* <Hero /> */}
      <div class="hero">
        <h1>Discover o₂asis</h1>
        <h2> Your Indoor Air Quality Companion</h2>
        <p>Tracking air quality in real-time using TeleAgriculture Kit 
          sensors and offering
           personalized tips for a healthier home. Discover the joy of fresh air with o₂asis. </p>
        <Link to="/dashboard" className="cta-button">Get started</Link>
    </div>


    </div>
  );
}

export default Home;
