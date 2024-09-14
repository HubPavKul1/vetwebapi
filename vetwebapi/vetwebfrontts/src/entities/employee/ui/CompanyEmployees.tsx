import { Container } from "react-bootstrap";

import { CompanyEmployee } from "./CompanyEmployee";

import { companyEmployeesHeaders } from "data/TableHeaders";
import { IEmployee } from "../model/employeeInterfaces";
import { PageTable } from "shared/index";

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
