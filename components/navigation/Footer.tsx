'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Instagram } from 'lucide-react';

const footerLinks = {
  programs: [
    { href: '/classes', label: 'Adult BJJ' },
    { href: '/kids', label: 'Kids Program' },
    { href: '/classes#beginners', label: 'Beginners' },
    { href: '/classes#competition', label: 'Competition Team' },
  ],
  academy: [
    { href: '/instructors', label: 'Instructors' },
    { href: '/schedule', label: 'Schedule' },
    { href: '/why-choose-us', label: 'Why Choose Us' },
  ],
  resources: [
    { href: '/contact', label: 'Contact Us' },
    { href: '/faq', label: 'FAQ' },
    { href: '/privacy', label: 'Privacy Policy' },
  ],
  locations: [
    { href: '/escondido-bjj', label: 'Escondido BJJ' },
    { href: '/valley-center-bjj', label: 'Valley Center BJJ' },
    { href: '/north-county-san-diego-bjj', label: 'North County San Diego' },
  ],
};

const contactInfo = {
  phone: '+1 (760) 500-7710',
  email: 'mikerabello@gmail.com',
  address: '1980 E. Valley Parkway, Escondido, CA 92027',
  hours: 'Mon-Fri: 6am-9pm, Sat: 9am-2pm',
};

const socialLinks = [
  { href: 'https://www.instagram.com/cgt_escondido/', icon: Instagram, label: 'Instagram' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold">
                <span className="text-white">Carlson Gracie</span>{' '}
                <span className="text-primary">BJJ</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Escondido&apos;s premier Brazilian Jiu-Jitsu academy. World-class
              instruction for all ages and skill levels.
            </p>

            {/* Contact Info */}
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{contactInfo.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{contactInfo.email}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-white transition-colors"
                >
                  <MapPin className="h-4 w-4 text-primary mt-0.5" />
                  <span>{contactInfo.address}</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-primary" />
                <span>{contactInfo.hours}</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-semibold mb-4">Programs</h3>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academy */}
          <div>
            <h3 className="text-white font-semibold mb-4">Academy</h3>
            <ul className="space-y-2">
              {footerLinks.academy.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Areas We Serve */}
            <h3 className="text-white font-semibold mb-4 mt-6">Areas We Serve</h3>
            <ul className="space-y-2">
              {footerLinks.locations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} Carlson Gracie Escondido. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Proudly serving Escondido, Valley Center, San Marcos, Vista & North County San Diego
            </p>
            <a
              href="https://www.lucidweb.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
            >
              Osso 🥋 Lucid Web Studios
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
