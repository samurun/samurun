import Footer from '@/components/footer';
import Header from '@/components/header';
import { ReactNode } from 'react';

type Porps = {
  children: ReactNode;
};
export default function HomeLayout({ children }: Porps) {
  return (
    <div>
      <Header />
      <div className='min-h-[calc(100vh-15rem)]'>{children}</div>
      <Footer />
    </div>
  );
}
