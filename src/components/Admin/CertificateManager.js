import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { createCertificate, updateCertificate, deleteCertificate } from "../../services/portfolioService";
import { uploadImageToCloudinary } from "../../services/cloudinaryService";

// Validation schema
const certificateSchema = z.object({
  title: z.string().min(1, "Certificate title is required"),
  imageUrl: z.string().min(1, "Image URL is required").url("Image URL must be a valid URL"),
});

function CertificateManager({ certificates, onUpdate, isLoading }) {
  const [editingId, setEditingId] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
    },
  });

  const managedCertificates = certificates.filter((cert) => !String(cert.id || "").startsWith("cert-"));

  const handleImageUpload = async (event, setValue) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setSubmitError("");
    try {
      const url = await uploadImageToCloudinary(file, "portfolio/certificates");
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
        imageUrl: data.imageUrl,
      };

      if (editingId && !String(editingId).startsWith("cert-")) {
        await updateCertificate(editingId, payload);
      } else {
        await createCertificate(payload);
      }

      reset({ title: "", imageUrl: "" });
      setEditingId("");
      onUpdate();
    } catch (error) {
      setSubmitError(`Failed to save certificate: ${error.message || "Unknown error"}`);
    }
  };

  const handleEdit = (certificate) => {
    setEditingId(certificate.id);
    reset({
      title: certificate.title || "",
      imageUrl: certificate.imageUrl || "",
    });
  };

  const handleDelete = async (certificateId) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      setSubmitError("");
      try {
        await deleteCertificate(certificateId);
        onUpdate();
      } catch (error) {
        setSubmitError(`Failed to delete certificate: ${error.message || "Unknown error"}`);
      }
    }
  };

  const handleCancel = () => {
    reset({ title: "", imageUrl: "" });
    setEditingId("");
    setSubmitError("");
  };

  return (
    <Card className="admin-card">
      <Card.Body>
        <Card.Title>Add or Update Certificate</Card.Title>
        {submitError && <div className="alert alert-danger">{submitError}</div>}
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          <Form.Group className="mb-3">
            <Form.Label>Certificate Title</Form.Label>
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
            <Form.Label>Certificate Image URL</Form.Label>
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
            <Form.Label>Upload Certificate Image</Form.Label>
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
              {isLoading ? "Saving..." : editingId ? "Update Certificate" : "Upload Certificate"}
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

// List component for managing certificates
function CertificateList({ certificates, onEdit, onDelete, isLoading }) {
  const managedCertificates = certificates.filter((cert) => !String(cert.id || "").startsWith("cert-"));

  return (
    <div>
      <h3 className="admin-subtitle">Manage Certificates</h3>
      {managedCertificates.length === 0 ? (
        <p className="text-muted">No certificates yet. Add one using the form above.</p>
      ) : (
        managedCertificates.map((certificate) => (
          <div className="admin-list-item" key={certificate.id}>
            <div>
              <strong>{certificate.title}</strong>
              <p>{certificate.imageUrl}</p>
            </div>
            <div className="admin-actions">
              <Button variant="outline-light" size="sm" onClick={() => onEdit(certificate)} disabled={isLoading}>
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={() => onDelete(certificate.id)} disabled={isLoading}>
                Delete
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export { CertificateManager, CertificateList };
