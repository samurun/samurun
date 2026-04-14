import { ReactNode } from 'react';

import Footer from '@/components/footer';
import Header from '@/components/header';

type Props = {
  children: ReactNode;
};
export default function HomeLayout({ children }: Props) {
  return (
    <div>
      <Header />
      <div className='min-h-[calc(100vh-15rem)]'>{children}</div>
      <Footer />
    </div>
  );
}
