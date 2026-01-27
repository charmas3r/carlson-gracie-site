# Resend Email Skill

## Overview

Complete patterns for sending transactional and marketing emails using Resend API. Use this for contact form confirmations, exit-intent captures, trial bookings, and automated follow-ups.

## Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Email Service | Resend | 2.x |
| Language | TypeScript | 5.x |

## Directory Structure

```
lib/
└── email.ts              # Resend client and email templates
app/
└── api/
    └── contact/
        └── route.ts      # Uses email service
```

## Core Patterns

### Pattern: Resend Client Setup

**When to use:** Required for all email operations

**File Location:** `lib/email.ts`

```typescript
import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

// Email addresses
export const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@academy.com';
export const ADMIN_EMAIL = 'info@academy.com';
```

### Pattern: Contact Form Confirmation Email

**When to use:** After user submits contact form

**File Location:** `lib/email.ts`

```typescript
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function sendContactConfirmation(data: ContactFormData) {
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: 'Thank you for contacting San Diego BJJ Academy',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: #dc2626;
                color: white;
                padding: 30px 20px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .content {
                background: #f9fafb;
                padding: 30px 20px;
                border-radius: 0 0 8px 8px;
              }
              .button {
                display: inline-block;
                background: #dc2626;
                color: white;
                padding: 12px 30px;
                text-decoration: none;
                border-radius: 6px;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                color: #6b7280;
                font-size: 14px;
                margin-top: 30px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Thank You, ${data.name}!</h1>
            </div>
            <div class="content">
              <p>We received your message and will get back to you within 24 hours.</p>
              
              <p><strong>What you sent us:</strong></p>
              <p style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #dc2626;">
                ${data.message}
              </p>
              
              <p>In the meantime, here's what you can expect:</p>
              <ul>
                <li>A personal response from one of our instructors</li>
                <li>Answers to all your questions about BJJ</li>
                <li>Information about scheduling your free trial class</li>
              </ul>
              
              <center>
                <a href="https://academy.com/classes" class="button">Explore Our Classes</a>
              </center>
              
              <p><strong>Quick Info:</strong></p>
              <p>
                📍 [Academy Address]<br>
                📞 (555) 123-4567<br>
                📧 info@academy.com
              </p>
            </div>
            <div class="footer">
              <p>San Diego BJJ Academy | Transform Your Body, Sharpen Your Mind, Build Confidence</p>
            </div>
          </body>
        </html>
      `,
    });
    
    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    return { success: false, error: String(error) };
  }
}
```

### Pattern: Admin Notification Email

**When to use:** Notify academy of new contact form submission

**File Location:** `lib/email.ts`

```typescript
export async function sendAdminNotification(data: ContactFormData, source: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: data.email,
      subject: `New Contact Form Submission - ${source}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .alert {
                background: #fef3c7;
                border-left: 4px solid #f59e0b;
                padding: 15px;
                margin-bottom: 20px;
                border-radius: 4px;
              }
              .info-grid {
                background: #f9fafb;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
              }
              .info-row {
                display: flex;
                padding: 10px 0;
                border-bottom: 1px solid #e5e7eb;
              }
              .info-label {
                font-weight: 600;
                width: 120px;
                color: #6b7280;
              }
              .info-value {
                flex: 1;
              }
            </style>
          </head>
          <body>
            <div class="alert">
              <strong>🔔 New Lead from ${source}</strong>
            </div>
            
            <div class="info-grid">
              <div class="info-row">
                <div class="info-label">Name:</div>
                <div class="info-value">${data.name}</div>
              </div>
              <div class="info-row">
                <div class="info-label">Email:</div>
                <div class="info-value"><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              ${data.phone ? `
              <div class="info-row">
                <div class="info-label">Phone:</div>
                <div class="info-value"><a href="tel:${data.phone}">${data.phone}</a></div>
              </div>
              ` : ''}
              <div class="info-row">
                <div class="info-label">Source:</div>
                <div class="info-value">${source}</div>
              </div>
            </div>
            
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #dc2626;">
              ${data.message}
            </div>
            
            <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
              You can reply directly to this email to respond to ${data.name}.
            </p>
          </body>
        </html>
      `,
    });
    
    return { success: true };
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    return { success: false, error: String(error) };
  }
}
```

### Pattern: Exit-Intent Free Class Email

**When to use:** After user claims free class via exit-intent modal

**File Location:** `lib/email.ts`

```typescript
interface FreeClassData {
  name: string;
  email: string;
}

