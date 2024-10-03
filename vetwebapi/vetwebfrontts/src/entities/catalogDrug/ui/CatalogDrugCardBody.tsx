import { Col, Container, Row } from "react-bootstrap";

import { useGetDataById } from "shared/hooks/useGetDataById";
import { drugRestUrl } from "shared/urls/drugUrls";
import { IDrugRest } from "entities/drugReport/model/drugReportInterfaces";
import { convertDateString, timeToExpiration } from "shared/helpers";
import { TimeToOverdue } from "features/drug";
import { Overdue } from "shared/index";

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

export function CatalogDrugCardBody({ ...props }: CatalogDrugCardBodyProps) {
  const { batch, control, production_date, expiration_date, drugId } = props;
  const expDate = new Date(expiration_date);

  const diffDays = timeToExpiration(expDate).deltaSeconds / 86400;

  const expDateString = convertDateString(expiration_date).shortDate;

  const { data, isLoading }: DataProps = useGetDataById(
    "drugRest",
    drugRestUrl(drugId),
    drugId.toString()
  );

  return (
    <Container className="mb-2">
      <Row>
        {diffDays > 0 && 60 > diffDays && (
          <TimeToOverdue expirationDate={expDate} />
        )}
      </Row>
      <Row sm={1} md={2} className="text-sm">
        <Col>
          <span className="font-bold mr-1">Серия:</span>
          {batch}
        </Col>
        <Col>
          <span className="font-bold mr-1">Контроль:</span>
          {control}
        </Col>
      </Row>
      {diffDays < 0 && <Overdue />}
      <Row sm={1} md={2} className="text-sm">
        <Col>
          <span className="font-bold mr-1">Изготовлен:</span>
          {production_date}
        </Col>
        <Col>
          <span className="font-bold mr-1">Годен до:</span>
          {expDateString}
        </Col>
      </Row>
      <Row className="text-sm">
        {data &&
          (data.units_rest && data.units_rest > 0 ? (
            <div>
              <span className="font-bold mr-1">Осталось: </span>{" "}
              {data.units_rest} доз
            </div>
          ) : (
            <span className="text-red-700 font-bold">Нет в наличии!!!</span>
          ))}
      </Row>
    </Container>
  );
}
