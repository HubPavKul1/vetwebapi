import { IAnimalInVetwork } from "interfaces/VetWorkInterfaces";
import { animalInVetWorkHeaders } from "data/TableHeaders";
import { PageTable } from "widgets/PageTable";
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
