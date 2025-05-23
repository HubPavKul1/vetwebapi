import { AddAddressForm } from "./AddAddressForm";

import { MenuItem } from "shared/ui/MenuItem";
import { BsBuildingAdd } from "react-icons/bs";

export function AddAddress() {
  return (
    <MenuItem
      title="Добавить адрес"
      icon={<BsBuildingAdd color="indigo" fontSize={30} />}
    >
      <AddAddressForm />
    </MenuItem>
  );
}
