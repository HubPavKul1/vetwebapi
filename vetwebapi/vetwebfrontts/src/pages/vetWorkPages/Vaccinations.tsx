import { vaccinationsUrl } from "shared/index";
import { VetWorks } from "widgets/vetWork";

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
