"use client";

import { useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";

type SubmitState = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formRef.current || submitState === "sending") return;

    setSubmitState("sending");
    const formData = new FormData(formRef.current);
    const body = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === "string") body.append(key, value);
    });
    body.set("form-name", "contact");

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!response.ok) throw new Error("The form service did not accept the submission.");
      formRef.current.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <form
      ref={formRef}
      className="contact-form"
      name="contact"
      method="POST"
      action="/__forms.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="subject" value="New 1MinConvert contact message" />
      <div className="contact-honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="contact-form-grid">
        <div className="contact-field">
          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" maxLength={100} required placeholder="Jane Smith" />
        </div>
        <div className="contact-field">
          <label htmlFor="contact-email">Email address</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required placeholder="jane@example.com" />
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="contact-topic">What is this about?</label>
        <select id="contact-topic" name="topic" defaultValue="feedback" required>
          <option value="feedback">Feedback or suggestion</option>
          <option value="tool-issue">A tool is not working</option>
          <option value="privacy">Privacy request</option>
          <option value="other">Something else</option>
        </select>
      </div>

      <div className="contact-field">
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" rows={6} minLength={8} maxLength={5000} required placeholder="Tell us how we can help…" />
        <span className="contact-field-help">Please include enough detail for us to understand your request. Do not attach files or share sensitive information.</span>
      </div>

      {submitState === "success" && (
        <p className="contact-form-status contact-form-status-success" role="status">
          <CheckCircle2 size={18} aria-hidden="true" /> Your message was submitted. Thank you for contacting 1MinConvert.
        </p>
      )}
      {submitState === "error" && (
        <p className="contact-form-status contact-form-status-error" role="alert">
          <AlertCircle size={18} aria-hidden="true" /> We couldn’t confirm your submission. Please try again later or use the email link below. If this keeps happening, the site owner needs to check Netlify form detection.
        </p>
      )}

      <button className="button button-primary contact-submit" type="submit" disabled={submitState === "sending"}>
        {submitState === "sending" ? "Sending message…" : "Send message"}
        {submitState !== "sending" && <Send size={16} aria-hidden="true" />}
      </button>
      <p className="contact-form-disclosure">Your message and reply email are sent to Netlify’s form-handling service and made available to the site owner. Do not include sensitive personal information.</p>
    </form>
  );
}
