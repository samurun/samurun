import { Metadata } from 'next';

import TechStackPage from '@/modules/portal/tech-stack-page';

export const metadata: Metadata = {
  title: 'Tech Stack',
  description: 'Tech Stack',
};

export default function TechStack() {
  return <TechStackPage />;
}
