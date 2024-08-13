import { Container } from "react-bootstrap";

interface PageDetailTitleProps {
  title: string;
}

export function PageDetailTitle({ title }: PageDetailTitleProps) {
  return (
    <Container className="flex flex-col items-center mb-8 text-2xl underline">
      <h1>
        <a href="#">{title}</a>
      </h1>
    </Container>
  );
}
