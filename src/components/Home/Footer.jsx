import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={3} className="mb-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="logo-box" />
              <div>
                <div className="brand-name">
                  Fit<span style={{ color: '#d90a14' }}>Maker</span>
                </div>
                <div className="brand-tagline">Transform Your Body</div>
              </div>
            </div>
            <p style={{ fontSize: '14px', opacity: 0.7 }}>
              Your journey to a healthier, stronger you starts here.
            </p>
          </Col>

          <Col md={3} className="mb-4">
            <h5 className="footer-title">Programs</h5>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li className="mb-2">
                <a href="#" className="footer-link">Weight Loss</a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">Muscle Building</a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">Cardio Training</a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">Yoga & Pilates</a>
              </li>
            </ul>
          </Col>

          <Col md={3} className="mb-4">
            <h5 className="footer-title">Company</h5>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li className="mb-2">
                <a href="#" className="footer-link">About Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">Contact</a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">Careers</a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">Blog</a>
              </li>
            </ul>
          </Col>

          <Col md={3} className="mb-4">
            <h5 className="footer-title">Connect</h5>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li className="mb-2">
                <a href="#" className="footer-link">Facebook</a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">Instagram</a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">Twitter</a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">YouTube</a>
              </li>
            </ul>
          </Col>
        </Row>

        <div className="footer-copyright">
          <p>© 2025 FitMaker. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
