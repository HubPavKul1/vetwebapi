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
}

export interface IDrug extends IDrugCreate {
    id: number;
    instruction?: string;
    image?: string;

}

export interface IDrugs {
    drugs?: IDrug[];
}