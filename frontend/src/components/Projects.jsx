import React, { useState, useEffect } from 'react';
import './Projects.css';
import { ExternalLink, Code } from 'lucide-react';
import { API_BASE_URL } from '../config';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects`)
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <p className="section-subtitle">Here are some of my recent works that showcase my skills.</p>
        </div>

        {loading ? (
          <div className="text-center"><p>Loading projects...</p></div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="glass-card project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.github} className="icon-link" aria-label="GitHub Repository">
                      <Code size={20} />
                    </a>
                    <a href={project.live} className="icon-link" aria-label="Live Demo">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
