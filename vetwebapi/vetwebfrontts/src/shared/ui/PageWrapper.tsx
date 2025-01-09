import { Container } from "react-bootstrap";

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return <Container className="w-[1180px] p-5">{children}</Container>;
}
