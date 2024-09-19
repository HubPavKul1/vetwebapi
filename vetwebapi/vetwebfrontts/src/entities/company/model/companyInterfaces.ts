import { IAddress } from "entities/address/model/addressInterfaces";
import { IAnimal } from "entities/animal/model/animalInterfaces";
import { IEmployee } from "entities/employee/model/employeeInterfaces";

export interface ICompany {
  id: number;
  full_name: string;
  short_name: string;
}

export interface ICompanyCard extends ICompany {
  address?: IAddress;
  employee?: IEmployee;
}

export interface ICompanies {
  companies: ICompanyCard[];
  total_count: number;
  page: number;
  per_page: number;
}

export interface ICompanyCreate extends Omit<ICompany, "id"> {}

export interface ICompanyDetail extends ICompany {
  address?: IAddress;
  employees?: IEmployee[];
  animals?: IAnimal[];
}

export interface ICompanyInVetWorkIn {
  company_id: number;
}
