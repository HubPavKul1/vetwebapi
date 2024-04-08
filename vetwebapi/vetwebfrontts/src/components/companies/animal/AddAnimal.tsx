import { AddAnimalForm } from "./AddAnimalForm";
import { UploadAnimalForm } from "./UploadAnimalForm";
import { CompanyPageProps } from "../company-detail/menu/CompanyPageMenu";

import { MenuItem } from "../../menuItem/MenuItem";


export function AddAnimal({compId}: CompanyPageProps) {

    return (
        <MenuItem title="Добавить животное">
            <AddAnimalForm compId={compId}/>
            <UploadAnimalForm compId={compId}/>
        </MenuItem>

    )
}