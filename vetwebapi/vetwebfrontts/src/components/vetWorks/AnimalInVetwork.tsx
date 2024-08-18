import { BsFillTrash3Fill } from "react-icons/bs";
import { AppService } from "services/app.service";
import { IAnimal } from "interfaces/AnimalInterfaces";
import { useParams } from "react-router-dom";
import { useDeleteItem } from "hooks/useDeleteItem";
import { UpdateAnimalInVetWorkForm } from "./UpdateAnimalInVetWorkForm";
import { UpdateItem } from "components/UpdateItem";
import { vetWorkAnimalDetailUrl } from "urls/vetWorkUrls";

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

  const { mutate } = useDeleteItem(
    "delete animal",
    vetWorkAnimalDetailUrl(vetWorkId, animal.animal_id),
    "vetwork",
    "Животное успешно удалено!",
    id
  );

  const deleteAnimal = () => {
    mutate();
  };
  const date_of_birth = AppService.convertDateString(
    animal.date_of_birth
  ).shortDate;

  return (
    <tr key={animal.animal_id}>
      <td>{animal.species}</td>
      <td>{animal.gender}</td>
      <td>{date_of_birth}</td>
      <td>{animal.nickname}</td>
      <td>{animal.identification}</td>
      {workType === "вакцинация" && (
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
              />
            </UpdateItem>
          </td>
        </>
      )}

      {workType === "диагностика" && disease === "туберкулез" && (
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
              />
            </UpdateItem>
          </td>
        </>
      )}

      {workType === "диагностика" && (
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
        <BsFillTrash3Fill className="delete-icon" onClick={deleteAnimal} />
      </td>
    </tr>
  );
}
