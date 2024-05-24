
import { Menu } from "../menuComponent/Menu";
import { AddCompanyToVetWork } from "../vetWorks/AddCompanyToVetWork";
import { AddDrugToVetWork } from "../vetWorks/AddDrugToVetWork";


export function VetWorkPageMenu() {

  return(
      <Menu>
        <AddCompanyToVetWork />
        <AddDrugToVetWork />
      </Menu>    
    )
}