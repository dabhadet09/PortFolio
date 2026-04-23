import React, { useState } from 'react';
import './Contact.css';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { API_BASE_URL } from '../config';

const Contact = ({ profile }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  if (!profile) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
          <p className="section-subtitle">Have a project in mind or want to collaborate? Let's talk.</p>
        </div>

        <div className="contact-wrapper">
          <div className="contact-info">
            <div className="glass-card contact-card">
              <div className="contact-item">
                <div className="icon-wrapper">
                  <Mail size={24} />
                </div>
                <div>
                  <h3>Email</h3>
                  <p>{profile.email}</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="icon-wrapper">
                  <Phone size={24} />
                </div>
                <div>
                  <h3>Phone</h3>
                  <p>{profile.phone}</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="icon-wrapper">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3>Location</h3>
                  <p>{profile.location}</p>
                </div>
              </div>
            </div>
          </div>

          <form className="glass-card contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" value={formData.message} onChange={handleChange} required placeholder="Tell me about your project..."></textarea>
            </div>
            {status && <p className={`status-message ${status.includes('success') ? 'success' : 'error'}`}>{status}</p>}
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'} <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
