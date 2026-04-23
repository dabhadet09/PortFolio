import React from 'react';
import './Footer.css';
import { Code, User, MessageCircle, Heart } from 'lucide-react';

const Footer = ({ profile }) => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h2>TD.</h2>
            <p>Building digital experiences with passion and precision.</p>
          </div>

          <div className="footer-social">
            <a href="#" aria-label="GitHub"><Code size={20} /></a>
            <a href="#" aria-label="LinkedIn"><User size={20} /></a>
            <a href="#" aria-label="Twitter"><MessageCircle size={20} /></a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {profile ? profile.name : "Tushar Dabhade"}. All rights reserved.
          </p>
          <p className="made-with">
            Made with <Heart size={16} className="heart-icon" /> By {profile ? profile.name : "Tushar Dabhade"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
