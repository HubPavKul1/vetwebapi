import { Menu } from "../MenuComponent";
import { AddCompanyToVetWork } from "../vetWorks/AddCompanyToVetWork";
import { AddDrugToVetWork } from "../vetWorks/AddDrugToVetWork";
import { CustomButton } from "../CustomButton";


interface VetWorkPageMenuProps {
  showAct: CallableFunction;
  showAnimalsList: CallableFunction;
}


export function VetWorkPageMenu({showAct, showAnimalsList}: VetWorkPageMenuProps) {
  
  const menuButtons = [
    <CustomButton
      className="btn-submit"
      title="Акт на обработку"
      onClick={() => showAct(true)}
    />,
    <CustomButton
      className="btn-submit"
      title="Опись к акту"
      onClick={() => showAnimalsList(true)}
    />,
  ];

  return (
    <Menu buttons={menuButtons}>
      <AddCompanyToVetWork />
      <AddDrugToVetWork />
    </Menu>
  );
}
