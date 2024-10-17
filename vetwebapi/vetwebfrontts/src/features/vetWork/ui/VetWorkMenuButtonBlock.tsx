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
import { useGetVetWorkData } from "../hooks/useGetVetWorkData";
import { PageMenuButtonsBlock } from "shared/index";

export function VetWorkMenuButtonBlock() {
  const data = useGetVetWorkData();
  if (!data) return;
  const disease = data.diseases[0].toLowerCase();
  const menuButtons = [
    {
      id: 1,
      element:
        data.work_type !== "диагностика"
          ? actBtn()
          : disease !== "туберкулез"
          ? referralBtn()
          : tubercActBtn(),
    },
    {
      id: 2,
      element: disease === "туберкулез" && accountingActBtn(),
    },

    {
      id: 3,
      element:
        data.work_type === "диагностика" && disease !== "туберкулез"
          ? referralAnimalListBtn()
          : animalListBtn(),
    },
    {
      id: 4,
      element: !data.file_id ? <UploadFileMenuItem /> : openFileBtn(),
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
