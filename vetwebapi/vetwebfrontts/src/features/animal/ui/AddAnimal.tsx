import { UploadAnimalForm } from "./UploadAnimalForm";

import { MenuItem } from "shared/ui/MenuItem";
import { LiaHorseHeadSolid } from "react-icons/lia";
import { AddAnimalForm } from "./AddAnimalForm";

export function AddAnimal() {
  return (
    <MenuItem
      title="Добавить животное"
      icon={<LiaHorseHeadSolid color="indigo" fontSize={30} />}
    >
      <AddAnimalForm />
      <UploadAnimalForm />
    </MenuItem>
  );
}
