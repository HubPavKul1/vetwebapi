import { Container } from "react-bootstrap";
import { IEmployee } from "interfaces/EmployeeInterfaces";

import { CompanyEmployee } from "./CompanyEmployee";
import { PageTable } from "components/PageTable";
import { companyEmployeesHeaders } from "data/TableHeaders";

interface CompanyEmployeesProps {
  employees: IEmployee[];
}

export function CompanyEmployees({ employees }: CompanyEmployeesProps) {
  return (
    <Container className="mb-8 text-center">
      <h5 className="page-detail-title">Работники</h5>
      <PageTable
        tableHeaders={companyEmployeesHeaders}
        tableItems={employees.map((employee) => (
          <CompanyEmployee key={employee.id} employee={employee} />
        ))}
      />
    </Container>
  );
}
