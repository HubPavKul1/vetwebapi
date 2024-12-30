import { Col, Row } from "react-bootstrap";
import { addressString } from "../addressHelper";
import { IAddress } from "../model/addressInterfaces";

interface CardBodyAddressProps {
    address?: IAddress
}

export function CardBodyAddress({ address }: CardBodyAddressProps) {
  const companyAddress: string = address ? addressString(address) : "";

  return (
    <>
      <Row>
        <Col md={2}>
          <h6 className="underline">Адрес:</h6>
        </Col>
        <Col md={10}>
          <h6>{companyAddress}</h6>
        </Col>
      </Row>
    </>
  );
}
