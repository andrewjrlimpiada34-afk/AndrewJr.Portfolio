import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Card, Form } from "react-bootstrap";
import { saveHomeContent } from "../../services/portfolioService";

// Validation schema
const homeContentSchema = z.object({
  kicker: z.string().min(1, "Kicker is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  introPrimary: z.string().min(1, "Primary intro is required"),
  introSecondary: z.string().min(1, "Secondary intro is required"),
  roleLines: z.string().min(1, "At least one role is required"),
  highlights: z.string(),
  github: z.string().url("GitHub link must be a valid URL").or(z.literal("")),
  twitter: z.string().url("Twitter link must be a valid URL").or(z.literal("")),
  linkedin: z.string().url("LinkedIn link must be a valid URL").or(z.literal("")),
  instagram: z.string().url("Instagram link must be a valid URL").or(z.literal("")),
});

function listToText(list) {
  return Array.isArray(list) ? list.join("\n") : "";
}

function pairsToText(items) {
  return Array.isArray(items)
    ? items
        .map((item) => `${item.label}|${item.value || item.description || item.iconUrl || ""}`)
        .join("\n")
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

function HomeContentForm({ homeContent, onSubmit, isLoading, heroImageUrl }) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(homeContentSchema),
    defaultValues: {
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
    },
  });

  useEffect(() => {
    reset({
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
  }, [homeContent, reset]);

  const onSubmitHandler = async (data) => {
    try {
      await saveHomeContent({
        kicker: data.kicker,
        firstName: data.firstName,
        lastName: data.lastName,
        introPrimary: data.introPrimary,
        introSecondary: data.introSecondary,
        roleLines: data.roleLines
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        highlights: parsePairs(data.highlights, "value"),
        socialLinks: {
          github: data.github,
          twitter: data.twitter,
          linkedin: data.linkedin,
          instagram: data.instagram,
        },
        heroImageUrl: heroImageUrl,
      });
      onSubmit();
    } catch (error) {
      console.error("Failed to save home content:", error);
    }
  };

  return (
    <Card className="admin-card">
      <Card.Body>
        <Card.Title>Home Content</Card.Title>
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          <Form.Group className="mb-3">
            <Form.Label>Kicker</Form.Label>
            <Controller
              name="kicker"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control {...field} isInvalid={!!errors.kicker} />
                  {errors.kicker && <Form.Control.Feedback type="invalid">{errors.kicker.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control {...field} isInvalid={!!errors.firstName} />
                  {errors.firstName && <Form.Control.Feedback type="invalid">{errors.firstName.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control {...field} isInvalid={!!errors.lastName} />
                  {errors.lastName && <Form.Control.Feedback type="invalid">{errors.lastName.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role Lines</Form.Label>
            <Controller
              name="roleLines"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control as="textarea" rows={4} {...field} isInvalid={!!errors.roleLines} />
                  <Form.Text>One role per line.</Form.Text>
                  {errors.roleLines && <Form.Control.Feedback type="invalid">{errors.roleLines.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Primary Intro</Form.Label>
            <Controller
              name="introPrimary"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control as="textarea" rows={3} {...field} isInvalid={!!errors.introPrimary} />
                  {errors.introPrimary && <Form.Control.Feedback type="invalid">{errors.introPrimary.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Secondary Intro</Form.Label>
            <Controller
              name="introSecondary"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control as="textarea" rows={3} {...field} isInvalid={!!errors.introSecondary} />
                  {errors.introSecondary && <Form.Control.Feedback type="invalid">{errors.introSecondary.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Highlights</Form.Label>
            <Controller
              name="highlights"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control as="textarea" rows={4} {...field} isInvalid={!!errors.highlights} />
                  <Form.Text>Format: Label|Value (one per line)</Form.Text>
                  {errors.highlights && <Form.Control.Feedback type="invalid">{errors.highlights.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>GitHub Profile URL</Form.Label>
            <Controller
              name="github"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control {...field} isInvalid={!!errors.github} />
                  {errors.github && <Form.Control.Feedback type="invalid">{errors.github.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Twitter Profile URL</Form.Label>
            <Controller
              name="twitter"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control {...field} isInvalid={!!errors.twitter} />
                  {errors.twitter && <Form.Control.Feedback type="invalid">{errors.twitter.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>LinkedIn Profile URL</Form.Label>
            <Controller
              name="linkedin"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control {...field} isInvalid={!!errors.linkedin} />
                  {errors.linkedin && <Form.Control.Feedback type="invalid">{errors.linkedin.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Instagram Profile URL</Form.Label>
            <Controller
              name="instagram"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control {...field} isInvalid={!!errors.instagram} />
                  {errors.instagram && <Form.Control.Feedback type="invalid">{errors.instagram.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Home Content"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default HomeContentForm;
