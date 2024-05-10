import { IBase } from "./BaseInterface";



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

export interface IVetworkDetail {
    vaccination: IVetworkSchema;
}
