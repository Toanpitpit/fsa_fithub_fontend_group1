import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Team({ trainers }) {
  return (
    <section className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">
            Meet <span className="highlight">Our</span>
          </h2>
          <p className="section-subtitle">
            A Talented Team To Provide The Best Quality Training And support.
          </p>
        </div>

        <Row>
          {trainers.map((trainer, idx) => (
            <Col key={idx} md={6} lg={3} className="mb-4">
              <Card className="team-card">
                <Card.Img variant="top" src={trainer.img} />
                <Card.Body>
                  <Card.Title className="team-name">
                    {trainer.name}
                  </Card.Title>
                  <Card.Text className="team-role">
                    {trainer.role}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
