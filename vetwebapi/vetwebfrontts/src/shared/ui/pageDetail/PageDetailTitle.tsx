import { Container } from "react-bootstrap";

interface PageDetailTitleProps {
  title: string;
}

export function PageDetailTitle({ title }: PageDetailTitleProps) {
  return (
    <Container className="page-title">
      <h1>{title}</h1>
    </Container>
  );
}
