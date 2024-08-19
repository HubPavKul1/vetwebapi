import { Container } from "react-bootstrap";
import { IAddress } from "interfaces/AddressInterfaces";

interface CompanyAddressProps {
  address: IAddress;
}

export function CompanyAddress({ address }: CompanyAddressProps) {
  return (
    <Container className="flex mb-8 text-lg">
      <span className="mr-3">Адрес: </span>
      <span className="mr-3">г. {address.city}</span>
      <span className="mr-3">{address.street}</span>
      <span className="mr-3">д. {address.house_number}</span>
      <span className="mr-3">тел 1: {address.phone_number1}</span>
      {address.phone_number2 && (
        <span>тел 2: {address.phone_number2}</span>
      )}
    </Container>
  );
}
