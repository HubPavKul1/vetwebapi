import { Container } from "react-bootstrap";

interface SectionWrapperProps {
  children: React.ReactNode;
}

export function SectionWrapper({ children }: SectionWrapperProps) {
  return (
    <Container className="w-full h-screen py-5 px-0">{children}</Container>
  );
}
