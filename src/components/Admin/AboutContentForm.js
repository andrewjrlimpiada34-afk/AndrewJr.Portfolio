import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Card, Form } from "react-bootstrap";
import { saveAboutContent } from "../../services/portfolioService";

// Validation schema
const aboutContentSchema = z.object({
  heading: z.string().min(1, "Heading is required"),
  storyIntro: z.string().min(1, "Story intro is required"),
  storySecondary: z.string().min(1, "Story secondary is required"),
  supportText: z.string().min(1, "Support text is required"),
  paragraphs: z.string().min(1, "At least one paragraph is required"),
  hobbies: z.string(),
  quote: z.string().min(1, "Quote is required"),
  footerName: z.string().min(1, "Footer name is required"),
  storyCards: z.string(),
  focusCards: z.string(),
  skills: z.string(),
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

function AboutContentForm({ aboutContent, onSubmit, isLoading }) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(aboutContentSchema),
    defaultValues: {
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
    },
  });

  useEffect(() => {
    reset({
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
  }, [aboutContent, reset]);

  const onSubmitHandler = async (data) => {
    try {
      await saveAboutContent({
        heading: data.heading,
        storyIntro: data.storyIntro,
        storySecondary: data.storySecondary,
        supportText: data.supportText,
        paragraphs: data.paragraphs
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        hobbies: data.hobbies
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        quote: data.quote,
        footerName: data.footerName,
        storyCards: parsePairs(data.storyCards, "description"),
        focusCards: parsePairs(data.focusCards, "iconUrl"),
        skills: parsePairs(data.skills, "value"),
      });
      onSubmit();
    } catch (error) {
      console.error("Failed to save about content:", error);
    }
  };

  return (
    <Card className="admin-card">
      <Card.Body>
        <Card.Title>About Content</Card.Title>
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          <Form.Group className="mb-3">
            <Form.Label>Heading</Form.Label>
            <Controller
              name="heading"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control {...field} isInvalid={!!errors.heading} />
                  {errors.heading && <Form.Control.Feedback type="invalid">{errors.heading.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Story Intro</Form.Label>
            <Controller
              name="storyIntro"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control as="textarea" rows={3} {...field} isInvalid={!!errors.storyIntro} />
                  {errors.storyIntro && <Form.Control.Feedback type="invalid">{errors.storyIntro.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Story Secondary</Form.Label>
            <Controller
              name="storySecondary"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control as="textarea" rows={3} {...field} isInvalid={!!errors.storySecondary} />
                  {errors.storySecondary && <Form.Control.Feedback type="invalid">{errors.storySecondary.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Support Text</Form.Label>
            <Controller
              name="supportText"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control as="textarea" rows={2} {...field} isInvalid={!!errors.supportText} />
                  {errors.supportText && <Form.Control.Feedback type="invalid">{errors.supportText.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Paragraphs</Form.Label>
            <Controller
              name="paragraphs"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control as="textarea" rows={5} {...field} isInvalid={!!errors.paragraphs} />
                  <Form.Text>One paragraph per line.</Form.Text>
                  {errors.paragraphs && <Form.Control.Feedback type="invalid">{errors.paragraphs.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Hobbies</Form.Label>
            <Controller
              name="hobbies"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control as="textarea" rows={3} {...field} isInvalid={!!errors.hobbies} />
                  <Form.Text>One hobby per line.</Form.Text>
                  {errors.hobbies && <Form.Control.Feedback type="invalid">{errors.hobbies.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quote</Form.Label>
            <Controller
              name="quote"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control as="textarea" rows={3} {...field} isInvalid={!!errors.quote} />
                  {errors.quote && <Form.Control.Feedback type="invalid">{errors.quote.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Footer Name</Form.Label>
            <Controller
              name="footerName"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control {...field} isInvalid={!!errors.footerName} />
                  {errors.footerName && <Form.Control.Feedback type="invalid">{errors.footerName.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Story Cards</Form.Label>
            <Controller
              name="storyCards"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control as="textarea" rows={4} {...field} isInvalid={!!errors.storyCards} />
                  <Form.Text>Format: Label|Description (one per line)</Form.Text>
                  {errors.storyCards && <Form.Control.Feedback type="invalid">{errors.storyCards.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Focus Cards</Form.Label>
            <Controller
              name="focusCards"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control as="textarea" rows={4} {...field} isInvalid={!!errors.focusCards} />
                  <Form.Text>Format: Label|IconUrl (one per line)</Form.Text>
                  {errors.focusCards && <Form.Control.Feedback type="invalid">{errors.focusCards.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Skills</Form.Label>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Control as="textarea" rows={4} {...field} isInvalid={!!errors.skills} />
                  <Form.Text>Format: Label|Value (one per line)</Form.Text>
                  {errors.skills && <Form.Control.Feedback type="invalid">{errors.skills.message}</Form.Control.Feedback>}
                </>
              )}
            />
          </Form.Group>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save About Content"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AboutContentForm;
