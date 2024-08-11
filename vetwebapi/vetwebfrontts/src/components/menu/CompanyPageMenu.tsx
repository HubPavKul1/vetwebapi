import { AddAddress } from "../companies/address/AddAddress";
import { AddEmployee } from "../companies/employee/AddEmployee";
import { AddAnimal } from "../companies/animal/AddAnimal";
import { Menu } from "../Menu";

export function CompanyPageMenu() {
  return (
    <Menu>
      <AddAddress />
      <AddEmployee />
      <AddAnimal />
    </Menu>
  );
}
