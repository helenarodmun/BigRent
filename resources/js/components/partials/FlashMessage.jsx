import React, { useState } from 'react';
import { Col, Toast, ToastContainer } from 'react-bootstrap';

const FlashMessage = ({ success, error }) => {
  const [show, setShow] = useState(true);
  const toggleShow = () => setShow(!show);

  return (
    <div align="center">
      <Col sm={10}>
        {success && (
          <>
            <ToastContainer className="p-3" position="top-center">
              <Toast bg="success" show={show} onClose={toggleShow} delay={7000} autohide>
                <Toast.Header>
                  <i className="bi bi-check-lg pe-3 fs-6"></i>
                  <strong className="me-auto fs-6">¡Éxito!</strong>
                </Toast.Header>
                <Toast.Body className="fs-6">{success}</Toast.Body>
              </Toast>
            </ToastContainer>
          </>
        )}
        {error && (
          <>
            <ToastContainer className="p-3" position="top-center">
              <Toast bg="danger" show={show} onClose={toggleShow} delay={7000} autohide>
                <Toast.Header>
                  <i className="bi bi-check-lg pe-3 fs-6"></i>
                  <strong className="me-auto fs-6">¡Error!</strong>
                </Toast.Header>
                <Toast.Body className="fs-6">{error}</Toast.Body>
              </Toast>
            </ToastContainer>
          </>
        )}
      </Col>
    </div>
  );
};

export default FlashMessage;
