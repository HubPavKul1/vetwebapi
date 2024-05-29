import { Col, Row } from "react-bootstrap";



interface CatalogCardBodyProps {
    hasContacts?: boolean;
    address?: string;
    phone?: string;
    employee?: string;
    phone2?: string;

}

// Поменять на CompanyCardBody
export function CatalogCardBody({address, phone, employee, phone2}: CatalogCardBodyProps) {
  return (
    <>
        <Row>{address}</Row>
        <Row>{employee}</Row>
        <Row>
            <Col>{phone}</Col>
            <Col>{phone2}</Col>
        </Row>
    </>
  )
}
