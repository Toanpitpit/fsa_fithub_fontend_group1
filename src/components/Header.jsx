import React from 'react';
import { Search } from 'lucide-react';
import '../style/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo-section">
          <div className="logo">
            <span className="logo-fit">Fit</span>
            <span className="logo-maker">Hub</span>
          </div>
          <p className="tagline">Transform Your Body</p>
        </div>

        {/* Search Icon */}
        <button className="search-btn">
          <Search size={20} />
        </button>

        {/* Navigation */}
        <nav className="nav-links">
          <a href="#home" className="nav-link active">Home</a>
          <a href="#programs" className="nav-link">Programs</a>
          <a href="#coaching" className="nav-link">Coaching</a>
          <a href="#membership" className="nav-link">Membership</a>
          <a href="#about" className="nav-link">About Us</a>
        </nav>

        {/* Auth Buttons */}
        <div className="auth-buttons">
          <button className="btn-login">Login</button>
          <button className="btn-signup">Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
