import React, { useState, useEffect } from 'react';
import './Skills.css';
import { Code2, Database, Layout, Server } from 'lucide-react';
import { API_BASE_URL } from '../config';

const iconMap = {
  "Layout": <Layout className="skill-icon" size={32} />,
  "Server": <Server className="skill-icon" size={32} />,
  "Database": <Database className="skill-icon" size={32} />,
  "Code2": <Code2 className="skill-icon" size={32} />
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/skills`)
      .then(res => res.json())
      .then(data => {
        setSkills(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching skills:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="skills" className="section bg-darker">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">My <span className="gradient-text">Skills</span></h2>
          <p className="section-subtitle">Technologies and tools I use to build robust applications.</p>
        </div>

        {loading ? (
          <div className="text-center"><p>Loading skills...</p></div>
        ) : (
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="glass-card skill-card">
                <div className="skill-header">
                  {iconMap[skill.iconName]}
                  <h3 className="skill-category">{skill.category}</h3>
                </div>
                <div className="skill-tags">
                  {skill.technologies.map((tech) => (
                    <span key={tech} className="skill-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
