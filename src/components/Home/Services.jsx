import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Services({ services }) {
  return (
    <section className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">
            Our <span className="highlight">Services</span>
          </h2>
          <p className="section-subtitle">
            At This Part You Can Easily access all of our servises. take a look at them and chose wich ever you want.
          </p>
        </div>

        <Row>
          {services.map((service, idx) => (
            <Col key={idx} md={6} lg={3} className="mb-4">
              <Card className="service-card">
                <Card.Img 
                  variant="top" 
                  src={service.img}
                />
                <Card.ImgOverlay className="d-flex align-items-end">
                  <div className="service-overlay">
                    Learn More →
                  </div>
                </Card.ImgOverlay>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
