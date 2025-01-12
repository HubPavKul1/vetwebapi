import { Container } from "react-bootstrap";

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return <Container className="w-full bg-slate-100">{children}</Container>;
}
