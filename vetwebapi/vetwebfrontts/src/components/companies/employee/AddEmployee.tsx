import { AddEmployeeForm } from "./AddEmployeeForm";
import { MenuItem } from "../../MenuItem";

export function AddEmployee() {
  return (
    <MenuItem title="Добавить работника">
      <AddEmployeeForm />
    </MenuItem>
  );
}
