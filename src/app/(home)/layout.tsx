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
      {children}
      <Footer />
    </div>
  );
}
