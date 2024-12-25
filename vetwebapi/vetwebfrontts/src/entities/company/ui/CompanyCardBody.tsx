import { addressString } from "entities/address/addressHelper";
import { IAddress } from "entities/address/model/addressInterfaces";
import { IAnimal } from "entities/animal";
import { employeeString } from "entities/employee/employeeHelper";
import { IEmployee } from "entities/employee/model/employeeInterfaces";
import { Col, Container, Row } from "react-bootstrap";

interface CompanyCardBodyProps {
  address?: IAddress;
  phone?: string;
  phone2?: string;
  employee?: IEmployee;
  animal?: IAnimal;
}

export function CompanyCardBody({
  address,
  phone,
  phone2,
  employee,
  animal,
}: CompanyCardBodyProps) {
  const companyAddress = address ? addressString(address) : "";
  const companyEmployee = employee ? employeeString(employee) : "";
  const companyAnimalGroup = animal ? animal.animal_group : "";
  return (
    <>
      <Container className="text-base text-left mb-1">
        {companyAnimalGroup && (
          <Row>
            <Col md={2}>
              <h6>Животные:</h6>
            </Col>
            <Col md={10}>
              <h6>{companyAnimalGroup}</h6>
            </Col>
          </Row>
        )}

        <Row>
          <Col md={2}>
            <h6 className="underline">Адрес:</h6>
          </Col>
          <Col md={10}>
            <h6>{companyAddress}</h6>
          </Col>
        </Row>
      </Container>
      <Container className="text-base text-left mb-2">
        <Row>
          <Col md={2}>
            <h6 className="underline">Персонал:</h6>
          </Col>
          <Col md={10}>
            <h6>{companyEmployee}</h6>
          </Col>
        </Row>
      </Container>
      <Container className="">
        <Row className="text-xs">
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
