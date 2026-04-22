import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import Particle from "../Particle";
import { useAuth } from "../../context/AuthContext";
import { usePortfolio } from "../../context/PortfolioContext";
import {
  createCertificate,
  createProject,
  deleteCertificate,
  deleteProject,
  saveAboutContent,
  saveHomeContent,
  saveSettings,
  updateCertificate,
  updateProject,
} from "../../services/portfolioService";
import { uploadImageToCloudinary } from "../../services/cloudinaryService";

function listToText(list) {
  return Array.isArray(list) ? list.join("\n") : "";
}

function pairsToText(items) {
  return Array.isArray(items)
    ? items.map((item) => `${item.label}|${item.value || item.description || item.iconUrl || ""}`).join("\n")
    : "";
}

function parsePairs(text, secondKey) {
  return text
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [label, value] = item.split("|");
      return { label: label?.trim() || "", [secondKey]: value?.trim() || "" };
    })
    .filter((item) => item.label);
}

function AdminDashboard() {
  const { logout } = useAuth();
  const { homeContent, aboutContent, settings, projects, certificates, refreshData } =
    usePortfolio();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const [homeForm, setHomeForm] = useState({
    kicker: homeContent.kicker,
    firstName: homeContent.firstName,
    lastName: homeContent.lastName,
    introPrimary: homeContent.introPrimary,
    introSecondary: homeContent.introSecondary,
    roleLines: listToText(homeContent.roleLines),
    highlights: pairsToText(homeContent.highlights),
    github: homeContent.socialLinks.github,
    twitter: homeContent.socialLinks.twitter,
    linkedin: homeContent.socialLinks.linkedin,
    instagram: homeContent.socialLinks.instagram,
  });

  const [aboutForm, setAboutForm] = useState({
    heading: aboutContent.heading,
    storyIntro: aboutContent.storyIntro,
    storySecondary: aboutContent.storySecondary,
    supportText: aboutContent.supportText,
    paragraphs: listToText(aboutContent.paragraphs),
    hobbies: listToText(aboutContent.hobbies),
    quote: aboutContent.quote,
    footerName: aboutContent.footerName,
    storyCards: pairsToText(aboutContent.storyCards),
    focusCards: pairsToText(aboutContent.focusCards),
    skills: pairsToText(aboutContent.skills),
  });

  const [settingsForm, setSettingsForm] = useState({
    githubProfile: settings.githubProfile || "",
    logoUrl: settings.logoUrl || "",
    profileImageUrl: aboutContent.profileImageUrl || "",
    heroImageUrl: homeContent.heroImageUrl || "",
  });

  const [projectForm, setProjectForm] = useState({
    id: "",
    title: "",
    status: "",
    description: "",
    stack: "",
    ghLink: "",
    demoLink: "",
    imageUrl: "",
  });

  const [certificateForm, setCertificateForm] = useState({
    id: "",
    title: "",
    imageUrl: "",
  });
  const managedProjects = projects.filter(
    (project) => !String(project.id || "").startsWith("default-")
  );
  const managedCertificates = certificates.filter(
    (certificate) => !String(certificate.id || "").startsWith("cert-")
  );

  useEffect(() => {
    setHomeForm({
      kicker: homeContent.kicker,
      firstName: homeContent.firstName,
      lastName: homeContent.lastName,
      introPrimary: homeContent.introPrimary,
      introSecondary: homeContent.introSecondary,
      roleLines: listToText(homeContent.roleLines),
      highlights: pairsToText(homeContent.highlights),
      github: homeContent.socialLinks.github,
      twitter: homeContent.socialLinks.twitter,
      linkedin: homeContent.socialLinks.linkedin,
      instagram: homeContent.socialLinks.instagram,
    });
  }, [homeContent]);

  useEffect(() => {
    setAboutForm({
      heading: aboutContent.heading,
      storyIntro: aboutContent.storyIntro,
      storySecondary: aboutContent.storySecondary,
      supportText: aboutContent.supportText,
      paragraphs: listToText(aboutContent.paragraphs),
      hobbies: listToText(aboutContent.hobbies),
      quote: aboutContent.quote,
      footerName: aboutContent.footerName,
      storyCards: pairsToText(aboutContent.storyCards),
      focusCards: pairsToText(aboutContent.focusCards),
      skills: pairsToText(aboutContent.skills),
    });
  }, [aboutContent]);

  useEffect(() => {
    setSettingsForm({
      githubProfile: settings.githubProfile || "",
      logoUrl: settings.logoUrl || "",
      profileImageUrl: aboutContent.profileImageUrl || "",
      heroImageUrl: homeContent.heroImageUrl || "",
    });
  }, [settings, aboutContent.profileImageUrl, homeContent.heroImageUrl]);

  async function perform(action, successMessage) {
    setBusy(true);
    setError("");
    setMessage("");

    try {
      await action();
      await refreshData();
      setMessage(successMessage);
    } catch (actionError) {
      setError(actionError.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  async function uploadAndSet(file, callback, folder) {
    if (!file) {
      return;
    }

    await perform(async () => {
      const url = await uploadImageToCloudinary(file, folder);
      callback(url);
    }, "Image uploaded successfully.");
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
              Manage projects, certificates, profile assets, and portfolio copy
              from one protected area.
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
            <Card className="admin-card">
              <Card.Body>
                <Card.Title>Home Content</Card.Title>
                <Form
                  onSubmit={(event) => {
                    event.preventDefault();
                    perform(
                      () =>
                        saveHomeContent({
                          kicker: homeForm.kicker,
                          firstName: homeForm.firstName,
                          lastName: homeForm.lastName,
                          introPrimary: homeForm.introPrimary,
                          introSecondary: homeForm.introSecondary,
                          roleLines: homeForm.roleLines
                            .split("\n")
                            .map((item) => item.trim())
                            .filter(Boolean),
                          highlights: parsePairs(homeForm.highlights, "value"),
                          socialLinks: {
                            github: homeForm.github,
                            twitter: homeForm.twitter,
                            linkedin: homeForm.linkedin,
                            instagram: homeForm.instagram,
                          },
                          heroImageUrl: settingsForm.heroImageUrl,
                        }),
                      "Home content updated."
                    );
                  }}
                >
                  <Form.Group className="mb-3">
                    <Form.Label>Kicker</Form.Label>
                    <Form.Control
                      value={homeForm.kicker}
                      onChange={(event) =>
                        setHomeForm({ ...homeForm, kicker: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      value={homeForm.firstName}
                      onChange={(event) =>
                        setHomeForm({ ...homeForm, firstName: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      value={homeForm.lastName}
                      onChange={(event) =>
                        setHomeForm({ ...homeForm, lastName: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Role Lines</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={homeForm.roleLines}
                      onChange={(event) =>
                        setHomeForm({ ...homeForm, roleLines: event.target.value })
                      }
                    />
                    <Form.Text>One role per line.</Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Primary Intro</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={homeForm.introPrimary}
                      onChange={(event) =>
                        setHomeForm({ ...homeForm, introPrimary: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Secondary Intro</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={homeForm.introSecondary}
                      onChange={(event) =>
                        setHomeForm({ ...homeForm, introSecondary: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Highlights</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={homeForm.highlights}
                      onChange={(event) =>
                        setHomeForm({ ...homeForm, highlights: event.target.value })
                      }
                    />
                    <Form.Text>Use one item per line: `Label|Value`</Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>GitHub Link</Form.Label>
                    <Form.Control
                      value={homeForm.github}
                      onChange={(event) =>
                        setHomeForm({ ...homeForm, github: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Twitter/X Link</Form.Label>
                    <Form.Control
                      value={homeForm.twitter}
                      onChange={(event) =>
                        setHomeForm({ ...homeForm, twitter: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>LinkedIn Link</Form.Label>
                    <Form.Control
                      value={homeForm.linkedin}
                      onChange={(event) =>
                        setHomeForm({ ...homeForm, linkedin: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Instagram Link</Form.Label>
                    <Form.Control
                      value={homeForm.instagram}
                      onChange={(event) =>
                        setHomeForm({ ...homeForm, instagram: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Button type="submit" disabled={busy}>
                    Save Home Content
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} className="admin-card-wrap">
            <Card className="admin-card">
              <Card.Body>
                <Card.Title>About Content</Card.Title>
                <Form
                  onSubmit={(event) => {
                    event.preventDefault();
                    perform(
                      () =>
                        saveAboutContent({
                          heading: aboutForm.heading,
                          storyIntro: aboutForm.storyIntro,
                          storySecondary: aboutForm.storySecondary,
                          supportText: aboutForm.supportText,
                          paragraphs: aboutForm.paragraphs
                            .split("\n")
                            .map((item) => item.trim())
                            .filter(Boolean),
                          hobbies: aboutForm.hobbies
                            .split("\n")
                            .map((item) => item.trim())
                            .filter(Boolean),
                          quote: aboutForm.quote,
                          footerName: aboutForm.footerName,
                          storyCards: parsePairs(aboutForm.storyCards, "description"),
                          focusCards: parsePairs(aboutForm.focusCards, "description"),
                          skills: parsePairs(aboutForm.skills, "iconUrl"),
                          profileImageUrl: settingsForm.profileImageUrl,
                        }),
                      "About content updated."
                    );
                  }}
                >
                  <Form.Group className="mb-3">
                    <Form.Label>Heading</Form.Label>
                    <Form.Control
                      value={aboutForm.heading}
                      onChange={(event) =>
                        setAboutForm({ ...aboutForm, heading: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Story Intro</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={aboutForm.storyIntro}
                      onChange={(event) =>
                        setAboutForm({ ...aboutForm, storyIntro: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Story Secondary</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={aboutForm.storySecondary}
                      onChange={(event) =>
                        setAboutForm({
                          ...aboutForm,
                          storySecondary: event.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>About Paragraphs</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      value={aboutForm.paragraphs}
                      onChange={(event) =>
                        setAboutForm({ ...aboutForm, paragraphs: event.target.value })
                      }
                    />
                    <Form.Text>One paragraph per line.</Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Hobbies</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={aboutForm.hobbies}
                      onChange={(event) =>
                        setAboutForm({ ...aboutForm, hobbies: event.target.value })
                      }
                    />
                    <Form.Text>One hobby per line.</Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Quote</Form.Label>
                    <Form.Control
                      value={aboutForm.quote}
                      onChange={(event) =>
                        setAboutForm({ ...aboutForm, quote: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Footer Name</Form.Label>
                    <Form.Control
                      value={aboutForm.footerName}
                      onChange={(event) =>
                        setAboutForm({ ...aboutForm, footerName: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Story Cards</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={aboutForm.storyCards}
                      onChange={(event) =>
                        setAboutForm({ ...aboutForm, storyCards: event.target.value })
                      }
                    />
                    <Form.Text>Use one item per line: `Title|Description`</Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Focus Cards</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={aboutForm.focusCards}
                      onChange={(event) =>
                        setAboutForm({ ...aboutForm, focusCards: event.target.value })
                      }
                    />
                    <Form.Text>Use one item per line: `Title|Description`</Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Skills</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      value={aboutForm.skills}
                      onChange={(event) =>
                        setAboutForm({ ...aboutForm, skills: event.target.value })
                      }
                    />
                    <Form.Text>Use one item per line: `Skill|Icon URL`</Form.Text>
                  </Form.Group>
                  <Button type="submit" disabled={busy}>
                    Save About Content
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} className="admin-card-wrap">
            <Card className="admin-card">
              <Card.Body>
                <Card.Title>Assets and Branding</Card.Title>
                <Form
                  onSubmit={(event) => {
                    event.preventDefault();
                    perform(
                      async () => {
                        await saveSettings({
                          githubProfile: settingsForm.githubProfile,
                          logoUrl: settingsForm.logoUrl,
                        });
                        await saveAboutContent({
                          profileImageUrl: settingsForm.profileImageUrl,
                        });
                        await saveHomeContent({
                          heroImageUrl: settingsForm.heroImageUrl,
                        });
                      },
                      "Asset settings updated."
                    );
                  }}
                >
                  <Form.Group className="mb-3">
                    <Form.Label>GitHub Profile URL</Form.Label>
                    <Form.Control
                      value={settingsForm.githubProfile}
                      onChange={(event) =>
                        setSettingsForm({
                          ...settingsForm,
                          githubProfile: event.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Navbar Logo URL</Form.Label>
                    <Form.Control
                      value={settingsForm.logoUrl}
                      onChange={(event) =>
                        setSettingsForm({ ...settingsForm, logoUrl: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Profile Photo URL</Form.Label>
                    <Form.Control
                      value={settingsForm.profileImageUrl}
                      onChange={(event) =>
                        setSettingsForm({
                          ...settingsForm,
                          profileImageUrl: event.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Hero Image URL</Form.Label>
                    <Form.Control
                      value={settingsForm.heroImageUrl}
                      onChange={(event) =>
                        setSettingsForm({
                          ...settingsForm,
                          heroImageUrl: event.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Upload Logo Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        uploadAndSet(
                          event.target.files?.[0],
                          (url) => setSettingsForm({ ...settingsForm, logoUrl: url }),
                          "portfolio/logos"
                        )
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Upload Profile Photo</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        uploadAndSet(
                          event.target.files?.[0],
                          (url) =>
                            setSettingsForm({
                              ...settingsForm,
                              profileImageUrl: url,
                            }),
                          "portfolio/profile"
                        )
                      }
                    />
                  </Form.Group>
                  <Button type="submit" disabled={busy}>
                    Save Asset Settings
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} className="admin-card-wrap">
            <Card className="admin-card">
              <Card.Body>
                <Card.Title>Add or Update Project</Card.Title>
                <Form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const payload = {
                      title: projectForm.title,
                      status: projectForm.status,
                      description: projectForm.description,
                      stack: projectForm.stack
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean),
                      ghLink: projectForm.ghLink,
                      demoLink: projectForm.demoLink,
                      imageUrl: projectForm.imageUrl,
                    };

                    perform(
                      async () => {
                        if (
                          projectForm.id &&
                          !String(projectForm.id).startsWith("default-")
                        ) {
                          await updateProject(projectForm.id, payload);
                        } else {
                          await createProject(payload);
                        }
                        setProjectForm({
                          id: "",
                          title: "",
                          status: "",
                          description: "",
                          stack: "",
                          ghLink: "",
                          demoLink: "",
                          imageUrl: "",
                        });
                      },
                      projectForm.id ? "Project updated." : "Project created."
                    );
                  }}
                >
                  <Form.Group className="mb-3">
                    <Form.Label>Project Title</Form.Label>
                    <Form.Control
                      value={projectForm.title}
                      onChange={(event) =>
                        setProjectForm({ ...projectForm, title: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      value={projectForm.status}
                      onChange={(event) =>
                        setProjectForm({ ...projectForm, status: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={projectForm.description}
                      onChange={(event) =>
                        setProjectForm({
                          ...projectForm,
                          description: event.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Stack</Form.Label>
                    <Form.Control
                      placeholder="React, Firebase, Cloudinary"
                      value={projectForm.stack}
                      onChange={(event) =>
                        setProjectForm({ ...projectForm, stack: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>GitHub Link</Form.Label>
                    <Form.Control
                      value={projectForm.ghLink}
                      onChange={(event) =>
                        setProjectForm({ ...projectForm, ghLink: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Demo Link</Form.Label>
                    <Form.Control
                      value={projectForm.demoLink}
                      onChange={(event) =>
                        setProjectForm({ ...projectForm, demoLink: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Project Image URL</Form.Label>
                    <Form.Control
                      value={projectForm.imageUrl}
                      onChange={(event) =>
                        setProjectForm({ ...projectForm, imageUrl: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Upload Project Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        uploadAndSet(
                          event.target.files?.[0],
                          (url) => setProjectForm({ ...projectForm, imageUrl: url }),
                          "portfolio/projects"
                        )
                      }
                    />
                  </Form.Group>
                  <div className="admin-actions">
                    <Button type="submit" disabled={busy}>
                      {projectForm.id ? "Update Project" : "Add Project"}
                    </Button>
                    {projectForm.id && (
                      <Button
                        variant="outline-light"
                        onClick={() =>
                          setProjectForm({
                            id: "",
                            title: "",
                            status: "",
                            description: "",
                            stack: "",
                            ghLink: "",
                            demoLink: "",
                            imageUrl: "",
                          })
                        }
                      >
                        Cancel Edit
                      </Button>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} className="admin-card-wrap">
            <Card className="admin-card">
              <Card.Body>
                <Card.Title>Add or Update Certificate</Card.Title>
                <Form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const payload = {
                      title: certificateForm.title,
                      imageUrl: certificateForm.imageUrl,
                    };

                    perform(
                      async () => {
                        if (
                          certificateForm.id &&
                          !String(certificateForm.id).startsWith("cert-")
                        ) {
                          await updateCertificate(certificateForm.id, payload);
                        } else {
                          await createCertificate(payload);
                        }
                        setCertificateForm({ id: "", title: "", imageUrl: "" });
                      },
                      certificateForm.id
                        ? "Certificate updated."
                        : "Certificate uploaded."
                    );
                  }}
                >
                  <Form.Group className="mb-3">
                    <Form.Label>Certificate Title</Form.Label>
                    <Form.Control
                      value={certificateForm.title}
                      onChange={(event) =>
                        setCertificateForm({
                          ...certificateForm,
                          title: event.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Certificate Image URL</Form.Label>
                    <Form.Control
                      value={certificateForm.imageUrl}
                      onChange={(event) =>
                        setCertificateForm({
                          ...certificateForm,
                          imageUrl: event.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Upload Certificate Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        uploadAndSet(
                          event.target.files?.[0],
                          (url) =>
                            setCertificateForm({
                              ...certificateForm,
                              imageUrl: url,
                            }),
                          "portfolio/certificates"
                        )
                      }
                    />
                  </Form.Group>
                  <div className="admin-actions">
                    <Button type="submit" disabled={busy}>
                      {certificateForm.id ? "Update Certificate" : "Upload Certificate"}
                    </Button>
                    {certificateForm.id && (
                      <Button
                        variant="outline-light"
                        onClick={() => setCertificateForm({ id: "", title: "", imageUrl: "" })}
                      >
                        Cancel Edit
                      </Button>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={12} className="admin-card-wrap">
            <Card className="admin-card">
              <Card.Body>
                <Card.Title>Manage Entries</Card.Title>
                <Row>
                  <Col lg={6}>
                    <h3 className="admin-subtitle">Projects</h3>
                    {managedProjects.map((project) => (
                      <div className="admin-list-item" key={project.id}>
                        <div>
                          <strong>{project.title}</strong>
                          <p>{project.description}</p>
                        </div>
                        <div className="admin-actions">
                          <Button
                            variant="outline-light"
                            size="sm"
                            onClick={() =>
                              setProjectForm({
                                id: project.id,
                                title: project.title || "",
                                status: project.status || "",
                                description: project.description || "",
                                stack: Array.isArray(project.stack)
                                  ? project.stack.join(", ")
                                  : "",
                                ghLink: project.ghLink || "",
                                demoLink: project.demoLink || "",
                                imageUrl: project.imageUrl || "",
                              })
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() =>
                              perform(
                                () => deleteProject(project.id),
                                "Project deleted."
                              )
                            }
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </Col>
                  <Col lg={6}>
                    <h3 className="admin-subtitle">Certificates</h3>
                    {managedCertificates.map((certificate) => (
                      <div className="admin-list-item" key={certificate.id}>
                        <div>
                          <strong>{certificate.title}</strong>
                          <p>{certificate.imageUrl}</p>
                        </div>
                        <div className="admin-actions">
                          <Button
                            variant="outline-light"
                            size="sm"
                            onClick={() =>
                              setCertificateForm({
                                id: certificate.id,
                                title: certificate.title || "",
                                imageUrl: certificate.imageUrl || "",
                              })
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() =>
                              perform(
                                () => deleteCertificate(certificate.id),
                                "Certificate deleted."
                              )
                            }
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default AdminDashboard;