export async function sendFreeClassEmail(data: FreeClassData) {
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: '🥋 Your Free BJJ Class at San Diego BJJ Academy',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .hero {
                background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
                color: white;
                padding: 40px 20px;
                text-align: center;
                border-radius: 8px;
                margin-bottom: 30px;
              }
              .hero h1 {
                margin: 0;
                font-size: 32px;
              }
              .hero p {
                margin: 10px 0 0;
                font-size: 18px;
                opacity: 0.9;
              }
              .content {
                padding: 0 20px;
              }
              .button {
                display: inline-block;
                background: #dc2626;
                color: white;
                padding: 15px 40px;
                text-decoration: none;
                border-radius: 6px;
                margin: 20px 0;
                font-weight: 600;
              }
              .info-box {
                background: #fef3c7;
                border-left: 4px solid #f59e0b;
                padding: 20px;
                margin: 20px 0;
                border-radius: 4px;
              }
              .checklist {
                background: #f9fafb;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="hero">
              <h1>Welcome, ${data.name}! 🥋</h1>
              <p>Your Free Class Awaits</p>
            </div>
            
            <div class="content">
              <p>Congratulations on taking the first step toward transforming your body, sharpening your mind, and building confidence through Brazilian Jiu-Jitsu!</p>
              
              <div class="info-box">
                <strong>📍 What to Expect at Your First Class:</strong>
                <ul>
                  <li>Arrive 10 minutes early for a quick tour</li>
                  <li>Meet your instructor and fellow students</li>
                  <li>Learn 2-3 fundamental techniques</li>
                  <li>No pressure, no obligation—just come have fun!</li>
                </ul>
              </div>
              
              <div class="checklist">
                <strong>What to Bring:</strong>
                <ul>
                  <li>✅ Athletic clothes (t-shirt and shorts/athletic pants)</li>
                  <li>✅ Water bottle</li>
                  <li>✅ Positive attitude!</li>
                </ul>
                <p style="margin-top: 15px; color: #6b7280; font-size: 14px;">
                  <em>Don't have a gi (uniform)? No problem! We have loaners available for your first class.</em>
                </p>
              </div>
              
              <center>
                <a href="https://academy.com/contact" class="button">Schedule Your Free Class</a>
              </center>
              
              <p><strong>Questions? We're here to help!</strong></p>
              <p>
                📞 Call or text: (555) 123-4567<br>
                📧 Email: info@academy.com<br>
                📍 Address: [Academy Address]
              </p>
              
              <p style="margin-top: 40px; color: #6b7280; font-size: 14px; text-align: center;">
                We can't wait to train with you!<br>
                <strong>— The San Diego BJJ Academy Team</strong>
              </p>
            </div>
          </body>
        </html>
      `,
    });
    
    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('Failed to send free class email:', error);
    return { success: false, error: String(error) };
  }
}
```

### Pattern: Kids Trial Booking Email

**When to use:** After parent books kids trial class

**File Location:** `lib/email.ts`

```typescript
interface KidsTrialData {
  parentName: string;
  email: string;
  childName: string;
  childAge: number;
}

export async function sendKidsTrialEmail(data: KidsTrialData) {
  const ageGroup = 
    data.childAge <= 7 ? 'Little Champions (4-7)' :
    data.childAge <= 12 ? 'Kids BJJ (8-12)' :
    'Teens (13-15)';
  
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `${data.childName}'s Free Kids BJJ Trial Class`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .hero {
                background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
                color: white;
                padding: 40px 20px;
                text-align: center;
                border-radius: 8px;
                margin-bottom: 30px;
              }
              .content {
                padding: 0 20px;
              }
              .button {
                display: inline-block;
                background: #dc2626;
                color: white;
                padding: 15px 40px;
                text-decoration: none;
                border-radius: 6px;
                margin: 20px 0;
                font-weight: 600;
              }
              .info-box {
                background: #fef3c7;
                border-left: 4px solid #f59e0b;
                padding: 20px;
                margin: 20px 0;
                border-radius: 4px;
              }
            </style>
          </head>
          <body>
            <div class="hero">
              <h1>Welcome ${data.childName}! 🥋</h1>
              <p>We're excited for your free trial class!</p>
            </div>
            
            <div class="content">
              <p>Dear ${data.parentName},</p>
              
              <p>Thank you for signing up ${data.childName} for a free trial class in our <strong>${ageGroup}</strong> program!</p>
              
              <div class="info-box">
                <strong>What to Expect:</strong>
                <ul>
                  <li>🎯 Age-appropriate BJJ fundamentals</li>
                  <li>🤝 Focus on confidence, discipline, and respect</li>
                  <li>👨‍👩‍👧‍👦 Parent viewing area always available</li>
                  <li>🏆 Fun, safe, and supportive environment</li>
                </ul>
              </div>
              
              <p><strong>What ${data.childName} Should Wear:</strong></p>
              <ul>
                <li>Comfortable athletic clothes (t-shirt and athletic shorts/pants)</li>
                <li>No shoes needed (we train barefoot)</li>
                <li>Bring water bottle</li>
              </ul>
              
              <p style="background: #f9fafb; padding: 15px; border-radius: 6px;">
                <strong>📍 Important:</strong> Please arrive 10 minutes early so we can give you a tour and ${data.childName} can meet the instructor!
              </p>
              
              <center>
                <a href="https://academy.com/schedule" class="button">View Class Schedule</a>
              </center>
              
              <p>If you have any questions or concerns, please don't hesitate to reach out!</p>
              
              <p>
                📞 (555) 123-4567<br>
                📧 info@academy.com
              </p>
              
              <p style="margin-top: 40px;">
                We can't wait to meet ${data.childName} and help them start their BJJ journey!
              </p>
              
              <p>
                Best regards,<br>
                <strong>The San Diego BJJ Academy Team</strong>
              </p>
            </div>
          </body>
        </html>
      `,
    });
    
    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('Failed to send kids trial email:', error);
    return { success: false, error: String(error) };
  }
}
```

## Usage in API Routes

```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { sendContactConfirmation, sendAdminNotification } from '@/lib/email';
import { trackEvent } from '@/lib/analytics';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, message, source = 'contact-page' } = data;
    
    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Send emails
    const [confirmation, notification] = await Promise.all([
      sendContactConfirmation({ name, email, phone, message }),
      sendAdminNotification({ name, email, phone, message }, source),
    ]);
    
    // Track event
    await trackEvent('form_submit', { source });
    
    return NextResponse.json({
      success: true,
      message: 'Thank you! We\'ll be in touch soon.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
```

## Environment Variables

```bash
# Required
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Optional (defaults provided in code)
FROM_EMAIL=noreply@academy.com
```

## Gotchas & Best Practices

- **DO:** Use HTML templates with inline styles (email clients strip external CSS)
- **DO:** Include plain text fallback for accessibility
- **DO:** Test emails across multiple clients (Gmail, Outlook, Apple Mail)
- **DO:** Use `replyTo` in admin notifications for easy responses
- **DO:** Handle errors gracefully (don't block form submission if email fails)
- **AVOID:** Exposing `RESEND_API_KEY` to client (API routes only)
- **AVOID:** Sending emails synchronously (use Promise.all for parallel sends)
- **AVOID:** Large images in emails (slow load, spam filters)
- **AVOID:** Missing unsubscribe links in marketing emails (legal requirement)

## Related Skills

- `api-routes` - Email functions called from API endpoints
- `form-validation` - Data validation before sending emails
- `analytics-tracking` - Track email sends as conversion events
