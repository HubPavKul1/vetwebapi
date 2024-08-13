import { Container } from "react-bootstrap";
import { IAnimal } from "../../interfaces/AnimalInterfaces";

import { CompanyAnimal } from "../companies/animal/CompanyAnimal";
import { PageTable } from "../PageTable";
import { companyAnimalsHeaders } from "../../TableHeaders";

interface PageDetailAnimalsProps {
  animals: IAnimal[];
  companyId: number;
}

export function PageDetailAnimals({
  animals,
  companyId,
}: PageDetailAnimalsProps) {
  return (
    <Container className="mb-8 text-center">
      <h5 className="page-detail-title">Животные </h5>
      <p className="text-left text-blue-700">Всего голов: {animals?.length}</p>
      <PageTable
        reportHeaders={companyAnimalsHeaders}
        reportItems={animals.map((animal) => (
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
