import { Col, Row } from "react-bootstrap";
import { IEmployee } from "entities/employee";
import { employeeString } from "entities/employee/employeeHelper";

interface CardBodyEmployeeProps {
  employee?: IEmployee;
}

export function CardBodyEmployee({ employee }: CardBodyEmployeeProps) {
  const companyEmployee = employee ? employeeString(employee) : "";

  return (
    <>
      <Row>
        <Col md={2}>
          <h6 className="underline">Персонал:</h6>
        </Col>
        <Col md={10}>
          <h6>{companyEmployee}</h6>
        </Col>
      </Row>
    </>
  );
}
