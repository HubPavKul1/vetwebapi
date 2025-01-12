import { Container } from "react-bootstrap";

interface SectionWrapperProps {
  children: React.ReactNode;
}

export function SectionWrapper({ children }: SectionWrapperProps) {
  return <Container className="w-full bg-slate-100 p-5">{children}</Container>;
}
