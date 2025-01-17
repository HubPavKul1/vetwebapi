import { CardBodyAddress, CardBodyPhones } from "entities/address";
import { IAddress } from "entities/address/model/addressInterfaces";
import { CardBodyAnimalGroup, IAnimal } from "entities/animal";
import { CardBodyEmployee } from "entities/employee";
import { IEmployee } from "entities/employee/model/employeeInterfaces";
import { Container } from "react-bootstrap";

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
  return (
    <>
      <Container className="text-base text-left">
        <CardBodyAnimalGroup animal={animal} />
        <CardBodyAddress address={address} />
        <CardBodyEmployee employee={employee} />
        <CardBodyPhones phone={phone} phone2={phone2} />
      </Container>
    </>
  );
}
