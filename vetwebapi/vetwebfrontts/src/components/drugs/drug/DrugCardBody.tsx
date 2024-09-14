import { Container } from "react-bootstrap";
import { diseasesString } from "shared/helpers";

interface DrugCardBodyProps {
  drugManufacturer: string;
  diseases: string[];
}

export function DrugCardBody({
  drugManufacturer,
  diseases,
}: DrugCardBodyProps) {
  const drugDiseases = diseasesString(diseases);
  return (
    <>
      <Container className="flex justify-left text-sm mb-2">
        <h5 className="underline font-bold mr-2">Производитель:</h5>
        <h6>{drugManufacturer}</h6>
      </Container>
      <Container className="flex justify-left text-sm">
        <h5 className="underline font-bold mr-2">Заболевания:</h5>
        <h6>{drugDiseases}</h6>
      </Container>
    </>
  );
}
