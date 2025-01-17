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
        <Col md={1}>
          <h6 className="">Персонал:</h6>
        </Col>
        <Col md={2}></Col>
        <Col md={9}>
          <h6 className="text-sm">{companyEmployee}</h6>
        </Col>
      </Row>
    </>
  );
}
