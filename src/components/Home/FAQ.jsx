import React from 'react';
import { Container, Accordion } from 'react-bootstrap';

export default function FAQ() {
  const faqs = [
    {
      question: "Why is FitMaker a Subscription? Why Can't I buy it in a lifetime pack?",
      answer: "Our subscription model allows us to continuously update and improve our services, add new workout programs, and provide ongoing support from our expert trainers."
    },
    {
      question: "Can I try FitMaker before buying it for FitMaker?",
      answer: "Yes! We offer a 7-day free trial so you can experience all the features before committing to a subscription."
    },
    {
      question: "What is included in the Custom Plan?",
      answer: "The Custom Plan includes one-on-one coaching sessions, personalized meal plans, customized workout routines, and unlimited access to all our resources."
    },
    {
      question: "How do I make payment for the Bundle?",
      answer: "We accept all major credit cards, PayPal, and cryptocurrency payments for your convenience."
    },
    {
      question: "What should I expect after I have bought the 'Gym'?",
      answer: "After purchase, you'll receive immediate access to all programs, your personalized dashboard, and an onboarding call with one of our expert trainers."
    }
  ];

  return (
    <section className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">FAQ</h2>
        </div>

        <Accordion defaultActiveKey="0" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {faqs.map((faq, idx) => (
            <Accordion.Item eventKey={String(idx)} key={idx}>
              <Accordion.Header>{faq.question}</Accordion.Header>
              <Accordion.Body>{faq.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
