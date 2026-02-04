import Image from 'next/image';
import { Card, CardContent } from './ui/card';

export default function AboutMe() {
  const cards = [
    {
      title: "Hi, I'm Fadlan",
      description:
        "With a passion for creating seamless user experiences and pixel-perfect designs, I've had the opportunity to work on various projects that have honed my skills and expertise.",
      image: '/profile.png',
      label: 'INTRO',
    },
    {
      title: 'Tech Stack',
      description:
        'This combination of technologies allows me to create efficient, scalable, and maintainable applications.',
      image: '/stack.png',
      label: 'STACK',
    },
    {
      title: 'Technical',
      description:
        'With over 4 years of experience in web development, I specialize in building scalable applications using modern technologies and best practices.',
      image: '/technical.png',
      label: 'EXP',
    },
    {
      title: 'Work Philosophy',
      description:
        'I believe in writing clean, maintainable code and creating intuitive user experiences. My approach combines creativity with technical excellence.',
      image: '/work-philosophy.png',
      label: 'METHOD',
    },
  ];

  return (
    <section className='border-b border-border'>
      <div className='container py-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-border'>
          {cards.map((card, i) => (
            <div
              key={i}
              className='group border-r border-b border-border p-8 hover:bg-secondary transition-colors'
            >
              <div className='font-mono text-[10px] text-muted-foreground mb-4 tracking-tighter'>
                //{card.label} 0{i + 1}
              </div>
              <div className='aspect-square relative mb-6 grayscale group-hover:grayscale-0 transition-all'>
                <Image
                  fill
                  src={card.image}
                  alt={card.title}
                  className='object-contain transition-transform duration-500 group-hover:scale-105'
                />
              </div>
              <div className='space-y-2'>
                <h2 className='text-sm font-bold uppercase tracking-widest'>
                  {card.title}
                </h2>
                <p className='text-xs text-muted-foreground leading-relaxed'>
                  {card.description}
                </p>
              </div>
            </div>
          ))}
          <div className='col-span-1 md:col-span-2 lg:col-span-4 border-r border-b border-border p-8 flex flex-col items-center justify-center text-center space-y-4 hover:bg-secondary transition-colors'>
            <div className='font-mono text-[10px] text-muted-foreground tracking-tighter'>
              //CONTACT
            </div>
            <p className='text-xl sm:text-2xl font-bold tracking-tight'>
              fadlan.jehteerokee@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
