import type { Metadata } from 'next';
import { WhyChooseUsPageContent } from './WhyChooseUsPageContent';

export const metadata: Metadata = {
  title: 'Why Choose Us | Carlson Gracie BJJ San Diego',
  description:
    "Discover what sets Carlson Gracie San Diego apart. World-class instruction, family-friendly environment, and a proven track record of student success.",
};

export default function WhyChooseUsPage() {
  return <WhyChooseUsPageContent />;
}
