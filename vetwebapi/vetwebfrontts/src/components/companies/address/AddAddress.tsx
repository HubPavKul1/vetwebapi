import { AddAddressForm } from "./AddAddressForm";

import { MenuItem } from "../../MenuItem";

export function AddAddress() {
  return (
    <MenuItem title="Добавить адрес">
      <AddAddressForm />
    </MenuItem>
  );
}
