import { Container } from "react-bootstrap";

interface ErrorLoadDataMessageProps {
  error: Error | null;
}

export function ErrorLoadDataMessage({ error }: ErrorLoadDataMessageProps) {
  return (
    <Container className="p-20">
      <Container className="flex p-10 items-center justify-center w-auto h-auto border-2 border-red-700 rounded-md text-lg text-red-700 ">
        <p>{JSON.stringify(error?.name)}</p>
        <p>{JSON.stringify(error?.message)}</p>
      </Container>
    </Container>
  );
}
