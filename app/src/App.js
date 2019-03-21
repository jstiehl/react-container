/*
 * Main App
 */
import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class App extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="header">React App Container</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="main">
            <p>I guess this is where I can start putting stuff?</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="footer">
              <Button variant="success">Press Me</Button>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App