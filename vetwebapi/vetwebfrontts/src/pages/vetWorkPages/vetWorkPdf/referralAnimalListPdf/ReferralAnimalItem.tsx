import { IAnimalInVetwork } from "entities/vetWork/model/vetWorkInterfaces";
import { convertDateString } from "shared/helpers";

interface ReferralAnimalItemProps {
  animal: IAnimalInVetwork;
  index: number;
}

export function ReferralAnimalItem({ animal, index }: ReferralAnimalItemProps) {
  return (
    <tr key={animal.animal_id} className="text-lg">
      <td className="border border-black text-center">{index + 1}</td>
      <td className="border border-black text-center">{animal.species}</td>
      <td className="border border-black text-center">
        {animal.identification !== "нет" && animal.identification + ", "}
        {animal.nickname}
      </td>
      <td className="border border-black text-center">
        {animal.gender}, {convertDateString(animal.date_of_birth).year}
      </td>
      <td className="border border-black text-center"></td>
      <td className="border border-black text-center"></td>
      <td className="border border-black text-center"></td>
      <td className="border border-black text-center"></td>
      <td className="border border-black text-center"></td>
      <td className="border border-black text-center"></td>
    </tr>
  );
}
