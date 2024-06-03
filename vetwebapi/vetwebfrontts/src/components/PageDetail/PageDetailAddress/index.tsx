import { Container } from "react-bootstrap";
import { CompanyAddress } from "../../companies/address/CompanyAddress";
import { IAddress } from "../../../interfaces/AddressInterfaces";


interface PageDetailAddressProps {
    address?: IAddress;
}


export function PageDetailAddress({address}: PageDetailAddressProps) {
  return (
    <Container>
        {address ? (
            <CompanyAddress address={address} />
          ) : (
            <p>Адрес отсутствует!</p>
          )}
    </Container>
  )
}
