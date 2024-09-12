import { IBase } from "../shared/model/BaseInterface";

export interface IDrugMovementCreate {
  operation_date: string;
  operation?: string;
}

export interface IDrugMovement extends IDrugMovementCreate {
  id: number;
}

export interface IDrugInMovementIn {
  catalog_drug_id: number;
  packs_amount: number;
  units_amount: number;
  administration_method?: string;
  place_of_administration?: string;
}

export interface IDrugInMovement {
  id: number;
  diseases: string[];
  name: string;
  batch: string;
  control: string;
  production_date: string;
  expiration_date: string;
  drug_manufacturer: string;
  packs_amount: number;
  units_amount: number;
  drug_dosage: string;
  administration_method?: string;
  place_of_administration?: string;
  disposal_method: string;
  packing: number;
}

export interface IDrugMovementDetail extends IDrugMovement {
  drugs?: IDrugInMovement[];
}

export interface IDrugMovements {
  drug_movements?: IDrugMovement[];
}

export interface IDrugCreate {
  diseases: number[];
  budget_id: number;
  drug_manufacturer_id: number;
  accounting_unit_id: number;
  disposal_method_id: number;
  dosage_id: number;
  name: string;
  packing: number;
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
  packing: string;
  image?: string;
  instruction?: string;
}

export interface IDrugCatalogCreate {
  drug_id: number;
  batch: string;
  control: string;
  production_date: string;
  expiration_date: string;
}

export interface IDrugCatalogCard extends IDrugCatalogCreate {
  id: number;
  name: string;
  diseases: string[];
  image?: string;
}

export interface IDrugReport {
  id: number;
  diseases?: string[];
  drug_name: string;
  batch: string;
  control: string;
  production_date?: string;
  expiration_date?: string;
  packing: number;
  packs_start?: number;
  units_start?: number;
  packs_received?: number;
  units_received?: number;
  packs_spent?: number;
  units_spent?: number;
  animals_count?: number;
  disposed_units?: number;
  units_spent_disposed?: number;
  packs_rest?: number;
  units_rest?: number;
}

export interface IDrugRest {
  id: number;
  packs_rest?: number;
  units_rest?: number;
}
