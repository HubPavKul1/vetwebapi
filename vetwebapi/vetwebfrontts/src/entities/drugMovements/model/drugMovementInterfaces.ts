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
  accounting_unit: string;
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
  total_count: number;
  page: number;
  per_page: number;
}
