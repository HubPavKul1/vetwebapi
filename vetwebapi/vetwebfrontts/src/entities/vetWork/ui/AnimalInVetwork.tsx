import { useParams } from "react-router-dom";
import { UpdateItem } from "shared/ui/UpdateItem";
import { vetWorkAnimalDetailUrl } from "shared/urls/vetWorkUrls";
import { DeleteItem } from "shared/ui/DeleteItem";
import { IAnimal } from "entities/animal/model/animalInterfaces";
import { convertDateString } from "shared/helpers";
import { UpdateAnimalInVetWorkForm } from "features/vetWork/ui/UpdateAnimalInVetWorkForm";
import { DISEASES, WORKTYPES } from "shared/constants/vetworkConst";

interface AnimalInVetworkProps {
  animal: IAnimal;
  workType: string;
  disease: string;
}

export function AnimalInVetwork({
  animal,
  workType,
  disease,
}: AnimalInVetworkProps) {
  const { id } = useParams();
  const vetWorkId = Number(id);

  console.log("WORKTYPE>>>>>", workType);
  console.log("DESEASE", disease);

  const date_of_birth = convertDateString(animal.date_of_birth).shortDate;

  return (
    <tr key={animal.animal_id}>
      <td>{animal.species}</td>
      <td>{animal.gender}</td>
      <td>{date_of_birth}</td>
      <td>{animal.nickname}</td>
      <td>{animal.identification}</td>
      {workType === WORKTYPES.vaccination && (
        <>
          <td>{animal.dosage}</td>
          <td>
            <UpdateItem>
              <UpdateAnimalInVetWorkForm
                animal={animal}
                updateData={animal.dosage}
                updateFieldName="dosage"
                updateFieldType="number"
                className="form-control"
                updateFieldStep="any"
              />
            </UpdateItem>
          </td>
        </>
      )}

      {workType === WORKTYPES.treatment && (
        <>
          <td>{animal.dosage}</td>
          <td>
            <UpdateItem>
              <UpdateAnimalInVetWorkForm
                animal={animal}
                updateData={animal.dosage}
                updateFieldName="dosage"
                updateFieldType="number"
                className="form-control"
                updateFieldStep="any"
              />
            </UpdateItem>
          </td>
        </>
      )}

      {workType === WORKTYPES.diagnostic && disease === DISEASES.tbc && (
        <>
          <td>{animal.dosage}</td>
          <td>
            <UpdateItem>
              <UpdateAnimalInVetWorkForm
                animal={animal}
                updateData={animal.dosage}
                updateFieldName="dosage"
                updateFieldType="number"
                className="form-control"
                updateFieldStep="any"
              />
            </UpdateItem>
          </td>
        </>
      )}

      {workType === WORKTYPES.diagnostic && (
        <>
          <td>
            {animal.is_positive ? (
              <span className="text-red-700 font-bold">Положительный!</span>
            ) : (
              <span>Отрицательный</span>
            )}
          </td>
          <td>
            <UpdateItem>
              <UpdateAnimalInVetWorkForm
                animal={animal}
                updateFieldName="is_positive"
                updateFieldType="checkbox"
              />
            </UpdateItem>
          </td>
        </>
      )}

      <td>
        <DeleteItem
          queryKeyId={id}
          url={vetWorkAnimalDetailUrl(vetWorkId, animal.animal_id)}
          queryKey="vetwork"
          alertMessage="Животное успешно удалено!"
        />
      </td>
    </tr>
  );
}
