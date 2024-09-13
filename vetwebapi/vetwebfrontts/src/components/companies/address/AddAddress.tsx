import { AddAddressForm } from "./AddAddressForm";

import { MenuItem } from "widgets/MenuItem";
import { BsBuildingAdd } from "react-icons/bs";

export function AddAddress() {
  return (
    <MenuItem
      title="Добавить адрес"
      icon={<BsBuildingAdd color="blue" fontSize={30} />}
    >
      <AddAddressForm />
    </MenuItem>
  );
}
