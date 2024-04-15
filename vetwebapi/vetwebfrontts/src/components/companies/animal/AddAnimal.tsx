import { AddAnimalForm } from "./AddAnimalForm";
import { UploadAnimalForm } from "./UploadAnimalForm";

import { MenuItem } from "../../menuItem/MenuItem";


export function AddAnimal() {

    return (
        <MenuItem title="Добавить животное">
            <AddAnimalForm />
            <UploadAnimalForm />
        </MenuItem>

    )
}