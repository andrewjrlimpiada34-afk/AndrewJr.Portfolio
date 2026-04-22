import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminLoginModal({ show, handleClose }) {
  const navigate = useNavigate();
  const { login, isFirebaseConfigured } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(email, password);
      setEmail("");
      setPassword("");
      handleClose();
      navigate("/admin");
    } catch (loginError) {
      setError(loginError.message || "Unable to log in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Admin Authentication</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isFirebaseConfigured && (
          <Alert variant="warning">
            Firebase auth is not configured yet. Add your Firebase environment
            variables before using admin login.
          </Alert>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="adminEmail">
            <Form.Label>Admin Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your admin email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="adminPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" disabled={submitting || !isFirebaseConfigured}>
            {submitting ? "Logging in..." : "Login"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AdminLoginModal;
