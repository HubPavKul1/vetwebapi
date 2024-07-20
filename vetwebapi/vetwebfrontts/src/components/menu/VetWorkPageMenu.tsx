import { Menu } from "../MenuComponent";
import { AddCompanyToVetWork } from "../vetWorks/AddCompanyToVetWork";
import { AddDrugToVetWork } from "../vetWorks/AddDrugToVetWork";
import { CustomButton } from "../CustomButton";

interface VetWorkPageMenuProps {
  showAct: CallableFunction;
  showAnimalsList: CallableFunction;
  showReferral: CallableFunction;
  showReferralAnimalList: CallableFunction;
  workType: string;
  disease: string;
}

export function VetWorkPageMenu({
  showAct,
  showAnimalsList,
  showReferral,
  showReferralAnimalList,
  workType,
  disease,
}: VetWorkPageMenuProps) {
  const menuButtons = [
    {
      id: 1,
      element:
        workType !== "диагностика" ? (
          <CustomButton
            className="btn-submit"
            title="Акт на обработку"
            onClick={() => showAct(true)}
          />
        ) : disease !== "туберкулез" ? (
          <CustomButton
            className="btn-submit"
            title="Сопроводительная"
            onClick={() => showReferral(true)}
          />
        ) : (
          <CustomButton
            className="btn-submit"
            title="Акт на туберкулинизацию"
            onClick={() => showAct(true)}
          />
        ),
    },

    {
      id: 2,
      element: workType === "диагностика" && disease !== "туберкулез" ? 
      (
        <CustomButton
          className="btn-submit"
          title="Опись к сопроводительной"
          onClick={() => showReferralAnimalList(true)}
        />
      ) :
      
      (
        <CustomButton
          className="btn-submit"
          title="Опись животных"
          onClick={() => showAnimalsList(true)}
        />
      ),
    },
  ];

  return (
    <Menu buttons={menuButtons}>
      <AddCompanyToVetWork />
      <AddDrugToVetWork />
    </Menu>
  );
}
