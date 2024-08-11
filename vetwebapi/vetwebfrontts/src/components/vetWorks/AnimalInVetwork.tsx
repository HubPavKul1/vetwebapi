import { BsFillTrash3Fill } from "react-icons/bs";
import { AppService } from "../../app.service";
import { Col, Row } from "react-bootstrap";
import { IAnimal } from "../../interfaces/AnimalInterfaces";
import { useParams } from "react-router-dom";
import { useDeleteItem } from "../../hooks/useDeleteItem";
import { UpdateAnimalInVetWorkForm } from "./UpdateAnimalInVetWorkForm";
import { UpdateItem } from "../UpdateItem";

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

  console.log("WORKTYPE>>>>>", workType)
  console.log("DESEASE", disease)

  const url = `/api/vetwork/${id}/animals/${animal.animal_id}`;

  const { mutate } = useDeleteItem(
    "delete animal",
    url,
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
      {workType === "вакцинация" ||
        (workType === "диагностика" && disease === "туберкулез" && (
          <>
            <td>{animal.dosage}</td>
            <td>
              <UpdateItem>
                <UpdateAnimalInVetWorkForm
                  url=""
                  animal={animal}
                  workType={workType}
                />
              </UpdateItem>
            </td>
          </>
        ))}

      {workType === "диагностика" &&
        (animal.is_positive ? (
          <td className="text-red-600 font-bold">Положительный!</td>
        ) : (
          <td>Отрицательный</td>
        ))

        }
      
      <td>
        <BsFillTrash3Fill className="delete-icon" onClick={deleteAnimal} />
      </td>
    </tr>
  );
}
