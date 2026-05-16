import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "mesuehchristian12@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (typeof name !== "string" || name.length > 120) {
    return res.status(400).json({ error: "Invalid name" });
  }
  if (typeof email !== "string" || !isEmail(email) || email.length > 200) {
    return res.status(400).json({ error: "Invalid email" });
  }
  if (typeof message !== "string" || message.length > 5000) {
    return res.status(400).json({ error: "Invalid message" });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
  const sentAt = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "UTC",
  });

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>New portfolio message</title>
  </head>
  <body style="margin:0;padding:0;background-color:#050816;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#050816;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#151030;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.4);">

            <tr>
              <td style="padding:4px;background:linear-gradient(90deg,#00cea8 0%,#bf61ff 100%);">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#151030;border-radius:12px;">
                  <tr>
                    <td style="padding:32px 32px 24px;">
                      <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#aaa6c3;">New Contact</p>
                      <h1 style="margin:8px 0 0;font-size:24px;font-weight:700;color:#ffffff;line-height:1.3;">
                        ${safeName} sent you a message
                      </h1>
                      <p style="margin:8px 0 0;font-size:13px;color:#aaa6c3;">via mdchristien.com &middot; ${sentAt} UTC</p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:0 32px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0e0a24;border-radius:12px;">
                        <tr>
                          <td style="padding:20px 24px;border-bottom:1px solid #232038;">
                            <p style="margin:0;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#7a7493;">From</p>
                            <p style="margin:4px 0 0;font-size:15px;color:#ffffff;font-weight:600;">${safeName}</p>
                            <p style="margin:2px 0 0;font-size:14px;">
                              <a href="mailto:${safeEmail}" style="color:#00cea8;text-decoration:none;">${safeEmail}</a>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:20px 24px;">
                            <p style="margin:0;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#7a7493;">Message</p>
                            <p style="margin:8px 0 0;font-size:15px;color:#e6e3ff;line-height:1.6;white-space:pre-wrap;">${safeMessage}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td align="center" style="padding:24px 32px 8px;">
                      <a href="mailto:${safeEmail}?subject=Re:%20Your%20message%20on%20mdchristien.com"
                         style="display:inline-block;padding:12px 28px;background:linear-gradient(90deg,#00cea8 0%,#bf61ff 100%);color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;border-radius:10px;">
                        Reply to ${safeName}
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:24px 32px 32px;">
                      <p style="margin:0;font-size:12px;color:#7a7493;text-align:center;line-height:1.6;">
                        You're receiving this because someone submitted the contact form on
                        <a href="https://www.mdchristien.com" style="color:#aaa6c3;text-decoration:underline;">mdchristien.com</a>.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>

          <p style="margin:16px 0 0;font-size:11px;color:#5a557a;text-align:center;">
            MD Christien &middot; Portfolio Contact
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = `New portfolio message from ${name}

From: ${name} <${email}>
Sent: ${sentAt} UTC

Message:
${message}

---
Reply directly to this email to respond to ${name}.
Received via the contact form at https://www.mdchristien.com`;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Portfolio: ${name} just sent you a message`,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(502).json({ error: "Email service rejected the request" });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Unhandled error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
