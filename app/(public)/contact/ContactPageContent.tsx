'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { contactFormSchema, type ContactFormData } from '@/lib/validation';
import { BusinessHours } from '@/lib/sanity';

const contactInfo = {
  phone: '+1 (760) 500-7710',
  email: 'mikerabello@gmail.com',
  address: '1980 E. Valley Parkway, Escondido, CA 92027',
  googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=1980+E+Valley+Pkwy,+Escondido,+CA+92027',
};

// Fallback hours if Sanity has no data
const fallbackHours: BusinessHours[] = [
  { days: 'Monday - Friday', time: '9:00 AM - 9:00 PM' },
  { days: 'Saturday', time: '9:00 AM - 12:00 PM' },
  { days: 'Sunday', time: '10:00 AM - 12:00 PM' },
];

interface ContactPageContentProps {
  businessHours?: BusinessHours[];
}

export function ContactPageContent({ businessHours }: ContactPageContentProps) {
  const displayHours = businessHours && businessHours.length > 0 ? businessHours : fallbackHours;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'contact-page' }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      setSubmitStatus({
        type: 'success',
        message: "Thank you! We'll be in touch within 24 hours.",
      });
      reset();
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold md:text-5xl mb-4">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to start your BJJ journey? Have questions? We&apos;re here
              to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    {...register('name')}
                    className={errors.name ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...register('email')}
                    className={errors.email ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2"
                  >
                    Phone (optional)
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    {...register('phone')}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your goals, experience level, or any questions you have..."
                    {...register('message')}
                    className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                      errors.message ? 'border-red-500' : ''
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Free Trial Request */}
                <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <input
                    type="checkbox"
                    id="freeTrialRequest"
                    {...register('freeTrialRequest')}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="freeTrialRequest" className="text-sm cursor-pointer">
                    <span className="font-semibold">I&apos;d like to request a FREE 1-week trial!</span>
                    <span className="block text-muted-foreground mt-0.5">
                      No commitment required. Try unlimited classes for a full week.
                    </span>
                  </label>
                </div>

                {/* Status Message */}
                {submitStatus && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Quick Contact */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Quick Contact</h2>

                <div className="space-y-6">
                  {/* Phone */}
                  <a
                    href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                    className="flex items-center gap-4 p-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Call Us</p>
                      <p className="text-muted-foreground">
                        {contactInfo.phone}
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white dark:bg-gray-600">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Email Us</p>
                      <p className="text-muted-foreground text-sm">
                        {contactInfo.email}
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Location & Hours */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Location & Hours</h2>

                {/* Address */}
                <div className="flex items-start gap-4 mb-6">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-muted-foreground">
                      {contactInfo.address}
                    </p>
                    <a
                      href={contactInfo.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm hover:underline"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold mb-2">Hours</p>
                    <ul className="space-y-1">
                      {displayHours.map((item) => (
                        <li
                          key={item.days}
                          className="flex justify-between text-sm gap-4"
                        >
                          <span className="text-muted-foreground">
                            {item.days}
                          </span>
                          <span>{item.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-64 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.8!2d-117.0523!3d33.1244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dbf4e8c1c1c1c1%3A0x0!2s1980+E+Valley+Pkwy%2C+Escondido%2C+CA+92027!5e0!3m2!1sen!2sus!4v1706000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Carlson Gracie BJJ - 1980 E Valley Pkwy, Escondido, CA 92027"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
