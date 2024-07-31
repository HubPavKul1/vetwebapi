import { AddAnimalForm } from "./AddAnimalForm";
import { UploadAnimalForm } from "./UploadAnimalForm";

import { MenuItem } from "../../menuItem";

export function AddAnimal() {
  return (
    <MenuItem title="Добавить животное">
      <AddAnimalForm />
      <UploadAnimalForm />
    </MenuItem>
  );
}
