import { Container } from "react-bootstrap";

import { CompanyEmployee } from "./CompanyEmployee";

import { IEmployee } from "../model/employeeInterfaces";
import { PageDetailContentWrapper, PageTable } from "shared/index";
import { companyEmployeesHeaders } from "shared/model/tableHeaders";

interface CompanyEmployeesProps {
  employees: IEmployee[];
}

export function CompanyEmployees({ employees }: CompanyEmployeesProps) {
  return (
    <PageDetailContentWrapper title="Работники">
      <PageTable
        tableHeaders={companyEmployeesHeaders}
        tableItems={employees.map((employee) => (
          <CompanyEmployee key={employee.id} employee={employee} />
        ))}
      />
    </PageDetailContentWrapper>
  );
}
