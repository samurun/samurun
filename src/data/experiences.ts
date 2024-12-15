import { Experience } from '@/lib/experience';

const datawow = new Experience({
  logo: '/datawowio_logo.jpeg',
  company: 'Data Wow',
  position: 'Fullstack Developer',
  type: 'Full-time',
  startDate: 'Dec 2024',
  endDate: null,
  description: ``,
  skills: ['JavaScript', 'TypeScript'],
  isRemote: true,
});

const themonkgames = new Experience({
  logo: '/the-monk-games.png',
  company: 'The Monk Studios',
  position: 'Frontend Web Developer',
  type: 'Contract',
  startDate: 'Sep 2023',
  endDate: 'Aug 2024',
  description: `
  <ul>
    <li>
      Developed a web app for a blockchain game with Bitkub NEXT wallet
      authentication. Implemented interactive maps for managing buildings,
      concessions, and land plots. Created a management page for organizing
      user-owned assets, including viewing, adding/removing NFTs, and
      setting access controls.
    </li>
    <li>I developed a React website for a blockchain game, offering smooth user experiences and boosting player engagement. Additionally, I integrated wallet connection, character creation, and reward harvesting features, leveraging cutting-edge technologies</li>
    <li>Developed a comprehensive in-game database management system using React and TypeScript, facilitating seamless asset control and economic monitoring.</li>
  </ul>
`,
  skills: ['React.js', 'TypeScript'],
  isRemote: true,
});

const kathi = new Experience({
  logo: '/kathi-logo.svg',
  company: 'Kathi Studio Co.,Ltd',
  position: 'Frontend Web Developer',
  type: 'Full-time',
  startDate: 'Sep 2021',
  endDate: 'Sep 2023',
  description: `<ul>
    <li>I built a React.js application with TypeScript to calculate your greenhouse gas emissions. It considers factors like household size, electricity use, commuting habits, and food choices. The app visualizes your footprint in a clear pie chart, and to empower action, it even allows you to offset emissions through carbon credit purchases.</li>
    <li>Developed user interfaces using React.js to ensure responsive and interactive web applications, while integrating Leaflet.js for displaying noise levels and markers, enhancing search functionality. Implemented multilingual support for English and Thai languages
I built a React.js application with TypeScript to calculate your greenhouse gas emissions. It considers factors like household size, electricity use, commuting habits, and food choices. The app visualizes your footprint in a clear pie chart, and to empower action, it even allows you to offset emissions through carbon credit purchases. Developed user interfaces using React.js to ensure responsive and interactive web applications, while integrating Leaflet.js for displaying noise levels and markers, enhancing search functionality. Implemented multilingual support for English and Thai languages
</li>
    </ul>`,
  skills: ['React.js', 'TypeScript'],
  isRemote: true,
});

const isaac = new Experience({
  logo: '/isaac-tech-logo.jpeg',
  company: 'iSAAC TECH',
  position: 'Frontend Web Developer',
  type: 'Full-time',
  startDate: 'Jul 2019',
  endDate: 'Oct 2020',
  description: `<ul>
    <li>Provide support for the implementation of E-commerce websites, including wireframing, front-end development, mobile application development, and user interface design with vue.js</li>
    <li>Built a powerful Content Management System (CMS) using React.js. This CMS allows for efficient media uploads and content management, ensuring seamless content display on any playback device (player).</li>
    </ul>`,
  skills: ['React.js', 'JavaScript', 'Vue.js'],
  isRemote: true,
});

export const experiences = [datawow, themonkgames, kathi, isaac];

export type WxperienceType = (typeof experiences)[0];
