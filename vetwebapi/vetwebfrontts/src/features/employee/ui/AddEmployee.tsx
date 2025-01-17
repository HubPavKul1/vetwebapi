import { AddEmployeeForm } from "./AddEmployeeForm";
import { MenuItem } from "shared/ui/MenuItem";
import { GrUserManager } from "react-icons/gr";

export function AddEmployee() {
  return (
    <MenuItem
      title="Добавить работника"
      icon={<GrUserManager color="indigo" fontSize={30} />}
    >
      <AddEmployeeForm />
    </MenuItem>
  );
}
