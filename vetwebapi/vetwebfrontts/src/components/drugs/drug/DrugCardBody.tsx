import { Container } from "react-bootstrap";

interface DrugCardBodyProps {
  drugManufacturer: string;
  diseases: string[];
}

export function DrugCardBody({
  drugManufacturer,
  diseases,
}: DrugCardBodyProps) {
  return (
    <>
      <Container className="text-center text-sm mb-2">
        <h6>{diseases}</h6>
      </Container>
      <Container className="text-center text-sm">
        <h6>{drugManufacturer}</h6>
      </Container>
    </>
  );
}
