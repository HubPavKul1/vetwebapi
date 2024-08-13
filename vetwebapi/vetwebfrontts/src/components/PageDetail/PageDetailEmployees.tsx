import { Container } from "react-bootstrap";
import { IEmployee } from "../../interfaces/EmployeeInterfaces";

import { CompanyEmployee } from "../companies/employee/CompanyEmployee";
import { PageTable } from "../PageTable";
import { companyEmployeesHeaders } from "../../TableHeaders";

interface PageDetailEmployeesProps {
  employees: IEmployee[];
}

export function PageDetailEmployees({ employees }: PageDetailEmployeesProps) {
  return (
    <Container className="mb-8 text-center">
      <h5 className="page-detail-title">Работники</h5>
      <PageTable
        reportHeaders={companyEmployeesHeaders}
        reportItems={employees.map((employee) => (
          <CompanyEmployee key={employee.id} employee={employee} />
        ))}
      />
    </Container>
  );
}
