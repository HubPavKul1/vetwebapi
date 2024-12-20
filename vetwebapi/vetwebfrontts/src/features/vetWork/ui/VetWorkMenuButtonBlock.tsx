import {
  AccountingActBtn,
  ActBtn,
  AnimalListBtn,
  OpenFileBtn,
  ReferralAnimalListBtn,
  ReferralBtn,
  SamplingActBtn,
  TubercActBtn,
  UploadFileMenuItem,
} from "entities/vetWork";
import { useGetVetWorkData } from "../hooks/useGetVetWorkData";
import { Loader, PageMenuButtonsBlock } from "shared/index";
import { DISEASES, WORKTYPES } from "shared/constants/vetworkConst";

export function VetWorkMenuButtonBlock() {
  const data = useGetVetWorkData();
  if (!data) return <Loader />;
  const disease = data.diseases[0].toLowerCase();
  const menuButtons = [
    {
      id: 1,
      element:
        data.work_type !== WORKTYPES.diagnostic ? (
          <ActBtn />
        ) : disease !== DISEASES.tbc ? (
          <ReferralBtn />
        ) : (
          <TubercActBtn />
        ),
    },
    {
      id: 2,
      element: disease === DISEASES.tbc && <AccountingActBtn />,
    },

    {
      id: 3,
      element:
        data.work_type === WORKTYPES.diagnostic && disease !== DISEASES.tbc ? (
          <ReferralAnimalListBtn />
        ) : (
          <AnimalListBtn />
        ),
    },
    {
      id: 4,
      element: data.work_type === WORKTYPES.diagnostic && <SamplingActBtn />,
    },
    {
      id: 5,
      element: !data.file_id && <UploadFileMenuItem vetWorkId={data.id} />,
    },
    {
      id: 6,
      element: data.file_id && <OpenFileBtn />,
    },
  ];
  return (
    <PageMenuButtonsBlock>
      {menuButtons.map((item) => (
        <div key={item.id}>{item.element}</div>
      ))}
    </PageMenuButtonsBlock>
  );
}
