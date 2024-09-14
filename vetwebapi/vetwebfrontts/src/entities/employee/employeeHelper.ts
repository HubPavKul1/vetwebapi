import { ICompanyCard } from "entities/company/model/companyInterfaces";
import { IEmployee } from "./model/employeeInterfaces";

export const employeeWithCompanyNameString = (
  employee: IEmployee,
  company: ICompanyCard
) => {
  return `${employee.position} ${company.short_name} ${employee.fullname}`;
};

export const employeeString = (employee: IEmployee) => {
  return `${employee.position} ${employee.fullname}`;
};

export const doctorString = (doctor: IEmployee, clinic: string) => {
  return `${doctor.position} ${clinic} ${doctor.fullname}`;
};
