import { IAddress } from "entities/address/model/addressInterfaces";
import { Container } from "react-bootstrap";

interface CompanyAddressProps {
  address: IAddress;
}

export function CompanyAddress({ address }: CompanyAddressProps) {
  return (
    <Container className=" p-0 flex mb-8 text-lg text-indigo-900">
      <span className="mr-3 uppercase">Адрес: </span>
      <span className="mr-3">г. {address.city}</span>
      <span className="mr-3">{address.street}</span>
      <span className="mr-3">д. {address.house_number}</span>
      <span className="mr-3">тел 1: {address.phone_number1}</span>
      {address.phone_number2 && <span>тел 2: {address.phone_number2}</span>}
    </Container>
  );
}
