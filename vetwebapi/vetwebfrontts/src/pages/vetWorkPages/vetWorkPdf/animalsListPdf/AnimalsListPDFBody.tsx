import { Container, Table } from "react-bootstrap";

import { AppService } from "../../../../app.service";
import { IVetWorkSchema } from "../../../../interfaces/VetWorkInterfaces";

import { animalListHeaders } from "../../../../Constants";

interface AnimalsListPDFBodyProps {
  data: IVetWorkSchema;
}

export function AnimalsListPDFBody({ data }: AnimalsListPDFBodyProps) {
  if (!data.animals) return;

  return (
    <Container className="py-10">
      <Table className="table-report align-middle p-10">
        <thead>
          <tr>
            {animalListHeaders.map((item, i) => (
              <th key={i}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.companies &&
            data.companies.map((company) => (
              <>
                <tr>
                  <td colSpan={7}>
                    <h5>{company.full_name}</h5>
                  </td>
                </tr>
                {data.animals &&
                  data.animals
                    .filter((animal) => animal.company_id === company.id)
                    .map((animal, index) => <tr key={animal.animal_id}>
                      <td>{index + 1}</td>
                      <td>{animal.animal_group}</td>
                      <td>{animal.nickname}</td>
                      <td>{AppService.convertDateString(animal.date_of_birth).year}</td>
                      <td></td>
                      <td>{animal.dosage && animal.dosage / 1000}</td>
                      <td></td>
                    </tr>)}
              </>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}
