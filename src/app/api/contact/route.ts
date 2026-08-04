import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contactSchema, type ContactPayload } from "@/lib/validation";

// Where enquiries land, and who they come from.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "krystaltech7@gmail.com";
// Must be an address on a domain verified in your Resend account.
// Falls back to Resend's shared sender (only delivers to your own
// account email) so local testing still works before a domain is set up.
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Krystal Tech Hub <onboarding@resend.dev>";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// One "Label: value" row per filled field, in reading order.
function row(label: string, value?: string): string {
  const v = (value ?? "").trim();
  if (!v) return "";
  return `
    <tr>
      <td style="padding:6px 16px 6px 0;color:#11142B;opacity:0.55;font-size:13px;vertical-align:top;white-space:nowrap;">${esc(
        label,
      )}</td>
      <td style="padding:6px 0;color:#11142B;font-size:14px;">${esc(v).replace(
        /\n/g,
        "<br/>",
      )}</td>
    </tr>`;
}

function buildEmail(data: ContactPayload): { subject: string; html: string; text: string } {
  const isTech = data.hub === "tech";
  const kind = isTech ? "Enrolment enquiry" : "Project enquiry";
  const subject = `${kind} from ${data.name}`;

  const hubRows = isTech
    ? row("Learner", data.learner) +
      row("Learner's age", data.age) +
      row("Program", data.program)
    : row("Company", data.company) +
      row("Service", data.service) +
      row("Budget", data.budget);

  const html = `
  <div style="background:#F3F1EA;padding:32px 0;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid rgba(17,20,43,0.06);">
      <div style="background:#11142B;padding:24px 28px;">
        <p style="margin:0;color:#FFB627;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;">Krystal Tech Hub</p>
        <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;">${esc(kind)}</h1>
      </div>
      <div style="padding:24px 28px;">
        <table style="width:100%;border-collapse:collapse;">
          ${row("Name", data.name)}
          ${row("Email", data.email)}
          ${row("Phone", data.phone)}
          ${hubRows}
          ${row("Message", data.message)}
        </table>
      </div>
      <div style="padding:16px 28px;border-top:1px solid rgba(17,20,43,0.08);">
        <p style="margin:0;color:#11142B;opacity:0.45;font-size:12px;">Reply directly to this email to reach ${esc(
          data.name,
        )}.</p>
      </div>
    </div>
  </div>`;

  const textLines = [
    kind,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : "",
    isTech ? `Learner: ${data.learner || "-"}` : `Company: ${data.company || "-"}`,
    isTech ? `Age: ${data.age || "-"}` : `Service: ${data.service || "-"}`,
    isTech ? `Program: ${data.program || "-"}` : `Budget: ${data.budget || "-"}`,
    "",
    `Message: ${data.message || "-"}`,
  ].filter(Boolean);

  return { subject, html, text: textLines.join("\n") };
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Email is not configured on the server." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    console.error(
      "Contact validation failed:",
      JSON.stringify(parsed.error.issues, null, 2),
    );
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message || "Please check the form and try again." },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot tripped: a real user never fills this. Pretend success so
  // bots get no signal, but don't send anything.
  if (data.website && data.website.trim() !== "") {
    console.warn("Contact honeypot tripped - dropping submission.");
    return NextResponse.json({ ok: true });
  }

  const { subject, html, text } = buildEmail(data);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "We couldn't send your message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
