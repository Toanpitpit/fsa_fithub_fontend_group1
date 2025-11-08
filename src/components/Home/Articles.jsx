import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Articles({ articles }) {
  return (
    <section className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">
            Articles <span className="highlight">and News</span>
          </h2>
        </div>

        <Row>
          {articles.map((article, idx) => (
            <Col key={idx} md={4} className="mb-4">
              <Card className="article-card">
                <Card.Img variant="top" src={article.img} />
                <Card.Body>
                  <Card.Text className="article-date">
                    {article.date}
                  </Card.Text>
                  <Card.Title className="article-title">
                    {article.title}
                  </Card.Title>
                  <div className="article-link">
                    Read More →
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
