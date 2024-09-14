import { AddAddress } from "features/address/ui/AddAddress";
import { AddAnimal } from "features/animal/ui/AddAnimal";
import { AddEmployee } from "features/employee/ui/AddEmployee";

import { PageMenuWrapper } from "shared/index";

export function CompanyPageMenu() {
  return (
    <PageMenuWrapper>
      <AddAddress />
      <AddEmployee />
      <AddAnimal />
    </PageMenuWrapper>
  );
}
