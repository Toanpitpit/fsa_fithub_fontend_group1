import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, FloatingLabel, Alert } from 'react-bootstrap';
import { Eye, EyeSlash,Envelope,Lock, ArrowRight } from 'react-bootstrap-icons';
import { Dumbbell} from "lucide-react";
import '../style/AdvancedLogin.css'

const AdvancedLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log('Login data:', formData);
        setIsLoading(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleInput = (e) => {
        const input = e.target;
        const rect = input.getBoundingClientRect();

        for (let i = 0; i < 6; i++) {
            const spark = document.createElement("span");
            spark.className = "spark";

            spark.style.left = `${Math.random() * rect.width + 20}px`;
            spark.style.top = `${Math.random() * rect.height + 20}px`;

            const x = (Math.random() - 0.5) * 120;
            const y = (Math.random() - 0.5) * 120;
            spark.style.setProperty("--x", `${x}px`);
            spark.style.setProperty("--y", `${y}px`);

            input.parentNode.appendChild(spark);
            setTimeout(() => spark.remove(), 600);
        }
    };



    return (
        <div className="advanced-login-container">
            {/* Animated Background Elements */}
            <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
                <div className="shape shape-5"></div>
            </div>

            {/* Glowing Orbs */}
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>

            <Container fluid className="h-100">
                <Row className="h-100 justify-content-center align-items-center advanced-login-card-box">
                    <Col xl={4} lg={6} md={8} sm={10} xs={12}>
                        <Card className="advanced-login-card">
                            <div className="card-glow"></div>

                           
                            <Card.Header className="login-card-header">
                                {/* <div className="logo-container">
                                    <div className="logo-circle">
                                        <Dumbbell className="logo-icon" />
                                     
                                    </div>
                                </div> */}
                                <h2 className="welcome-text">Welcome To SmartFitHub</h2>
                                <p className="welcome-subtext">Sign in to continue your journey</p>
                            </Card.Header>

                            <Card.Body className="p-4">
                                {/* Social Login Buttons




                                {/* Login Form */}
                                <Form onSubmit={handleSubmit}>
                                    <FloatingLabel controlId="floatingEmail" label="Email Address" className="mb-3 firework-containe">
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="name@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onInput={handleInput}
                                            className="form-input"
                                            required
                                        />
                                        <Envelope className="input-icon" />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 firework-containe">
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            onInput={handleInput}
                                            className="form-input"
                                            required
                                        />
                                        <Lock className="input-icon" />
                                        <Button
                                            variant="link"
                                            className="password-toggle"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeSlash /> : <Eye />}
                                        </Button>
                                    </FloatingLabel>
                                    {/* Divider */}
                                    <div className="divider-section">
                                        <span className="divider-line"></span>
                                        <span className="divider-text">OR</span>
                                        <span className="divider-line"></span>
                                    </div>

                                    <div className="social-login-section">
                                        <Button variant="outline-primary" className="social-btn google-btn">
                                            <img src="https://www.google.com/favicon.ico" alt="Google" />
                                            Continue with Google
                                        </Button>
                                    </div>

                                    {/* Remember Me & Forgot Password */}
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <Form.Check
                                            type="checkbox"
                                            id="remember-me"
                                            label="Remember me"
                                            className="remember-check"
                                        />
                                        <a href="#forgot" className="forgot-link">
                                            Forgot Password?
                                        </a>
                                    </div>

                                    {/* Login Button */}
                                    <Button
                                        type="submit"
                                        className={`login-btn ${isLoading ? 'loading' : ''}`}
                                        disabled={isLoading}
                                    >
                                        <span className="btn-text">
                                            {isLoading ? 'Signing In...' : 'Sign In'}
                                        </span>
                                        <span className="btn-icon">
                                            <ArrowRight />
                                        </span>
                                        <span className="btn-loader"></span>
                                    </Button>
                                </Form>

                                {/* Sign Up Link */}
                                <div className="signup-section text-center mt-4">
                                    <p className="signup-text">
                                        Don't have an account?{' '}
                                        <a href="#signup" className="signup-link">
                                            Create Account
                                        </a>
                                    </p>
                                </div>
                            </Card.Body>

                            {/* Footer */}
                            <Card.Footer className="login-card-footer">
                                <p className="footer-text">
                                    By continuing, you agree to our{' '}
                                    <a href="#terms" className="footer-link">Terms of Service</a>
                                    {' '}and{' '}
                                    <a href="#privacy" className="footer-link">Privacy Policy</a>
                                </p>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdvancedLogin;