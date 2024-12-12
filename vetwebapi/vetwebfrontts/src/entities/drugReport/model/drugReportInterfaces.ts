export interface IDrugReport {
  id: number;
  diseases?: string[];
  drug_name: string;
  accounting_unit: string;
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
