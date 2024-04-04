import { AddEmployeeForm } from "./AddEmployeeForm";
import { CompanyPageProps } from "../company-detail/menu/CompanyPageMenu";

import { MenuItem } from "../../menuItem/MenuItem";


export function AddEmployee({compId}: CompanyPageProps) {

    return (
        <MenuItem title="Добавить работника">
            <AddEmployeeForm compId={compId}/>
        </MenuItem>
    )
}