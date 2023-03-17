import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MyPlants() {
  return (
    <div>
      <Header />
      <section className="my-plants">
        <h2>My Plants</h2>
        <p>You have no plants yet.</p>
      </section>
      <Footer />
    </div>
  );
}

export default MyPlants;
