import { Container } from "react-bootstrap";

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return <Container className="w-full ">{children}</Container>;
}
