import { Container } from "react-bootstrap";

interface PageDetailTitleProps {
  title: string;
}

export function PageDetailTitle({ title }: PageDetailTitleProps) {
  return (
    <Container className="page-detail-title">
      <h1>
        <a href="#">{title}</a>
      </h1>
    </Container>
  );
}
