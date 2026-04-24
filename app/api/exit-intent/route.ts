import { NextResponse } from 'next/server';
import { exitIntentFormSchema } from '@/lib/validation';
import {
  sendExitIntentAdminNotification,
  sendExitIntentConfirmation,
} from '@/lib/email';
import { ZodError } from 'zod';

// Rate limiting: simple in-memory store (for production, use Vercel KV)
const submissions = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 5; // max submissions per IP
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = submissions.get(ip);

  if (!record) {
    submissions.set(ip, { count: 1, timestamp: now });
    return true;
  }

  // Reset if window has passed
  if (now - record.timestamp > RATE_WINDOW) {
    submissions.set(ip, { count: 1, timestamp: now });
    return true;
  }

  // Check if over limit
  if (record.count >= RATE_LIMIT) {
    return false;
  }

  // Increment count
  record.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    // Get IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Server-side validation
    const validatedData = exitIntentFormSchema.parse(body);

    const [confirmation, notification] = await Promise.all([
      sendExitIntentConfirmation(validatedData),
      sendExitIntentAdminNotification(validatedData),
    ]);

    if (!confirmation.success || !notification.success) {
      console.error('Exit-intent email send partial failure:', {
        confirmation,
        notification,
        submission: validatedData,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Check your email for next steps.',
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid form data',
          details: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error('Exit intent form error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process request. Please try again.',
      },
      { status: 500 }
    );
  }
}
