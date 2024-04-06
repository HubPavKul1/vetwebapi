export interface IDrugMovementCreate {
    operation_date: string;
    operation: string;
}


export interface IDrugMovement extends IDrugMovementCreate {
    id: number;
}

export interface IDrugMovements {
    drugMovements?: IDrugMovement[]
}