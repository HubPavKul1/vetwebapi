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

export interface ICatalogDrugs {
  catalog_drugs: IDrugCatalogCard[];
  total_count: number;
  page: number;
  per_page: number;
}
