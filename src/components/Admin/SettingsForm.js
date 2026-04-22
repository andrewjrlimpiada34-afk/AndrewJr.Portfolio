import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { saveSettings, saveAboutContent, saveHomeContent } from "../../services/portfolioService";
import { uploadImageToCloudinary } from "../../services/cloudinaryService";

// Validation schema
const settingsSchema = z.object({
  githubProfile: z.string().url("GitHub profile must be a valid URL").or(z.literal("")),
  logoUrl: z.string().url("Logo URL must be a valid URL").or(z.literal("")),
  profileImageUrl: z.string().url("Profile image URL must be a valid URL").or(z.literal("")),
  heroImageUrl: z.string().url("Hero image URL must be a valid URL").or(z.literal("")),
});

function SettingsForm({ settings, aboutContent, homeContent, onSubmit, isLoading }) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      githubProfile: settings.githubProfile || "",
      logoUrl: settings.logoUrl || "",
      profileImageUrl: aboutContent.profileImageUrl || "",
      heroImageUrl: homeContent.heroImageUrl || "",
    },
  });

  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    reset({
      githubProfile: settings.githubProfile || "",
      logoUrl: settings.logoUrl || "",
      profileImageUrl: aboutContent.profileImageUrl || "",
      heroImageUrl: homeContent.heroImageUrl || "",
    });
  }, [settings, aboutContent, homeContent, reset]);

  const handleLogoUpload = async (event, setValue) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    setUploadError("");
    try {
      const url = await uploadImageToCloudinary(file, "portfolio/logos");
      setValue("logoUrl", url);
    } catch (error) {
      setUploadError(`Failed to upload logo: ${error.message || "Unknown error"}`);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleProfileUpload = async (event, setValue) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingProfile(true);
    setUploadError("");
    try {
      const url = await uploadImageToCloudinary(file, "portfolio/profile");
      setValue("profileImageUrl", url);
    } catch (error) {
      setUploadError(`Failed to upload profile image: ${error.message || "Unknown error"}`);
    } finally {
      setUploadingProfile(false);
    }
  };

  const handleHeroUpload = async (event, setValue) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingHero(true);
    setUploadError("");
    try {
      const url = await uploadImageToCloudinary(file, "portfolio/hero");
      setValue("heroImageUrl", url);
    } catch (error) {
      setUploadError(`Failed to upload hero image: ${error.message || "Unknown error"}`);
    } finally {
      setUploadingHero(false);
    }
  };

  const onSubmitHandler = async (data) => {
    try {
      setUploadError("");
      await Promise.all([
        saveSettings({
          githubProfile: data.githubProfile,
          logoUrl: data.logoUrl,
        }),
        saveAboutContent({
          profileImageUrl: data.profileImageUrl,
        }),
        saveHomeContent({
          heroImageUrl: data.heroImageUrl,
        }),
      ]);
      onSubmit();
    } catch (error) {
      setUploadError(`Failed to save settings: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <Card className="admin-card">
      <Card.Body>
        <Card.Title>Assets and Branding</Card.Title>
        {uploadError && <div className="alert alert-danger">{uploadError}</div>}
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          <Form.Group className="mb-3">
            <Form.Label>GitHub Profile URL</Form.Label>
            <Controller
              name="githubProfile"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control {...field} isInvalid={!!errors.githubProfile} />
                  {errors.githubProfile && (
                    <Form.Control.Feedback type="invalid">{errors.githubProfile.message}</Form.Control.Feedback>
                  )}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Navbar Logo URL</Form.Label>
            <Controller
              name="logoUrl"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control {...field} isInvalid={!!errors.logoUrl} />
                  {errors.logoUrl && <Form.Control.Feedback type="invalid">{errors.logoUrl.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload Logo Image</Form.Label>
            <Controller
              name="logoUrl"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogoUpload(e, (url) => onChange(url))}
                  disabled={uploadingLogo || isLoading}
                />
              )}
            />
            {uploadingLogo && <Spinner animation="border" size="sm" className="ms-2" />}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Profile Photo URL</Form.Label>
            <Controller
              name="profileImageUrl"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control {...field} isInvalid={!!errors.profileImageUrl} />
                  {errors.profileImageUrl && (
                    <Form.Control.Feedback type="invalid">{errors.profileImageUrl.message}</Form.Control.Feedback>
                  )}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload Profile Photo</Form.Label>
            <Controller
              name="profileImageUrl"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleProfileUpload(e, (url) => onChange(url))}
                  disabled={uploadingProfile || isLoading}
                />
              )}
            />
            {uploadingProfile && <Spinner animation="border" size="sm" className="ms-2" />}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Hero Image URL</Form.Label>
            <Controller
              name="heroImageUrl"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control {...field} isInvalid={!!errors.heroImageUrl} />
                  {errors.heroImageUrl && (
                    <Form.Control.Feedback type="invalid">{errors.heroImageUrl.message}</Form.Control.Feedback>
                  )}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload Hero Image</Form.Label>
            <Controller
              name="heroImageUrl"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleHeroUpload(e, (url) => onChange(url))}
                  disabled={uploadingHero || isLoading}
                />
              )}
            />
            {uploadingHero && <Spinner animation="border" size="sm" className="ms-2" />}
          </Form.Group>

          <Button type="submit" disabled={isLoading || uploadingLogo || uploadingProfile || uploadingHero}>
            {isLoading ? "Saving..." : "Save Settings"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default SettingsForm;
