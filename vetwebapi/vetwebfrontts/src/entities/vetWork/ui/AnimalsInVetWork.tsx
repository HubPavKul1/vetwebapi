import { IAnimalInVetwork } from "entities/vetWork/model/vetWorkInterfaces";
import { AnimalInVetwork } from "./AnimalInVetwork";
import { PageTable } from "shared/index";
import { animalInVetWorkHeaders } from "shared/model/tableHeaders";

interface AnimalsInVetWorkProps {
  workType: string;
  disease: string;
  animals?: IAnimalInVetwork[];
  companyId: number;
}
export function AnimalsInVetWork({
  workType,
  disease,
  animals,
  companyId,
}: AnimalsInVetWorkProps) {
  return (
    <div>
      <PageTable
        tableHeaders={animalInVetWorkHeaders(workType, disease)}
        tableItems={
          animals?.length &&
          animals
            .filter((animal) => animal.company_id === companyId)
            .map((animal) => (
              <AnimalInVetwork
                key={animal.animal_id}
                animal={animal}
                workType={workType}
                disease={disease}
              />
            ))
        }
      />
    </div>
  );
}
