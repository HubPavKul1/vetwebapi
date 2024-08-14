import { IAnimalInVetwork } from "../../interfaces/VetWorkInterfaces";
import { animalInVetWorkHeaders } from "../../TableHeaders";
import { PageTable } from "../PageTable";
import { AnimalInVetwork } from "./AnimalInVetwork";

interface AnimalsInVetWorkProps {
  workType: string;
  disease: string;
  animals?: IAnimalInVetwork[];
  companyId: number;
}
export default function AnimalsInVetWork({
  workType,
  disease,
  animals,
  companyId,
}: AnimalsInVetWorkProps) {
  return (
    <div>
      <PageTable
        reportHeaders={animalInVetWorkHeaders(workType, disease)}
        reportItems={
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
