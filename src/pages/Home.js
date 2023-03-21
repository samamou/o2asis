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
      <Hero />
      <Benefits />
      <HowItWorks />
      <Features />
      <Footer />
    </div>
  );
}

export default Home;
