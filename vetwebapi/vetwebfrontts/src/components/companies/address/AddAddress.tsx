import { AddAddressForm } from "./AddAddressForm";
import { CompanyPageProps } from "../company-detail/menu/CompanyPageMenu";

import { MenuItem } from "../../menuItem/MenuItem";



export function AddAddress({compId}: CompanyPageProps) {
  
    return (
            <MenuItem title="Добавить адрес">
                <AddAddressForm compId={compId}/>
            </MenuItem>
    )
}