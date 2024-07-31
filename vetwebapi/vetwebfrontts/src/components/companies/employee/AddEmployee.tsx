import { AddEmployeeForm } from "./AddEmployeeForm";
import { MenuItem } from "../../menuItem";

export function AddEmployee() {
  return (
    <MenuItem title="Добавить работника">
      <AddEmployeeForm />
    </MenuItem>
  );
}
