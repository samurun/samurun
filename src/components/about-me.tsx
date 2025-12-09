import Image from 'next/image';
import { Card, CardContent } from './ui/card';

export default function AboutMe() {
  return (
    <section className='max-w-5xl mx-auto px-6 md:px-4 my-20'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <Card className='group'>
          <CardContent>
            <div className='aspect-video relative'>
              <Image
                fill
                src='/profile.png'
                alt='stack'
                className='object-contain group-hover:scale-110 transition-all duration-300'
              />
            </div>
            <div>
              <h2 className='text-xl font-bold'>Hi, I&apos;m Fadlan</h2>
              <p className='text-muted-foreground'>
                With a passion for creating seamless user experiences and
                pixel-perfect designs, I&apos;ve had the opportunity to work on
                various projects that have honed my skills and expertise.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className='group'>
          <CardContent>
            <div className='aspect-video relative'>
              <Image
                fill
                src='/stack.png'
                alt='stack'
                className='object-contain group-hover:scale-110 transition-all duration-300'
              />
            </div>
            <div>
              <h2 className='text-xl font-bold'>Tech Stack</h2>
              <p className='text-muted-foreground'>
                This combination of technologies allows me to create efficient,
                scalable, and maintainable applications.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className='group'>
          <CardContent>
            <div className='aspect-video relative'>
              <Image
                fill
                src='/technical.png'
                alt='passion'
                className='object-contain group-hover:scale-110 transition-all duration-300'
              />
            </div>
            <div>
              <h2 className='text-xl font-bold'>Technical</h2>
              <p className='text-muted-foreground'>
                With over 4 years of experience in web development, I specialize
                in building scalable applications using modern technologies and
                best practices.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className='group'>
          <CardContent>
            <div className='aspect-video relative'>
              <Image
                fill
                src='/work-philosophy.png'
                alt='passion'
                className='object-contain group-hover:scale-110 transition-all duration-300'
              />
            </div>
            <div>
              <h2 className='text-xl font-bold'>Work Philosophy</h2>
              <p className='text-muted-foreground'>
                I believe in writing clean, maintainable code and creating
                intuitive user experiences. My approach combines creativity with
                technical excellence.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className='group col-start-1 md:col-end-3'>
          <CardContent>
            <div className='aspect-[3/1.5] relative max-h-56 m-auto'>
              <Image
                fill
                src='/contact.png'
                alt='contact'
                className='object-contain object-top group-hover:scale-110 transition-all duration-300'
              />{' '}
            </div>
            <div>
              <h2 className='text-lg text-center text-muted-foreground'>
                Contact
              </h2>
              <p className='text-xl text-center font-semibold'>
                fadlan.jehteerokee@gmail.com
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
