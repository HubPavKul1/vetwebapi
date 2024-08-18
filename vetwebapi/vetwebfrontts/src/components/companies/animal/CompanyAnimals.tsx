import { Container } from "react-bootstrap";
import { IAnimal } from "interfaces/AnimalInterfaces";

import { CompanyAnimal } from "./CompanyAnimal";
import { PageTable } from "components/PageTable";
import { companyAnimalsHeaders } from "data/TableHeaders";

interface CompanyAnimalsProps {
  animals: IAnimal[];
  companyId: number;
}

export function CompanyAnimals({ animals, companyId }: CompanyAnimalsProps) {
  return (
    <Container className="mb-8 text-center">
      <h5 className="page-detail-title">Животные </h5>
      <p className="text-left text-blue-700">Всего голов: {animals?.length}</p>
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
    </Container>
  );
}
