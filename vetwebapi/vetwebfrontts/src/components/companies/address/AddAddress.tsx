import { AddAddressForm } from "./AddAddressForm";

import { MenuItem } from "../../menuItem";

export function AddAddress() {
  return (
    <MenuItem title="Добавить адрес">
      <AddAddressForm />
    </MenuItem>
  );
}
