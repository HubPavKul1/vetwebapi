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
      element: data.file_id ? (
        openFileBtn()
      ) : (
        <UploadFileMenuItem vetWorkId={data.id} />
      ),
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