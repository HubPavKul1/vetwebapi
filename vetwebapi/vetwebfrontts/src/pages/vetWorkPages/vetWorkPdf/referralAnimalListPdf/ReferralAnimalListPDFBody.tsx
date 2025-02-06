import { Container, Row, Col, Table } from "react-bootstrap";

import { IVetWorkSchema } from "entities/vetWork/model/vetWorkInterfaces";

import { ReferralAnimalItem } from "./ReferralAnimalItem";
import { NoData, StateAssignment } from "shared/index";

interface ReferralAnimalListPDFBodyProps {
  data: IVetWorkSchema;
}

export function ReferralAnimalListPDFBody({
  data,
}: ReferralAnimalListPDFBodyProps) {
  if (!data.companies) return <NoData title="Данные о предприятиях" />;
  if (!data.animals) return <NoData title="Данные о животных" />;

  return (
    <Container className="text-lg">
      <Table>
        <thead>
          <tr>
            <th
              rowSpan={2}
              className="border border-black font-bold text-center align-top w-12"
            >
              № п/п
            </th>
            <th
              rowSpan={2}
              className="border border-black font-bold text-center align-top"
            >
              Вид животного
            </th>
            <th
              rowSpan={2}
              className="border border-black font-bold text-center align-top w-52"
            >
              Инвентарный номер / кличка
            </th>
            <th
              rowSpan={2}
              className="border border-black font-bold text-center align-top"
            >
              Возраст, пол
            </th>
            <th
              rowSpan={2}
              className="border border-black font-bold text-center align-top w-36"
            >
              Шифр пробы
            </th>
            <th
              colSpan={5}
              className="border border-black font-bold text-center align-top"
            >
              Результат исследования
            </th>
          </tr>
          <tr className="h-40">
            <th className="border border-black font-bold text-center align-top"></th>
            <th className="border border-black font-bold text-center align-top"></th>
            <th className="border border-black font-bold text-center align-top"></th>
            <th className="border border-black font-bold text-center align-top"></th>
            <th className="border border-black font-bold text-center align-top"></th>
          </tr>
        </thead>
        <tbody>
          {data.animals.map((animal, index) => (
            <ReferralAnimalItem animal={animal} index={index} />
          ))}
        </tbody>
      </Table>

      {/* <PageTable
        isPDF
        tableHeaders={referralAnimalsHeaders}
        tableItems={data.animals.map((animal, index) => (
          <ReferralAnimalItem animal={animal} index={index} />
        ))}
      /> */}
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
