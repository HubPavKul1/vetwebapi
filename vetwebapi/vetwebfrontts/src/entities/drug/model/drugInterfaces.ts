import { IBase } from "shared/index";

export interface IDrugCreate {
  diseases: number[];
  budget_id: number;
  drug_manufacturer_id: number;
  accounting_unit_id: number;
  disposal_method_id: number;
  dosage_id: number;
  name: string;
  image?: string;
  instruction?: string;
}

export interface IDrug extends IDrugCreate {
  id: number;
}

export interface IDrugCard {
  id: number;
  name: string;
  diseases: string[];
  drug_manufacturer: string;
  image?: string;
  instruction?: string;
}

export interface IDrugs {
  drugs?: IDrugCard[];
  total_count: number;
  page: number;
  per_page: number;
}

export interface IBudgets {
  budgets: IBase[];
}

export interface IDrugManufacturers {
  drug_manufacturers: IBase[];
}

export interface IAccountingUnits {
  accounting_units: IBase[];
}

export interface IDrugNames {
  drug_names: IBase[];
}

export interface IDrugDetail {
  id: number;
  name: string;
  diseases: string[];
  budget: string;
  drug_manufacturer: string;
  accounting_unit: string;
  image?: string;
  instruction?: string;
}
