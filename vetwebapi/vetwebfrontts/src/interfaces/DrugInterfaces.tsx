import { IBase } from "./BaseInterface";



export interface IDrugMovementCreate {
    operation_date: string;
    operation?: string;
}


export interface IDrugMovement extends IDrugMovementCreate {
    id: number;
}


export interface IDrugInMovement {
    id: number;
    name: string;
    batch: string;
    control: string;
    production_date: string;
    expiration_date: string;
    packs_amount: number;
    units_amount: number;

}



export interface IDrugMovementDetail extends IDrugMovementCreate {
    drugs?: IDrugInMovement[];
}



export interface IDrugMovements {
    drug_movements?: IDrugMovement[]
}

export interface IDrugCreate {
    disease_id: number;
    budget_id: number;
    drug_manufacturer_id: number;
    accounting_unit_id: number;
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
    disease: string;
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
    image?: string;

}



