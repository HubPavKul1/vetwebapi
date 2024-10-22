import { addressString } from "entities/address/addressHelper";
import { IAddress } from "entities/address/model/addressInterfaces";
import { employeeString } from "entities/employee/employeeHelper";
import { IEmployee } from "entities/employee/model/employeeInterfaces";
import { Col, Container, Row } from "react-bootstrap";

interface CompanyCardBodyProps {
  address?: IAddress;
  phone?: string;
  phone2?: string;
  employee?: IEmployee;
}

export function CompanyCardBody({
  address,
  phone,
  phone2,
  employee,
}: CompanyCardBodyProps) {
  const companyAddress = address ? addressString(address) : "";
  const companyEmployee = employee ? employeeString(employee) : "";
  return (
    <>
      <Container className="text-base text-left mb-1">
        <Row>
          <Col>
            <h6 className="underline">Адрес:</h6>
          </Col>
          <Col md={9}>
            <h6>{companyAddress}</h6>
          </Col>
        </Row>
      </Container>
      <Container className="text-base text-left mb-2">
        <Row>
          <Col>
            <h6 className="underline">Персонал:</h6>
          </Col>
          <Col md={9}>
            <h6>{companyEmployee}</h6>
          </Col>
        </Row>
      </Container>
      <Container className="">
        <Row className="text-sm">
          <Col>
            <span>тел.: {phone}</span>
          </Col>
          {phone2 && (
            <Col>
              <span>тел2.: {phone2}</span>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}
