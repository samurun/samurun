interface LabLayoutProps {
  children: React.ReactNode;
}

export default function LabLayout({ children }: LabLayoutProps) {
  return <div className='container py-6'>{children}</div>;
}
