import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./ReceiptDetail.module.scss";
import { AppService } from "../../../app.service";
import { IDrugMovementDetail } from "../../../interfaces/DrugInterfaces";
import { CreateItem } from "../../../components/CreateItem";
import { AddDrugForm } from "../../../components/drugs/drugMovements/AddDrugForm";
import { ReceiptDrug } from "../../../components/drugs/drugMovements/ReceiptDrug";
import { CustomButton } from "../../../components/CustomButton";
import { useState } from "react";
import { ReceiptPDF } from "./receiptPdf/ReceiptPDF";
import { PageDetail } from "../../../components/PageDetail";
import { CompanyPageMenu } from "../../../components/menu/CompanyPageMenu";
import { ReceiptPageMenu } from "../../../components/menu/ReceiptPageMenu";

interface ReceiptData {
  data?: IDrugMovementDetail;
  isLoading: boolean;
}

export function ReceiptDetail() {
  const [pdf, setPdf] = useState(false);
  const { id } = useParams();
  const url = `/api/drugs/receipts/${id}`;

  const { isLoading, data }: ReceiptData = useQuery(
    ["receipt", id],
    () => AppService.get(url),
    {
      enabled: !!id,
    }
  );

  if (isLoading || !data) return <p>Загрузка ...</p>;

  const date = AppService.convertDateString(data.operation_date);

  return (
    <>
      {!pdf ? (
        <PageDetail
          title={`Поступление от ${date.fullDate}`}
          imgSrc="/drugsBg.jpg"
          alt={date.fullDate}
          menu={<ReceiptPageMenu url={url} setPdf={setPdf} />}
        >
          <Container className={styles.detailWrap}>
            <Container className={styles.drugWrap}>
              <h5 className="text-xl mb-8">Препараты </h5>

              <Row className="border-top border-bottom border-black">
                <Col>Наименование препарата</Col>
                <Col>Серия</Col>
                <Col>Контроль</Col>
                <Col>Дата Изготовления</Col>
                <Col>Количество упаковок</Col>
                <Col>Количество единиц учета</Col>
              </Row>
              {data.drugs?.length &&
                data.drugs.map((drug) => (
                  <ReceiptDrug key={drug.id} drug={drug} />
                ))}
            </Container>
          </Container>
        </PageDetail>
      ) : (
        <ReceiptPDF setPdf={setPdf} data={data} />
      )}
    </>
  );
}
