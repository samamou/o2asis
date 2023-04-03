import React from 'react';
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
        <h2>Your personal indoor air quality monitoring and improvement solution</h2>
        <p>Experience a healthier living space with o₂asis, an interactive web app that 
          combines sensors from TeleAgriculture Kit with real-time data visualization and tailored 
          recommendations. Take charge of your indoor environment.</p>
          
        <button class="cta-button" onclick="location.href='dashboard.html'">Get started</button>
    </div>


    </div>
  );
}

export default Home;
