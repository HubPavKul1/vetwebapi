import { AddEmployeeForm } from "./AddEmployeeForm";
import { MenuItem } from "components/MenuItem";
import { GrUserManager } from "react-icons/gr";

export function AddEmployee() {
  return (
    <MenuItem
      title="Добавить работника"
      icon={<GrUserManager color="blue" fontSize={30} />}
    >
      <AddEmployeeForm />
    </MenuItem>
  );
}
