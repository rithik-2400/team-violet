import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-wrapper">
      {/* Hero */}
      <div className="home-hero">
        <div className="hero-bg-grid" />
        <div className="hero-content">
          <p className="hero-eyebrow">SRM Institute of Science and Technology</p>
          <h1 className="hero-title">
            TEAM <span>BROWN</span>
          </h1>
          <p className="hero-subtitle">
            Welcome to the TEAM BROWN Management Portal — Full Stack Development · CLAT-2 · 21CSS301T
          </p>
          <div className="hero-buttons">
            <Link to="/add" className="btn btn-primary">
              ＋ Add Member
            </Link>
            <Link to="/view" className="btn btn-outline">
              👥 View Members
            </Link>
          </div>
        </div>

        {/* Decorative bar */}
        <div className="hero-bar" />
      </div>

      {/* Features */}
      <div className="home-features page-wrapper">
        <h2 className="page-title">MANAGE <span>YOUR TEAM</span></h2>
        <div className="divider" />
        <div className="features-grid">
          <div className="feature-card card">
            <div className="feature-icon">📋</div>
            <h3>Add Members</h3>
            <p>Register team members with their full profile — name, role, contact, image, and more.</p>
            <Link to="/add" className="btn btn-ghost" style={{ marginTop: '16px' }}>
              Go to Form →
            </Link>
          </div>
          <div className="feature-card card">
            <div className="feature-icon">👁️</div>
            <h3>View All Members</h3>
            <p>Browse the complete list of registered team members stored in the database.</p>
            <Link to="/view" className="btn btn-ghost" style={{ marginTop: '16px' }}>
              View List →
            </Link>
          </div>
          <div className="feature-card card">
            <div className="feature-icon">🔍</div>
            <h3>Member Details</h3>
            <p>Click any member card to see their full profile including project, hobbies and aim.</p>
            <Link to="/view" className="btn btn-ghost" style={{ marginTop: '16px' }}>
              Browse →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
