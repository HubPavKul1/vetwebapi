import { VetWorkCreateForm } from "../../../components/vetWorks/VetWorkCreateForm";
import { vaccinationsUrl } from "../../../Urls";
import { VetWorks } from "../VetWorks";

export function Vaccinations() {
  const url = vaccinationsUrl;
  const queryKey = "vaccinations";
  return (
    <VetWorks
      url={url}
      createForm={<VetWorkCreateForm url={url} queryKey={queryKey} />}
      imgSrc="/vetworkBg.jpg"
      title="Вакцинации"
      btnTitle="Добавить вакцинацию"
      queryKey={queryKey}
    />
  );
}
