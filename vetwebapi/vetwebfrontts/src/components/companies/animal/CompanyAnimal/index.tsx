import { IAnimal } from "../../../../interfaces/AnimalInterfaces";
import { AppService } from "../../../../app.service";
import { Col, Row } from "react-bootstrap";

import { UpdateItem } from "../../../UpdateItem";
import { UpdateAnimalForm } from "../UpdateAnimalForm";
import { DeleteItem } from "../../../DeleteItem";

interface CompanyAnimalProps {
  animal: IAnimal;
  companyId: number;
}

export function CompanyAnimal({ animal, companyId }: CompanyAnimalProps) {
  const id = companyId.toString();

  const url = `/api/companies/${id}/animals/${animal.id}`;

  const date_of_birth = AppService.convertDateString(
    animal.date_of_birth
  ).shortDate;

  return (
    <tr
      key={animal.id}
      className="border-b border-black text-center items-center justify-center"
    >
      <td>{animal.species}</td>
      <td>{animal.gender}</td>
      <td>{date_of_birth}</td>
      <td>
        <UpdateItem>
          <UpdateAnimalForm
            animal={animal}
            updateData={animal.date_of_birth}
            updateFieldName="date_of_birth"
            updateFieldType="date"
          />
        </UpdateItem>
      </td>
      <td>{animal.nickname}</td>
      <td>
        <UpdateItem>
          <UpdateAnimalForm
            animal={animal}
            updateData={animal.nickname}
            updateFieldName="nickname"
            updateFieldType="text"
          />
        </UpdateItem>
      </td>
      <td>{animal.identification}</td>
      <td>
        <UpdateItem>
          <UpdateAnimalForm
            animal={animal}
            updateData={animal.identification}
            updateFieldName="identification"
            updateFieldType="text"
          />
        </UpdateItem>
      </td>
      <td>
        <DeleteItem
          queryKeyId={id}
          queryKey="company"
          mutationKey="deleteAnimal"
          alertMessage="Животное успешно удалено!"
          url={url}
        />
      </td>
    </tr>
  );
}
