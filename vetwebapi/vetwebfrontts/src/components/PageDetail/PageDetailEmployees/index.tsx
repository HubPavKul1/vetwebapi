import { Col, Container, Row } from "react-bootstrap";
import { IEmployee } from "../../../interfaces/EmployeeInterfaces";

import styles from "./PageDetailEmployees.module.scss";
import { CompanyEmployee } from "../../companies/employee/CompanyEmployee";
import { PageTable } from "../../PageTable";
import { companyEmployeesHeaders } from "../../../TableHeaders";

interface PageDetailEmployeesProps {
  employees: IEmployee[];
}

export function PageDetailEmployees({ employees }: PageDetailEmployeesProps) {
  return (
    <Container className={styles.companyEmployee}>
      <h5>Работники</h5>
      <PageTable reportHeaders={companyEmployeesHeaders}
      reportItems={employees.map((employee) => (<CompanyEmployee key={employee.id} employee={employee}/>))}
      />
    </Container>
  );
}
