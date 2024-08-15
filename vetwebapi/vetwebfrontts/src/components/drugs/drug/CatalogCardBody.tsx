import { Container } from "react-bootstrap";

interface CatalogDrugCardBodyProps {
  batch: string;
  control: string;
  production_date: string;
  expiration_date: string;
}

export function CatalogDrugCardBody({
  batch,
  control,
  production_date,
  expiration_date,
}: CatalogDrugCardBodyProps) {
  return (
    <>
      <Container className="flex justify-between mb-3">
        <span>Серия: {batch}</span>
        <span>Контроль: {control}</span>
      </Container>

      <Container>
        <span>Изготовлен: {production_date}</span>
        <p>Годен до: {expiration_date}</p>
      </Container>
    </>
  );
}
