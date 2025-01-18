import { CompanyAnimal } from "./CompanyAnimal";
import { IAnimal } from "../model/animalInterfaces";
import { PageDetailContentWrapper, PageTable } from "shared/index";
import { companyAnimalsHeaders } from "shared/model/tableHeaders";

interface CompanyAnimalsProps {
  animals: IAnimal[];
  companyId: number;
}

export function CompanyAnimals({ animals, companyId }: CompanyAnimalsProps) {
  return (
    <PageDetailContentWrapper title="Животные">
      <p className="text-left">Всего голов: {animals?.length}</p>
      <PageTable
        tableHeaders={companyAnimalsHeaders}
        tableItems={animals.map((animal) => (
          <CompanyAnimal
            key={animal.id}
            animal={animal}
            companyId={companyId}
          />
        ))}
      />
    </PageDetailContentWrapper>
  );
}
