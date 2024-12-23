import { IAnimalInVetwork } from "entities/vetWork/model/vetWorkInterfaces";
import { convertDateString } from "shared/helpers";

interface ReferralAnimalItemProps {
  animal: IAnimalInVetwork;
  index: number;
}

export function ReferralAnimalItem({ animal, index }: ReferralAnimalItemProps) {
  return (
    <tr key={animal.animal_id}>
      <td>{index + 1}</td>
      <td>{animal.species}</td>
      <td>
        {animal.identification !== "нет" && animal.identification + ", "}
        {animal.nickname}
      </td>
      <td>{animal.gender}</td>
      <td>{convertDateString(animal.date_of_birth).year}</td>
      <td></td>
      <td></td>
    </tr>
  );
}
