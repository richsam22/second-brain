import React from 'react';
import { Container, Accordion } from 'react-bootstrap';

const About = () => {
  const isDark = localStorage.getItem("theme") === "dark";  // Or get from context/state

  return (
    <Container className="my-5">
      <h2 className="mb-4">About Second Brain</h2>

      <Accordion defaultActiveKey="0" className={`about-accordion ${isDark ? 'dark' : ''}`}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Terms & Conditions</Accordion.Header>
          <Accordion.Body>
            By using Second Brain, you agree to use it responsibly and not misuse the platform in any illegal or unethical way.
            This tool is provided “as is” without any warranties. We reserve the right to modify or discontinue features at any time.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Privacy Policy</Accordion.Header>
          <Accordion.Body>
            We do not collect or store any personal data unless explicitly shared by you.
            All notes and settings are stored locally on your device via localStorage. No data is sent to a server or third party.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Credits & Version</Accordion.Header>
          <Accordion.Body>
            <p><strong>Second Brain</strong> is an AI-enhanced note-taking and knowledge storage application.
            It helps you organize your thoughts, capture ideas, and generate smart insights using AI.
            Your productivity companion — always by your side.</p>
            <p>Designed and developed with ❤️ by Sam (React + Bootstrap + Custom CSS).</p>
            <p>Version: <code>v1.0.0</code></p>
            <p>AI features powered locally using <code>Ollama</code>.</p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default About;




