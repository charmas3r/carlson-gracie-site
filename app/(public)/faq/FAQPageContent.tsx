'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  faqs: FAQ[];
}

const faqCategories: FAQCategory[] = [
  {
    title: 'Getting Started',
    faqs: [
      {
        question: 'Do I need any experience to start?',
        answer:
          'No experience is needed. Our Fundamentals program is designed specifically for beginners. Our instructors will guide you through everything from day one in a supportive, welcoming environment.',
      },
      {
        question: 'What is the free trial week?',
        answer:
          'We offer a completely free week of unlimited classes so you can experience our academy firsthand. No commitment or payment information required. Just show up, train, and see if Carlson Gracie Escondido is the right fit for you.',
      },
      {
        question: 'What should I wear to my first class?',
        answer:
          'Athletic clothes like shorts or leggings and a t-shirt are perfect for your first class. We have loaner gis (uniforms) available if needed. Avoid clothing with zippers or pockets that could catch fingers.',
      },
      {
        question: 'How do I sign up for a free trial?',
        answer:
          'You can book your free trial week through our contact page, by calling us at (760) 500-7710, or simply walk in during class times. We recommend arriving 10-15 minutes early for your first visit.',
      },
    ],
  },
  {
    title: 'About BJJ Training',
    faqs: [
      {
        question: 'Is Brazilian Jiu-Jitsu safe?',
        answer:
          'Yes. BJJ is one of the safest martial arts because there are no strikes or kicks. Training focuses on control, leverage, and technique rather than strength. Our instructors maintain strict safety standards and all sparring is supervised.',
      },
      {
        question: 'How often should I train?',
        answer:
          'For beginners, we recommend 2-3 classes per week. This gives your body time to recover while building skills consistently. As you progress, many students train 4-5 times per week. The most important thing is consistency.',
      },
      {
        question: 'Will I get hurt?',
        answer:
          'Minor soreness is normal when starting any physical activity, but injuries are uncommon. We emphasize a safe training culture where partners look out for each other. You always control the pace of your training.',
      },
      {
        question: 'How long does it take to get a blue belt?',
        answer:
          'On average, it takes 1-2 years of consistent training to earn a blue belt in BJJ. Everyone progresses at their own pace, and our instructors evaluate students based on technique, knowledge, and mat time rather than a fixed timeline.',
      },
    ],
  },
  {
    title: 'Kids Program',
    faqs: [
      {
        question: 'What ages do you accept for the kids program?',
        answer:
          'We accept kids ages 4-15. Our program is divided into age-appropriate groups: Little Champions (ages 4-6), Kids BJJ (ages 7-11), and Teens (ages 12-15). Each group has curriculum tailored to their developmental stage.',
      },
      {
        question: 'Is BJJ safe for kids?',
        answer:
          'Absolutely. BJJ is one of the safest martial arts for children since there are no strikes or kicks. Training focuses on control and technique. Our instructors are trained in child safety and maintain strict supervision at all times.',
      },
      {
        question: 'What if my child is shy or nervous?',
        answer:
          'Totally normal! Our instructors are experienced at helping shy children feel comfortable. We start with fun games and activities. Parents can watch from our viewing area. Most kids warm up within the first 10 minutes.',
      },
      {
        question: 'Do you offer family discounts?',
        answer:
          'Yes! We offer sibling discounts and family packages. The second child receives 15% off, and the third child 25% off. Contact us for details on our family membership options.',
      },
    ],
  },
  {
    title: 'Membership & Logistics',
    faqs: [
      {
        question: 'What are your class times?',
        answer:
          'We offer classes Monday through Saturday with morning, afternoon, and evening options. Kids classes run in the afternoon, and adult classes are available morning and evening. Visit our schedule page for the full timetable.',
      },
      {
        question: 'Where are you located?',
        answer:
          'We are located at 1980 E. Valley Parkway, Escondido, CA 92027. We are easily accessible from I-15 and serve Escondido, San Marcos, Valley Center, Rancho Bernardo, Vista, and surrounding North County San Diego communities.',
      },
      {
        question: 'Do I need to buy a gi (uniform)?',
        answer:
          'Not right away. We have loaner gis for your trial period. Once you decide to join, we can help you purchase the right gi. We also offer no-gi classes where you train in shorts and a rash guard.',
      },
      {
        question: 'Can I watch a class before signing up?',
        answer:
          'Of course! You are welcome to stop by and watch any class. We encourage prospective students and parents to observe a class to see our training environment and teaching style firsthand.',
      },
    ],
  },
];

export function FAQPageContent() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about training at Carlson Gracie
              Escondido. Can&apos;t find your answer?{' '}
              <Link href="/contact" className="text-primary hover:underline">
                Contact us
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-3xl px-4 space-y-12">
          {faqCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
              <div className="space-y-3">
                {category.faqs.map((faq, faqIndex) => {
                  const key = `${catIndex}-${faqIndex}`;
                  const isOpen = openItems[key];

                  return (
                    <div
                      key={key}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow"
                    >
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between p-4 text-left"
                      >
                        <span className="font-medium pr-4">{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="px-4 pb-4"
                        >
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            We&apos;re happy to help. Reach out or come visit us — your first
            week is always free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Link href="/schedule">View Schedule</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
