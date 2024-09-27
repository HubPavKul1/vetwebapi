import { vetsUrl } from "shared/index";
import { CompanyCatalog } from "widgets/company";

export function Vets() {
  return (
    <CompanyCatalog
      title="Ветклиники"
      btnTitle="Добавить ветклинику"
      queryKey="vets"
      url={vetsUrl}
      imgSrc="/gosvet.jpg"
    />
  );
}
