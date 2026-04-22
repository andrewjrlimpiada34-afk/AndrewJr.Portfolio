import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { createProject, updateProject, deleteProject } from "../../services/portfolioService";
import { uploadImageToCloudinary } from "../../services/cloudinaryService";

// Validation schema
const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  status: z.string().min(1, "Status is required"),
  description: z.string().min(1, "Description is required"),
  stack: z.string().min(1, "Tech stack is required"),
  ghLink: z.string().url("GitHub link must be a valid URL").or(z.literal("")),
  demoLink: z.string().url("Demo link must be a valid URL").or(z.literal("")),
  imageUrl: z.string().url("Image URL must be a valid URL").or(z.literal("")),
});

function ProjectManager({ projects, onUpdate, isLoading }) {
  const [editingId, setEditingId] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      status: "",
      description: "",
      stack: "",
      ghLink: "",
      demoLink: "",
      imageUrl: "",
    },
  });

  const managedProjects = projects.filter((project) => !String(project.id || "").startsWith("default-"));

  const handleImageUpload = async (event, setValue) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setSubmitError("");
    try {
      const url = await uploadImageToCloudinary(file, "portfolio/projects");
      setValue("imageUrl", url);
    } catch (error) {
      setSubmitError(`Failed to upload image: ${error.message || "Unknown error"}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmitHandler = async (data) => {
    setSubmitError("");
    try {
      const payload = {
        title: data.title,
        status: data.status,
        description: data.description,
        stack: data.stack.split(",").map((item) => item.trim()),
        ghLink: data.ghLink,
        demoLink: data.demoLink,
        imageUrl: data.imageUrl,
      };

      if (editingId && !String(editingId).startsWith("default-")) {
        await updateProject(editingId, payload);
      } else {
        await createProject(payload);
      }

      reset({
        title: "",
        status: "",
        description: "",
        stack: "",
        ghLink: "",
        demoLink: "",
        imageUrl: "",
      });
      setEditingId("");
      onUpdate();
    } catch (error) {
      setSubmitError(`Failed to save project: ${error.message || "Unknown error"}`);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    reset({
      title: project.title || "",
      status: project.status || "",
      description: project.description || "",
      stack: Array.isArray(project.stack) ? project.stack.join(", ") : "",
      ghLink: project.ghLink || "",
      demoLink: project.demoLink || "",
      imageUrl: project.imageUrl || "",
    });
  };

  const handleDelete = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setSubmitError("");
      try {
        await deleteProject(projectId);
        onUpdate();
      } catch (error) {
        setSubmitError(`Failed to delete project: ${error.message || "Unknown error"}`);
      }
    }
  };

  const handleCancel = () => {
    reset({
      title: "",
      status: "",
      description: "",
      stack: "",
      ghLink: "",
      demoLink: "",
      imageUrl: "",
    });
    setEditingId("");
    setSubmitError("");
  };

  return (
    <Card className="admin-card">
      <Card.Body>
        <Card.Title>Add or Update Project</Card.Title>
        {submitError && <div className="alert alert-danger">{submitError}</div>}
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          <Form.Group className="mb-3">
            <Form.Label>Project Title</Form.Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control {...field} isInvalid={!!errors.title} />
                  {errors.title && <Form.Control.Feedback type="invalid">{errors.title.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control {...field} isInvalid={!!errors.status} />
                  {errors.status && <Form.Control.Feedback type="invalid">{errors.status.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control as="textarea" rows={3} {...field} isInvalid={!!errors.description} />
                  {errors.description && (
                    <Form.Control.Feedback type="invalid">{errors.description.message}</Form.Control.Feedback>
                  )}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tech Stack</Form.Label>
            <Controller
              name="stack"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control {...field} isInvalid={!!errors.stack} />
                  <Form.Text>Comma-separated values (e.g., React, Node.js, MongoDB)</Form.Text>
                  {errors.stack && <Form.Control.Feedback type="invalid">{errors.stack.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>GitHub Link</Form.Label>
            <Controller
              name="ghLink"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control {...field} isInvalid={!!errors.ghLink} />
                  {errors.ghLink && <Form.Control.Feedback type="invalid">{errors.ghLink.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Demo Link</Form.Label>
            <Controller
              name="demoLink"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control {...field} isInvalid={!!errors.demoLink} />
                  {errors.demoLink && <Form.Control.Feedback type="invalid">{errors.demoLink.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project Image URL</Form.Label>
            <Controller
              name="imageUrl"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control {...field} isInvalid={!!errors.imageUrl} />
                  {errors.imageUrl && <Form.Control.Feedback type="invalid">{errors.imageUrl.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload Project Image</Form.Label>
            <Controller
              name="imageUrl"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, (url) => onChange(url))}
                  disabled={uploadingImage || isLoading}
                />
              )}
            />
            {uploadingImage && <Spinner animation="border" size="sm" className="ms-2" />}
          </Form.Group>

          <div className="admin-actions">
            <Button type="submit" disabled={isLoading || uploadingImage}>
              {isLoading ? "Saving..." : editingId ? "Update Project" : "Add Project"}
            </Button>
            {editingId && (
              <Button variant="outline-light" onClick={handleCancel} disabled={isLoading}>
                Cancel Edit
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

// List component for managing projects
function ProjectList({ projects, onEdit, onDelete, isLoading }) {
  const managedProjects = projects.filter((project) => !String(project.id || "").startsWith("default-"));

  return (
    <div>
      <h3 className="admin-subtitle">Manage Projects</h3>
      {managedProjects.length === 0 ? (
        <p className="text-muted">No projects yet. Add one using the form above.</p>
      ) : (
        managedProjects.map((project) => (
          <div className="admin-list-item" key={project.id}>
            <div>
              <strong>{project.title}</strong>
              <p>{project.description}</p>
            </div>
            <div className="admin-actions">
              <Button variant="outline-light" size="sm" onClick={() => onEdit(project)} disabled={isLoading}>
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={() => onDelete(project.id)} disabled={isLoading}>
                Delete
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export { ProjectManager, ProjectList };
