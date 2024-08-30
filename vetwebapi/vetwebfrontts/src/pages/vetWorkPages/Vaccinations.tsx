import { vaccinationsUrl } from "../../urls/vetWorkUrls";
import { VetWorks } from "./VetWorks";

export function Vaccinations() {
  const url = vaccinationsUrl;
  const queryKey = "vaccinations";
  return (
    <VetWorks
      url={url}
      imgSrc="/vetworkBg.jpg"
      title="Вакцинации"
      btnTitle="Добавить вакцинацию"
      queryKey={queryKey}
    />
  );
}
