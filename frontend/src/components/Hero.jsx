import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import './Hero.css';

const Hero = ({ profile }) => {
  if (!profile) return null; // or a skeleton loader

  return (
    <section id="hero" className="hero-section section">
      <div className="bg-glow"></div>
      <div className="bg-glow-right"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <span className="badge animate-fade-up">Available for Work</span>
          <h1 className="hero-title animate-fade-up delay-100">
            Hi, I'm <span className="gradient-text">{profile.name}</span>
            <br />
            {profile.role}
          </h1>
          <p className="hero-subtitle animate-fade-up delay-200">
            {profile.subtitle}
          </p>
          <div className="hero-cta animate-fade-up delay-300">
            <a href="#projects" className="btn btn-primary">
              View My Work <ArrowRight size={18} />
            </a>
            <a href="#" className="btn btn-secondary">
              Resume <Download size={18} />
            </a>
          </div>
        </div>
        <div className="hero-image-wrapper animate-fade-up delay-200">
          <div className="hero-image-glass">
            {/* Replace src with your image */}
            <img
              src="Hero.jpg"
              alt="Profile"
              className="hero-image"
            />
            {profile.stats && profile.stats.map((stat, index) => (
              <div key={index} className={`floating-card card-${index + 1}`}>
                <span className="gradient-text font-bold">{stat.value}</span>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
