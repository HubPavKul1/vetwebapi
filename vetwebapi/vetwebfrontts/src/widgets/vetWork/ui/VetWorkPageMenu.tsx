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

import { useVetWorkPageContext } from "features/vetWork/useVetWorkPageContext";
import { actOpen } from "features/vetWork/slices/actSlice";
import { useAppDispatch } from "app/hooks/redux";

export function VetWorkPageMenu({ ...props }) {
  const { data } = props;
  const dispatch = useAppDispatch();
  //   setShowAct,
  //   disease,
  //   setShowReferral,
  //   setShowAccountingAct,
  //   setShowReferralAnimalList,
  //   setShowAnimalsList,
  //   setShowVetWorkFile,
  // } = useVetWorkPageContext();

  if (!data) return;
  const { id } = useParams();
  const vetWorkId = Number(id);
  const menuButtons = [
    {
      id: 1,
      element:
        data.work_type !== "диагностика" && actBtn(() => dispatch(actOpen())),
      // :
      // disease !== "туберкулез"
      // ? referralBtn()
      // : tubercActBtn(),
    },
    // {
    //   id: 2,
    //   element:
    //     disease === "туберкулез" && accountingActBtn(setShowAccountingAct),
    // },

    // {
    //   id: 3,
    //   element:
    //     data.work_type === "диагностика" && disease !== "туберкулез"
    //       ? referralAnimalListBtn(setShowReferralAnimalList)
    //       : animalListBtn(setShowAnimalsList),
    // },
    // {
    //   id: 4,
    //   element:
    //     !data.file_id && id ? (
    //       <UploadFileMenuItem vetWorkId={vetWorkId} id={id} />
    //     ) : (
    //       openFileBtn(setShowVetWorkFile)
    //     ),
    // },
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
