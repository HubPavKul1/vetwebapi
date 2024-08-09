import { Container } from "react-bootstrap";
import { IAnimal } from "../../../interfaces/AnimalInterfaces";

import styles from "./PageDetailAnimals.module.scss";
import { CompanyAnimal } from "../../companies/animal/CompanyAnimal";
import { PageTable } from "../../PageTable";
import { companyAnimalsHeaders } from "../../../TableHeaders";

interface PageDetailAnimalsProps {
  animals: IAnimal[];
  companyId: number;
}

export function PageDetailAnimals({
  animals,
  companyId,
}: PageDetailAnimalsProps) {
  return (
    <Container className={styles.companyAnimals}>
      <h5>Животные </h5>
      <p className={styles.animalCounter}>Всего голов: {animals?.length}</p>
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
