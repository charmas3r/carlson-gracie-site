import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;

export const resend = apiKey ? new Resend(apiKey) : null;

export const FROM_EMAIL =
  process.env.FROM_EMAIL || 'info@updates.carlsongracieescondido.com';
export const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || '';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://carlsongracieescondido.com';

const ACADEMY_NAME = 'Carlson Gracie Escondido';

type EmailResult = { success: boolean; id?: string; error?: string };

function ensureReady(): string | null {
  if (!resend) return 'RESEND_API_KEY is not set';
  if (!BUSINESS_EMAIL) return 'BUSINESS_EMAIL is not set';
  return null;
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  freeTrialRequest?: boolean;
  source?: string;
}

export async function sendContactConfirmation(
  data: ContactFormData
): Promise<EmailResult> {
  const error = ensureReady();
  if (error) return { success: false, error };

  try {
    const result = await resend!.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Thank you for contacting ${ACADEMY_NAME}`,
      html: `<!DOCTYPE html>
<html>
  <head><meta charset="utf-8"></head>
  <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#333;max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:#dc2626;color:white;padding:30px 20px;text-align:center;border-radius:8px 8px 0 0;">
      <h1 style="margin:0;">Thank You, ${data.name}!</h1>
    </div>
    <div style="background:#f9fafb;padding:30px 20px;border-radius:0 0 8px 8px;">
      <p>We received your message and will get back to you within 24 hours.</p>
      <p><strong>What you sent us:</strong></p>
      <p style="background:white;padding:15px;border-radius:6px;border-left:4px solid #dc2626;">
        ${data.message}
      </p>
      ${
        data.freeTrialRequest
          ? `<p style="background:#fef3c7;padding:15px;border-radius:6px;border-left:4px solid #f59e0b;">
              <strong>🥋 Free trial requested</strong> — we'll reach out to get you scheduled for your first class.
            </p>`
          : ''
      }
      <p>In the meantime, feel free to explore our classes and schedule:</p>
      <p style="text-align:center;">
        <a href="${SITE_URL}/schedule"
           style="display:inline-block;background:#dc2626;color:white;padding:12px 30px;text-decoration:none;border-radius:6px;margin:10px 0;">
          View Schedule
        </a>
      </p>
    </div>
    <div style="text-align:center;color:#6b7280;font-size:14px;margin-top:30px;">
      <p>${ACADEMY_NAME}</p>
    </div>
  </body>
</html>`,
    });

    return { success: true, id: result.data?.id };
  } catch (err) {
    console.error('sendContactConfirmation failed:', err);
    return { success: false, error: String(err) };
  }
}

export async function sendAdminNotification(
  data: ContactFormData
): Promise<EmailResult> {
  const error = ensureReady();
  if (error) return { success: false, error };

  const source = data.source || 'unknown';

  try {
    const result = await resend!.emails.send({
      from: FROM_EMAIL,
      to: BUSINESS_EMAIL,
      replyTo: data.email,
      subject: `New lead from ${source}${data.freeTrialRequest ? ' (free trial)' : ''} — ${data.name}`,
      html: `<!DOCTYPE html>
<html>
  <head><meta charset="utf-8"></head>
  <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#333;max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:15px;margin-bottom:20px;border-radius:4px;">
      <strong>🔔 New lead from ${source}</strong>
      ${data.freeTrialRequest ? '<br><strong>🥋 Free trial requested</strong>' : ''}
    </div>
    <div style="background:#f9fafb;padding:20px;border-radius:8px;margin:20px 0;">
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      ${data.phone ? `<p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>` : ''}
      <p><strong>Source:</strong> ${source}</p>
    </div>
    <p><strong>Message:</strong></p>
    <div style="background:white;padding:15px;border-radius:6px;border-left:4px solid #dc2626;">
      ${data.message}
    </div>
    <p style="margin-top:30px;color:#6b7280;font-size:14px;">
      Reply directly to this email to respond to ${data.name}.
    </p>
  </body>
</html>`,
    });

    return { success: true, id: result.data?.id };
  } catch (err) {
    console.error('sendAdminNotification failed:', err);
    return { success: false, error: String(err) };
  }
}

interface ExitIntentData {
  name: string;
  email: string;
}

export async function sendExitIntentConfirmation(
  data: ExitIntentData
): Promise<EmailResult> {
  const error = ensureReady();
  if (error) return { success: false, error };

  try {
    const result = await resend!.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `🥋 Your free class at ${ACADEMY_NAME}`,
      html: `<!DOCTYPE html>
<html>
  <head><meta charset="utf-8"></head>
  <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#333;max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:linear-gradient(135deg,#dc2626 0%,#991b1b 100%);color:white;padding:40px 20px;text-align:center;border-radius:8px;margin-bottom:30px;">
      <h1 style="margin:0;font-size:32px;">Welcome, ${data.name}! 🥋</h1>
      <p style="margin:10px 0 0;font-size:18px;opacity:0.9;">Your free class awaits</p>
    </div>
    <div style="padding:0 20px;">
      <p>Thanks for taking the first step into Brazilian Jiu-Jitsu at ${ACADEMY_NAME}.</p>
      <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:20px;margin:20px 0;border-radius:4px;">
        <strong>📍 What to expect:</strong>
        <ul>
          <li>Arrive 10 minutes early for a quick tour</li>
          <li>Meet your instructor and fellow students</li>
          <li>Learn a few fundamental techniques</li>
          <li>No pressure, no obligation</li>
        </ul>
      </div>
      <div style="background:#f9fafb;padding:20px;border-radius:8px;margin:20px 0;">
        <strong>What to bring:</strong>
        <ul>
          <li>✅ Athletic clothes (t-shirt and shorts/athletic pants)</li>
          <li>✅ Water bottle</li>
          <li>✅ Positive attitude</li>
        </ul>
        <p style="margin-top:15px;color:#6b7280;font-size:14px;">
          <em>No gi? No problem — we have loaners available for your first class.</em>
        </p>
      </div>
      <p style="text-align:center;">
        <a href="${SITE_URL}/contact"
           style="display:inline-block;background:#dc2626;color:white;padding:15px 40px;text-decoration:none;border-radius:6px;margin:20px 0;font-weight:600;">
          Schedule your free class
        </a>
      </p>
      <p style="margin-top:40px;color:#6b7280;font-size:14px;text-align:center;">
        See you on the mats!<br>
        <strong>— The ${ACADEMY_NAME} Team</strong>
      </p>
    </div>
  </body>
</html>`,
    });

    return { success: true, id: result.data?.id };
  } catch (err) {
    console.error('sendExitIntentConfirmation failed:', err);
    return { success: false, error: String(err) };
  }
}

export async function sendExitIntentAdminNotification(
  data: ExitIntentData
): Promise<EmailResult> {
  const error = ensureReady();
  if (error) return { success: false, error };

  try {
    const result = await resend!.emails.send({
      from: FROM_EMAIL,
      to: BUSINESS_EMAIL,
      replyTo: data.email,
      subject: `New exit-intent lead — ${data.name}`,
      html: `<!DOCTYPE html>
<html>
  <head><meta charset="utf-8"></head>
  <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#333;max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:15px;margin-bottom:20px;border-radius:4px;">
      <strong>🔔 New lead from exit-intent modal</strong>
    </div>
    <div style="background:#f9fafb;padding:20px;border-radius:8px;">
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      <p><strong>Source:</strong> exit-intent-modal</p>
    </div>
    <p style="margin-top:30px;color:#6b7280;font-size:14px;">
      Reply directly to this email to respond to ${data.name}.
    </p>
  </body>
</html>`,
    });

    return { success: true, id: result.data?.id };
  } catch (err) {
    console.error('sendExitIntentAdminNotification failed:', err);
    return { success: false, error: String(err) };
  }
}
