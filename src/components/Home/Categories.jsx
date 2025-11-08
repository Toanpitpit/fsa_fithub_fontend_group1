import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Categories({ categories }) {
  return (
    <section className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">
            Our <span className="highlight">Fitness</span>
          </h2>
        </div>

        <Row>
          {categories.map((category, idx) => (
            <Col key={idx} xs={6} md={4} lg={2} className="mb-4">
              <Card className="category-card">
                <Card.Img 
                  variant="top" 
                  src={category.img}
                />
                <Card.Body>
                  <Card.Text className="category-title">
                    {category.title}
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
