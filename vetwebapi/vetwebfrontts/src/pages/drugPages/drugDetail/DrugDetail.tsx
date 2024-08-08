import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./DrugDetail.module.scss";

import { IDrugDetail } from "../../../interfaces/DrugInterfaces";
import { useGetDataById } from "../../../hooks/useGetDataById";
import { ErrorLoadDataMessage } from "../../../components/ErrorLoadDataMessage";
import { Loader } from "../../../components/Loader";

interface DrugData {
  data?: IDrugDetail;
  isLoading: boolean;
}

export function DrugDetail() {
  const { id } = useParams();
  const url = `/api/drugs/${id}`;

  const { isLoading, data, isError, error }: DrugData = useGetDataById("drug", url, id);

  if (isError) return <ErrorLoadDataMessage error={error}/>;
  if (isLoading || !data) return <Loader />;

  console.log("DRUGdata>>>>", data.instruction, data.image)

  return (
    <>
      <Container>
        <Row className="p-3 font-bold text-center items-center">
          <Col sm={3} className="">
            <img src={`/${data.image}`} alt={data.name} />
          </Col>

          <Col>
            <h5 className="text-3xl mb-5">{data.name}</h5>
            <p className="text-2xl">Производитель: {data.drug_manufacturer}</p>
          </Col>
        </Row>

        <Row className={styles.rowBody}>
          {data.instruction && (
            <object
              type="application/pdf"
              data={data.instruction}
              // data={`/${data.instruction}`}
              width="100%"
            ></object>
          )}
        </Row>
      </Container>
    </>
  );
}
