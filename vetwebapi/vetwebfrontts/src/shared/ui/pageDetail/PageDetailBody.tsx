import { Container } from "react-bootstrap";

interface PageDetailBodyProps {
  children?: React.ReactElement;
}

export function PageDetailBody({ children }: PageDetailBodyProps) {
  return <Container>{children}</Container>;
}
