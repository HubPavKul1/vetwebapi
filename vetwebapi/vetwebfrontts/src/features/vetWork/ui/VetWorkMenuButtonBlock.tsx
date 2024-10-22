import {
  AccountingActBtn,
  ActBtn,
  AnimalListBtn,
  OpenFileBtn,
  ReferralAnimalListBtn,
  ReferralBtn,
  TubercActBtn,
  UploadFileMenuItem,
} from "entities/vetWork";
import { useGetVetWorkData } from "../hooks/useGetVetWorkData";
import { Loader, PageMenuButtonsBlock } from "shared/index";

export function VetWorkMenuButtonBlock() {
  const data = useGetVetWorkData();
  if (!data) return <Loader />;
  console.log("DATA", data);
  console.log("FileId", data.file_id);
  const disease = data.diseases[0].toLowerCase();
  const menuButtons = [
    {
      id: 1,
      element:
        data.work_type !== "диагностика" ? (
          <ActBtn />
        ) : disease !== "туберкулез" ? (
          <ReferralBtn />
        ) : (
          <TubercActBtn />
        ),
    },
    {
      id: 2,
      element: disease === "туберкулез" && <AccountingActBtn />,
    },

    {
      id: 3,
      element:
        data.work_type === "диагностика" && disease !== "туберкулез" ? (
          <ReferralAnimalListBtn />
        ) : (
          <AnimalListBtn />
        ),
    },
    {
      id: 4,
      element: !data.file_id && <UploadFileMenuItem vetWorkId={data.id} />,
    },
    {
      id: 5,
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
