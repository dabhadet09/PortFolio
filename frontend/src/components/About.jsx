import React from 'react';
import './About.css';
import { BookOpen, Briefcase, GraduationCap, Award } from 'lucide-react';

const About = ({ profile }) => {
  if (!profile) return null;

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
          <p className="section-subtitle">My education, experience, and certifications.</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            {profile.about.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "lead" : ""}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="about-cards">
            <div className="glass-card info-card">
              <GraduationCap className="info-icon" size={28} />
              <h3>B.E. Comp Engg</h3>
              <p>2022–2026</p>
            </div>
            <div className="glass-card info-card">
              <Briefcase className="info-icon" size={28} />
              <h3>Cognizant</h3>
              <p>IoT Intern</p>
            </div>
            <div className="glass-card info-card">
              <BookOpen className="info-icon" size={28} />
              <h3>LeetCode</h3>
              <p>150+ Solved</p>
            </div>
            <div className="glass-card info-card">
              <Award className="info-icon" size={28} />
              <h3>Certified</h3>
              <p>Java, React</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
