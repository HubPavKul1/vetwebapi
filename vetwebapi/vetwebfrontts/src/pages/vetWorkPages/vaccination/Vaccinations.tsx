import { VaccinationCreateForm } from "../../../components/vetWorks/VaccinationCreateForm";
import { VetWorks } from "../VetWorks";

export function Vaccinations() {
  return (
    <VetWorks
      url="/api/vetwork/vaccinations"
      createForm={<VaccinationCreateForm />}
      imgSrc="vetworkBg.jpg"
      title="Вакцинация"
      btnTitle="Добавить вакцинацию"
      invQueryName="vaccinations"
    />
  );
}
