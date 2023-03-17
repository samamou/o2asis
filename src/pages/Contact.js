import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Contact() {
  return (
    <div>
      <Header />
      <section className="contact">
        <h2>Contact Us</h2>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
          <button type="submit">Send</button>
        </form>
      </section>
      <Footer />
    </div>
  );
}

export default Contact;
