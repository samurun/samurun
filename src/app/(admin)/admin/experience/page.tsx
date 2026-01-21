import { Metadata } from 'next';

import ExperiencePage from '@/modules/portal/experience-page';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Experience',
};

export default function Experience() {
  return <ExperiencePage />;
}
