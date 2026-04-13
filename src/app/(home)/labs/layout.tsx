interface LabLayoutProps {
  children: React.ReactNode;
}

export default function LabLayout({ children }: LabLayoutProps) {
  return <div className='container py-20'>{children}</div>;
}
