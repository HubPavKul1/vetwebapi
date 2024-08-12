import { useParams } from "react-router-dom";
import { IEmployee } from "../../../../interfaces/EmployeeInterfaces";
import { DeleteItem } from "../../../DeleteItem";

import styles from "./CompanyEmployee.module.scss";
import { companyEmployeeDetailUrl } from "../../../../Urls";

interface CompanyEmployeeProps {
  employee: IEmployee;
}

export function CompanyEmployee({ employee }: CompanyEmployeeProps) {
  const { id } = useParams();
  const companyId = Number(id);
  return (
    <tr key={employee.id} className={styles.tableRow}>
      <td>{employee.position}</td>
      <td>{employee.lastname}</td>
      <td>{employee.firstname}</td>
      <td>{employee.patronymic}</td>
      <td>
        <DeleteItem
          queryKey="company"
          queryKeyId={id}
          url={companyEmployeeDetailUrl(companyId, employee.id)}
          mutationKey="deleteEmployee"
          alertMessage={`${employee.fullname} успешно удален!`}
        />
      </td>
    </tr>
  );
}
