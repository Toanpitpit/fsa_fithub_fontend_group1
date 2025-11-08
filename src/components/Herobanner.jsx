import React from 'react';
import '../style/HeroBanner.css';

const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <div className="hero-container">

        <div className="hero-content">
          <h1 className="hero-title">
            Achieve Your<br />
            <span className="hero-title-highlight">FITNESS GOALS</span><br />
            With FitMaker
          </h1>
          
          <p className="hero-description">
            Join The Fitmaker Community And Transform Your Fitness Journey. Our Expert Coaches And 
            Personalized Programs Are Designed To Help You Achieve Your Goals And Exceed Your 
            Expectations. Ready To Make A Change?
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">Start Your Journey</button>
            <button className="btn-secondary">Explore Programs</button>
          </div>
        </div>

        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=800&fit=crop" 
            alt="Fitness Trainer" 
            className="trainer-image"
          />
          
          <div className="stat-badge badge-coaches">
            <span className="stat-number">+ 80</span>
            <span className="stat-label">Coaches</span>
          </div>
          
          <div className="stat-badge badge-reviews">
            <span className="stat-number">+ 1300</span>
            <span className="stat-label">Positive Reviews</span>
          </div>
          
          <div className="stat-badge badge-videos">
            <span className="stat-number">+ 1000</span>
            <span className="stat-label">Workout Videos</span>
          </div>
          
          <div className="stat-badge badge-trainers">
            <span className="stat-number">+ 1500</span>
            <span className="stat-label">Trainers</span>
          </div>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-value">96%</span>
          <span className="stat-title">Client Satisfaction</span>
          <span className="stat-desc">Our Members Love Their Results And Continue</span>
        </div>
        
        <div className="stat-divider"></div>
        
        <div className="stat-item">
          <span className="stat-value">+5</span>
          <span className="stat-title">Years of Experience</span>
          <span className="stat-desc">Tried & Our Trusted Years Of Transforming</span>
        </div>
        
        <div className="stat-divider"></div>
        
        <div className="stat-item">
          <span className="stat-value">+800</span>
          <span className="stat-title">Active Members</span>
          <span className="stat-desc">Join Our Thriving Fitness Community</span>
        </div>
        
        <div className="stat-divider"></div>
        
        <div className="stat-item">
          <span className="stat-value">24/7</span>
          <span className="stat-title">Support Available</span>
          <span className="stat-desc">Expert Assistance Whenever You Need It</span>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
