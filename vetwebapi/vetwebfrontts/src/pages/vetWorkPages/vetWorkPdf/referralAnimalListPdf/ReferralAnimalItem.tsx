import { IAnimalInVetwork } from "interfaces/VetWorkInterfaces";
import { AppService } from "services/app.service";

interface ReferralAnimalItemProps {
  animal: IAnimalInVetwork;
  index: number;
}

export function ReferralAnimalItem({ animal, index }: ReferralAnimalItemProps) {
  return (
    <tr key={animal.animal_id}>
      <td>{index + 1}</td>
      <td>{animal.animal_group}</td>
      <td>
        {animal.identification !== "нет" && animal.identification + ", "}
        {animal.nickname}
      </td>
      <td>{animal.gender}</td>
      <td>{AppService.convertDateString(animal.date_of_birth).year}</td>
      <td></td>
      <td></td>
    </tr>
  );
}
