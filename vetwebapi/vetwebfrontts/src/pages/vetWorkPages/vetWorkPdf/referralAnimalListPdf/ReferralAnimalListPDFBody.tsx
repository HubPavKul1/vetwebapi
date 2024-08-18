import { Container, Row, Col, Table } from "react-bootstrap";

import { AppService } from "services/app.service";
import { IVetWorkSchema } from "interfaces/VetWorkInterfaces";
import NoData from "components/NoData";

interface ReferralAnimalListPDFBodyProps {
  data: IVetWorkSchema;
}

export function ReferralAnimalListPDFBody({
  data,
}: ReferralAnimalListPDFBodyProps) {
  const date = AppService.convertDateString(data.vetwork_date).fullDate;

  if (!data.companies) return <NoData title="Данные о предприятиях" />;
  if (!data.animals) return <NoData title="Данные о животных" />;

  return (
    <Container>
      <Table className="table-report mb-5">
        <thead>
          <tr>
            <th rowSpan={2}>№ п/п</th>
            <th rowSpan={2}>Инвентарный номер/ кличка</th>
            <th rowSpan={2}>Возраст пол</th>
            <th rowSpan={2}>Шифр пробы</th>
            <th colSpan={5}>Результат исследования</th>
          </tr>
          <tr className="h-20">
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {data.animals.map((animal, index) => (
            <tr key={animal.animal_id}>
              <td>{index + 1}</td>
              <td>
                {animal.identification !== "нет" &&
                  animal.identification + ", "}
                {animal.nickname}
              </td>
              <td>
                {AppService.convertDateString(animal.date_of_birth).shortDate}{" "}
                {animal.gender}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row>
        <Col md={3}></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col md={2} className="pdf-report-underlined"></Col>
        <Col></Col>
        <Col>стр.</Col>
        <Col className="pdf-report-underlined"></Col>
        <Col>из</Col>
        <Col className="pdf-report-underlined"></Col>
        <Col>стр.</Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
