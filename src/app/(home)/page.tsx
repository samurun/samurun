import AboutMe from '@/components/about-me';
import Hero from '@/components/hero';
import LatestProjects from '@/components/latest-projects';
import MyExperience from '@/components/my-experience';

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutMe />
      <LatestProjects />
      <MyExperience />
    </main>
  );
}
