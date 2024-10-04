import { useParams } from "react-router-dom";
import {
  PageMenuButtonsBlock,
  PageMenuTop,
  PageMenuWrapper,
} from "shared/index";
import { AddCompanyToVetWork, AddDrugToVetWork } from "features/vetWork";
import {
  accountingActBtn,
  actBtn,
  animalListBtn,
  openFileBtn,
  referralAnimalListBtn,
  referralBtn,
  tubercActBtn,
  UploadFileMenuItem,
} from "entities/vetWork";

interface VetWorkPageMenuProps {
  showAct: CallableFunction;
  showAnimalsList: CallableFunction;
  showReferral: CallableFunction;
  showReferralAnimalList: CallableFunction;
  showAccountingAct: CallableFunction;
  workType: string;
  disease: string;
  showVetWorkFile: CallableFunction;
  fileId?: number;
}

export function VetWorkPageMenu({ ...props }: VetWorkPageMenuProps) {
  const {
    showAct,
    showAnimalsList,
    showReferral,
    showReferralAnimalList,
    showAccountingAct,
    showVetWorkFile,
    workType,
    disease,
    fileId,
  } = props;
  const { id } = useParams();
  const vetWorkId = Number(id);
  const menuButtons = [
    {
      id: 1,
      element:
        workType !== "диагностика"
          ? actBtn(showAct)
          : disease !== "туберкулез"
          ? referralBtn(showReferral)
          : tubercActBtn(showAct),
    },
    {
      id: 2,
      element: disease === "туберкулез" && accountingActBtn(showAccountingAct),
    },

    {
      id: 3,
      element:
        workType === "диагностика" && disease !== "туберкулез"
          ? referralAnimalListBtn(showReferralAnimalList)
          : animalListBtn(showAnimalsList),
    },
    {
      id: 4,
      element:
        !fileId && id ? (
          <UploadFileMenuItem vetWorkId={vetWorkId} id={id} />
        ) : (
          openFileBtn(showVetWorkFile)
        ),
    },
  ];

  return (
    <PageMenuWrapper>
      <PageMenuTop>
        <AddCompanyToVetWork />
        <AddDrugToVetWork />
      </PageMenuTop>
      <PageMenuButtonsBlock>
        {menuButtons.map((item) => (
          <div key={item.id}>{item.element}</div>
        ))}
      </PageMenuButtonsBlock>
    </PageMenuWrapper>
  );
}
