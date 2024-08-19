import { Container } from "react-bootstrap";
import { IVetWorkSchema } from "interfaces/VetWorkInterfaces";

import { animalListHeaders } from "data/TableHeaders";
import { PageTable } from "components/PageTable";
import AnimalsListPDFItem from "./AnimalsListPDFItem";
import { AppService } from "services/app.service";

interface AnimalsListPDFBodyProps {
  data: IVetWorkSchema;
}

export function AnimalsListPDFBody({ data }: AnimalsListPDFBodyProps) {
  if (!data.animals) return;

  return (
    <Container className="py-10">
      <PageTable
        tableHeaders={animalListHeaders}
        tableItems={
          data.companies &&
          data.companies.map((company) => (
            <>
              <tr>
                <td colSpan={8}>
                  <h5>{company.full_name}</h5>
                  <p>{company.address && AppService.addressString(company.address)}</p>
                </td>
              </tr>
              {data.animals &&
                data.animals
                  .filter((animal) => animal.company_id === company.id)
                  .map((animal, index) => (
                    <AnimalsListPDFItem animal={animal} index={index} />
                  ))}
            </>
          ))
        }
      />
    </Container>
  );
}
