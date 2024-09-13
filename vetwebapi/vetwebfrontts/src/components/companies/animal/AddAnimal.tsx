import { AddAnimalForm } from "./AddAnimalForm";
import { UploadAnimalForm } from "./UploadAnimalForm";

import { MenuItem } from "widgets/MenuItem";
import { LiaHorseHeadSolid } from "react-icons/lia";

export function AddAnimal() {
  return (
    <MenuItem
      title="Добавить животное"
      icon={<LiaHorseHeadSolid color="blue" fontSize={30} />}
    >
      <AddAnimalForm />
      <UploadAnimalForm />
    </MenuItem>
  );
}
