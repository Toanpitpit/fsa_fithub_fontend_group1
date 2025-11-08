import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      type: 'pro',
      package: 'Package',
      packageColor: 'orange',
      title: 'Pro Plan',
      descTitle: 'Description',
      descTitleColor: 'orange',
      description: 'Our Pro Plan offers advanced workouts and personalized nutrition coaching to help you reach your goals faster. Sign Up Right Now!',
      featTitle: 'Features',
      featTitleColor: 'orange',
      features: [
        'Access to All Of Our Exercise Videos',
        'Progress Tracking',
        'Supportive Online Community',
        'Advanced, Personalized Workout Plans',
        'Comprehensive Nutrition Coaching',
        'Access to Advanced Workout Programs',
        'Body Composition Analysis'
      ],
      price: '99$'
    },
    {
      type: 'custom',
      package: 'Package',
      packageColor: 'red',
      title: 'Custom Plan',
      descTitle: 'Description',
      descTitleColor: 'red',
      description: 'Experience a fully tailored fitness experience with our Custom Plan. Work one-on-one with a dedicated trainer to achieve your goals.',
      featTitle: 'Features',
      featTitleColor: 'red',
      features: [
        'Access to All Of Our Exercise Videos',
        'Progress Tracking',
        'Supportive Online Community',
        'Advanced, Personalized Workout Plans',
        'Comprehensive Nutrition Coaching',
        'One-on-One Coaching Sessions',
        'Customized Meal Plans'
      ],
      price: '149$'
    },
    {
      type: 'beginner',
      package: 'Package',
      packageColor: 'orange',
      title: 'Beginner Plan',
      descTitle: 'Description',
      descTitleColor: 'orange',
      description: 'Perfect for those just starting their fitness journey. Get access to beginner-friendly workouts and basic nutrition guidance.',
      featTitle: 'Features',
      featTitleColor: 'orange',
      features: [
        'Access to All Of Our Exercise Videos',
        'Progress Tracking',
        'Supportive Online Community',
        'Basic Workout Plans',
        'Nutrition Guidelines'
      ],
      price: '49$'
    }
  ];

  return (
    <section className="py-5">
      <Container>
        <div className="text-center mb-4">
          <h2 className="section-title">
            Our <span className="highlight">Plans</span>
          </h2>
          <p className="section-subtitle">
            Select the plan that suits your fitness goals and let our expert coaches guide you every step of the way.
          </p>
        </div>

        <div className="d-flex justify-content-center mb-5">
          <div className="pricing-toggle">
            <Button
              className={billingCycle === 'monthly' ? 'active' : ''}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </Button>
            <Button
              className={billingCycle === 'annually' ? 'active' : ''}
              onClick={() => setBillingCycle('annually')}
            >
              Annually
            </Button>
          </div>
        </div>

        <Row>
          {plans.map((plan, idx) => (
            <Col md={4} key={idx} className="mb-4">
              <Card className={`pricing-card ${plan.type}`}>
                <Card.Body>
                  <p className={`pricing-package ${plan.packageColor}`}>
                    {plan.package}
                  </p>
                  <h3 className="pricing-title">{plan.title}</h3>
                  
                  <div className="mb-3">
                    <p className={`pricing-description-title ${plan.descTitleColor}`}>
                      {plan.descTitle}
                    </p>
                    <p className="pricing-description">{plan.description}</p>
                  </div>

                  <div className="mb-3">
                    <p className={`pricing-description-title ${plan.featTitleColor}`}>
                      {plan.featTitle}
                    </p>
                    <ul className="pricing-features">
                      {plan.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pricing-price">
                    <span className="pricing-amount">{plan.price}</span>
                    <span className="pricing-currency">/USDT</span>
                  </div>

                  <Button className="btn-primary-red w-100">
                    Choose Plan
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
