import { IAnimalInVetwork } from "entities/vetWork/model/vetWorkInterfaces";
import { AppService } from "shared/services/app.service";

interface AnimalsListPDFItemProps {
  animal: IAnimalInVetwork;
  index: number;
}

export default function AnimalsListPDFItem({
  animal,
  index,
}: AnimalsListPDFItemProps) {
  return (
    <tr key={animal.animal_id}>
      <td>{index + 1}</td>
      <td>{animal.animal_group}</td>
      <td>{animal.nickname}</td>
      <td>{animal.identification}</td>
      <td>{AppService.convertDateString(animal.date_of_birth).year}</td>
      <td></td>
      <td>{animal.dosage && animal.dosage / 1000}</td>
      <td></td>
    </tr>
  );
}
