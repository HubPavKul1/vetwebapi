import { Menu } from "../MenuComponent";
import { AddCompanyToVetWork } from "../vetWorks/AddCompanyToVetWork";
import { AddDrugToVetWork } from "../vetWorks/AddDrugToVetWork";
import { CustomButton } from "../CustomButton";

interface VetWorkPageMenuProps {
  showAct: CallableFunction;
  showAnimalsList: CallableFunction;
  showReferral: CallableFunction; 
  workType: string
}

export function VetWorkPageMenu({
  showAct,
  showAnimalsList,
  showReferral,
  workType
}: VetWorkPageMenuProps) {
  const menuButtons = [
    {
      id: 1,
      element: workType!=="диагностика" ? (
        <CustomButton
          className="btn-submit"
          title="Акт на обработку"
          onClick={() => showAct(true)}
        />
      ): (<CustomButton
        className="btn-submit"
        title="Сопроводительная"
        onClick={() => showReferral (true)}
      />)
    },
    
    {
      id: 2,
      element: (
        <CustomButton
          className="btn-submit"
          title="Опись животных"
          onClick={() => showAnimalsList(true)}
        />
      )
    },
   
  ];

  return (
    <Menu buttons={menuButtons}>
      <AddCompanyToVetWork />
      <AddDrugToVetWork />
    </Menu>
  );
}
