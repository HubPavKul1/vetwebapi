import { VaccinationCreateForm } from "../../../components/vetWorks/VaccinationCreateForm";
import { VetWorks } from "../VetWorks";

export function Diagnostics() {
  return (
    <VetWorks
      url="/api/vetwork/diagnostics"
      createForm={<VaccinationCreateForm />}
      imgSrc="diagnostic.jpg"
      title="Диагностические исследования"
      btnTitle="Добавить диагностику"
      invQueryName="diagnostics"
    />
  );
}
