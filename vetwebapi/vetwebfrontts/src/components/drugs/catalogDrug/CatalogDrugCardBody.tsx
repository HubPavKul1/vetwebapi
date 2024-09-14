import { Container } from "react-bootstrap";
import { AppService, timeToExpiration } from "shared/services/app.service";
import { Overdue } from "../Overdue";
import { TimeToOverdue } from "../TimeToOverdue";
import { useGetDataById } from "shared/hooks/useGetDataById";
import { drugRestUrl } from "shared/urls/drugUrls";
import { IDrugRest } from "interfaces/DrugInterfaces";

interface CatalogDrugCardBodyProps {
  batch: string;
  control: string;
  production_date: string;
  expiration_date: string;
  drugId: number;
}

interface DataProps {
  data: IDrugRest;
  isLoading: boolean;
}

export function CatalogDrugCardBody({
  batch,
  control,
  production_date,
  expiration_date,
  drugId,
}: CatalogDrugCardBodyProps) {
  const expDate = new Date(expiration_date);

  const diffDays = timeToExpiration(expDate).deltaSeconds / 86400;

  const expDateString = AppService.convertDateString(expiration_date).shortDate;

  const { data, isLoading }: DataProps = useGetDataById(
    "drugRest",
    drugRestUrl(drugId),
    drugId.toString()
  );

  return (
    <Container className="mb-3">
      <div className="">
        {diffDays > 0 && 60 > diffDays && (
          <TimeToOverdue expirationDate={expDate} />
        )}
        <Container className="flex justify-between mb-1">
          <span>Серия: {batch}</span>
          <span>Контроль: {control}</span>
        </Container>
        {diffDays < 0 && <Overdue />}

        <Container className="flex justify-between">
          <span>Изготовлен: {production_date}</span>
          <p>Годен до: {expDateString}</p>
        </Container>
        {data &&
          (data.units_rest && data.units_rest > 0 ? (
            <Container className="flex justify-between">
              <span>Осталось: {data.units_rest} доз</span>
            </Container>
          ) : (
            <Container className="flex justify-between text-red-700 font-bold text-center">
              <span>Нет в наличии!!!</span>
            </Container>
          ))}
      </div>
    </Container>
  );
}
