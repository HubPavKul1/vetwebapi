import { IBase } from "./BaseInterface";



export interface IDrugMovementCreate {
    operation_date: string;
    operation?: string;
}


export interface IDrugMovement extends IDrugMovementCreate {
    id: number;
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
}

export interface IDrug extends IDrugCreate {
    id: number;

   
}

export interface IDrugs {
    drugs?: IDrug[];
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