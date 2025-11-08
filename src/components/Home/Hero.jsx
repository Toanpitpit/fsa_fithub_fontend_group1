import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Hero({ image }) {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="animate-fade-in">
            <h1 className="hero-title">
              Achieve Your<br />
              <span style={{ color: '#d90a14' }}>FITNESS GOALS</span><br />
              With FitHub
            </h1>
            <p className="hero-subtitle">
              Transform your body and mind with our expert-led fitness programs. 
              Join thousands of members who have achieved their fitness goals with FitHub.
            </p>
            <Button size="lg" className="btn-primary-red" style={{ padding: '12px 32px' }}>
              Get Started Today
            </Button>
          </Col>
          <Col lg={6}>
            <img 
              src={image} 
              alt="Fitness trainer"
              className="hero-image"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
