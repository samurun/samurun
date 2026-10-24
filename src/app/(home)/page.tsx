import type { Metadata } from 'next';
import React from 'react';

import AboutMe from '@/components/about-me';
import Hero from '@/components/hero';
import LatestProjects from '@/components/latest-projects';
import MyExperience from '@/components/my-experience';

// No `title` here: the home page uses the root layout's `title.default` (the
// site name) instead of rendering "Home | <site name>".
export const metadata: Metadata = {
  description: 'Personal site and portfolio highlights.',
};

export default function Home() {
  return (
    <React.Fragment>
      <Hero />
      <AboutMe />
      <LatestProjects />
      <MyExperience />
    </React.Fragment>
  );
}
