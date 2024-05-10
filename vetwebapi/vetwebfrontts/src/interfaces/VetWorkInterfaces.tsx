import { IBase } from "./BaseInterface";
import { IDrugInMovement } from "./DrugInterfaces";
import { IEmployee } from "./EmployeeInterfaces";



export interface IDiseases {
    diseases?: IBase[];
}


export interface IVetworkCreate {
    vetwork_date: string;
    is_state_assignment: boolean;
    is_primary: boolean;
    clinic_id: number;
    diseases: number[];
    doctors?: number[];
}


export interface IVetwork extends IVetworkCreate{
    id: number;
}



export interface IVetworks {
    vetworks?: IVetwork[];
}

export interface IVetworkSchema {
    id: number;
    work_type: string;
    vetwork_date: string;
    diseases: string[];
    is_primary: boolean;
    clinic: string;
}



export interface IAnimalInVetwork {
    id: number;
    animal_group: string;
    species: string;
    gender: string;
    date_of_birth: string;
    nickname: string;
    identification: string;
    is_active: boolean;
    dosage?: number;
    is_positive?: boolean
}


export interface IVaccinationDetail extends IVetworkSchema{
    animals: IAnimalInVetwork[];
    doctors: IEmployee[];
    drug: IDrugInMovement;
}


