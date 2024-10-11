import { useParams } from "react-router-dom";
import {
  PageMenuButtonsBlock,
  PageMenuTop,
  PageMenuWrapper,
} from "shared/index";
import { AddCompanyToVetWork, AddDrugToVetWork, VetWorkPageContext } from "features/vetWork";
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
import { useContext } from "react";
import { IVetWorkPageContext } from "features/vetWork/models/interfaces";


export function VetWorkPageMenu() {
  const context: IVetWorkPageContext = useContext(VetWorkPageContext)
  const data = context.data;
  if (!data) return
  const { id } = useParams();
  const vetWorkId = Number(id);
  const menuButtons = [
    {
      id: 1,
      element:
        data.work_type !== "диагностика"
          ? actBtn(context.setShowAct)
          : context.disease !== "туберкулез"
          ? referralBtn(context.setShowReferral)
          : tubercActBtn(context.setShowAct),
    },
    {
      id: 2,
      element: context.disease === "туберкулез" && accountingActBtn(context.setShowAccountingAct),
    },

    {
      id: 3,
      element:
        data.work_type === "диагностика" && context.disease !== "туберкулез"
          ? referralAnimalListBtn(context.setShowReferralAnimalList)
          : animalListBtn(context.setShowAnimalsList),
    },
    {
      id: 4,
      element:
        !data.file_id && id ? (
          <UploadFileMenuItem vetWorkId={vetWorkId} id={id} />
        ) : (
          openFileBtn(context.setShowVetWorkFile)
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
