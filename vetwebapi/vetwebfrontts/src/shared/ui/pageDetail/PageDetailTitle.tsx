import { Container } from "react-bootstrap";

interface PageDetailTitleProps {
  title: string;
}

export function PageDetailTitle({ title }: PageDetailTitleProps) {
  return (
    <Container className="text-center text-3xl uppercase font-bold mb-8 text-indigo-900">
      <h1>{title}</h1>
    </Container>
  );
}
