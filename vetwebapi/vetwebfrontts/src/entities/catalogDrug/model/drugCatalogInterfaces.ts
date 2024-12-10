export interface IDrugCatalogCreate {
  drug_id: number;
  batch: string;
  control: string;
  packing: number;
  production_date: string;
  expiration_date: string;
}

export interface IDrugCatalogCard extends IDrugCatalogCreate {
  id: number;
  name: string;
  diseases: string[];
  image?: string;
}

export interface ICatalogDrugs {
  catalog_drugs: IDrugCatalogCard[];
  total_count: number;
  page: number;
  per_page: number;
}

export interface ICatalogDrugDetail {
  catalog_drug_id: number;
  operation_date: string;
  packs_amount: number;
  units_amount: number;
}

export interface ICatalogDrugDetails {
  catalog_drugs: ICatalogDrugDetail[];
}
