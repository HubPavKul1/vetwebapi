import { Container } from "react-bootstrap";
import { AppService, timeToExpiration } from "services/app.service";

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
  const expDate = new Date(expiration_date);

  const timeToExp =
    "Срок использования истечет " + timeToExpiration(expDate).result;

  const diffDays = timeToExpiration(expDate).deltaSeconds / 86400;

  console.log(diffDays);

  const expDateString = AppService.convertDateString(expiration_date).shortDate;

  return (
    <>
      <Container className="flex justify-between mb-3">
        <span>Серия: {batch}</span>
        <span>Контроль: {control}</span>
      </Container>

      <Container className="flex justify-between">
        <span>Изготовлен: {production_date}</span>
        <p>Годен до: {expDateString}</p>
      </Container>
      {diffDays <= 30 && (
        <Container className="flex text-center justify-center border-2 border-red-700 p-1 text-red-700 font-bold">
          <span>{timeToExp}</span>
        </Container>
      )}
    </>
  );
}
