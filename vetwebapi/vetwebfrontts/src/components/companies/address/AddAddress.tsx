import { AddAddressForm } from "./AddAddressForm";

import { MenuItem } from "../../menuItem/MenuItem";



export function AddAddress() {
  
    return (
            <MenuItem title="Добавить адрес">
                <AddAddressForm />       
            </MenuItem>
    )
}