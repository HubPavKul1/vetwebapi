import { Menu } from "../MenuComponent";
import { AddCompanyToVetWork } from "../vetWorks/AddCompanyToVetWork";
import { AddDrugToVetWork } from "../vetWorks/AddDrugToVetWork";

export function VetWorkPageMenu() {
  return (
    <Menu>
      <AddCompanyToVetWork />
      <AddDrugToVetWork />
    </Menu>
  );
}
