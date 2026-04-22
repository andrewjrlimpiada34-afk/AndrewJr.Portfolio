import React, { useState, useCallback } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import Particle from "../Particle";
import { useAuth } from "../../context/AuthContext";
import { usePortfolio } from "../../context/PortfolioContext";
import LoadingSpinner from "../LoadingSpinner";
import HomeContentForm from "./HomeContentForm";
import AboutContentForm from "./AboutContentForm";
import SettingsForm from "./SettingsForm";
import { ProjectManager, ProjectList } from "./ProjectManager";
import { CertificateManager, CertificateList } from "./CertificateManager";


function AdminDashboard() {
  const { logout } = useAuth();
  const { homeContent, aboutContent, settings, projects, certificates, refreshData, loading, error } = usePortfolio();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = useCallback(async () => {
    setBusy(true);
    try {
      await refreshData();
      setMessage("Changes saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error refreshing data:", err);
    } finally {
      setBusy(false);
    }
  }, [refreshData]);

  if (loading) {
    return (
      <Container fluid className="admin-section">
        <Particle />
        <Container>
          <LoadingSpinner />
        </Container>
      </Container>
    );
  }

  return (
    <Container fluid className="admin-section">
      <Particle />
      <Container>
        <div className="admin-header">
          <div>
            <h1 className="project-heading">
              Admin <strong className="purple">Dashboard</strong>
            </h1>
            <p className="section-support admin-support">
              Manage projects, certificates, profile assets, and portfolio content from one protected area.
            </p>
          </div>
          <Button variant="outline-light" onClick={logout}>
            Logout
          </Button>
        </div>

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Row>
          <Col lg={6} className="admin-card-wrap">
            <HomeContentForm
              homeContent={homeContent}
              onSubmit={handleSubmit}
              isLoading={busy}
              heroImageUrl={settings.heroImageUrl || homeContent.heroImageUrl}
            />
          </Col>

          <Col lg={6} className="admin-card-wrap">
            <AboutContentForm aboutContent={aboutContent} onSubmit={handleSubmit} isLoading={busy} />
          </Col>

          <Col lg={6} className="admin-card-wrap">
            <SettingsForm
              settings={settings}
              aboutContent={aboutContent}
              homeContent={homeContent}
              onSubmit={handleSubmit}
              isLoading={busy}
            />
          </Col>

          <Col lg={6} className="admin-card-wrap">
            <ProjectManager projects={projects} onUpdate={handleSubmit} isLoading={busy} />
          </Col>

          <Col lg={6} className="admin-card-wrap">
            <CertificateManager certificates={certificates} onUpdate={handleSubmit} isLoading={busy} />
          </Col>

          <Col lg={12} className="admin-card-wrap">
            <Row>
              <Col lg={6}>
                <ProjectList projects={projects} onEdit={() => {}} onDelete={() => {}} isLoading={busy} />
              </Col>
              <Col lg={6}>
                <CertificateList certificates={certificates} onEdit={() => {}} onDelete={() => {}} isLoading={busy} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default AdminDashboard;
