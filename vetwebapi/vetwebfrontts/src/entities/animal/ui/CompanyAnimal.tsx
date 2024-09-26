import { UpdateItem } from "shared/ui/UpdateItem";
import { DeleteItem } from "shared/ui/DeleteItem";
import { companyAnimalUrl } from "shared/urls/companyUrls";
import { convertDateString } from "shared/helpers";
import { UpdateAnimalForm } from "features/animal/ui/UpdateAnimalForm";
import { IAnimal } from "../model/animalInterfaces";

interface CompanyAnimalProps {
  animal: IAnimal;
  companyId: number;
}

export function CompanyAnimal({ animal, companyId }: CompanyAnimalProps) {
  const id = companyId.toString();

  const date_of_birth = convertDateString(animal.date_of_birth).shortDate;

  return (
    <tr key={animal.id}>
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
          alertMessage="Животное успешно удалено!"
          url={companyAnimalUrl(companyId, animal.id)}
        />
      </td>
    </tr>
  );
}
