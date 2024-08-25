import { Container } from "react-bootstrap";
import { AppService, timeToExpiration } from "services/app.service";
import { Overdue } from "../Overdue";
import { TimeToOverdue } from "../TimeToOverdue";

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

  const diffDays = timeToExpiration(expDate).deltaSeconds / 86400;

  const expDateString = AppService.convertDateString(expiration_date).shortDate;

  return (
    <Container className="mb-3">
      <div className="relative">
        {diffDays > 0 && 60 > diffDays && (
          <TimeToOverdue expirationDate={expDate} />
        )}
        <Container className="flex justify-between mb-1">
          <span>Серия: {batch}</span>
          <span>Контроль: {control}</span>
        </Container>
        {diffDays <= 0 && <Overdue />}

        <Container className="flex justify-between">
          <span>Изготовлен: {production_date}</span>
          <p>Годен до: {expDateString}</p>
        </Container>
      </div>
    </Container>
  );
}
