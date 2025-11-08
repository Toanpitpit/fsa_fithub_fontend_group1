import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function Stats() {
  const stats = [
    {
      number: '96%',
      color: 'red',
      title: 'Client Satisfaction',
      description: 'Our members love their results and experience'
    },
    {
      number: '+5',
      color: 'orange',
      title: 'Years of Experience',
      description: 'Trust in our proven track record of transforming'
    },
    {
      number: '+800',
      color: 'red',
      title: 'Active Members',
      description: 'Join our thriving fitness community'
    },
    {
      number: '24/7',
      color: 'orange',
      title: 'Support Available',
      description: 'Expert assistance whenever you need it'
    }
  ];

  return (
    <section className="stats-section">
      <Container>
        <Row>
          {stats.map((stat, idx) => (
            <Col md={3} key={idx} className="stat-item">
              <h2 className={`stat-number ${stat.color}`}>{stat.number}</h2>
              <p className="stat-title">{stat.title}</p>
              <p className="stat-description">{stat.description}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
