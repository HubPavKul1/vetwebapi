import { IBase } from "./BaseInterface";
import { ICompanyCard } from "./CompanyInterfaces";
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

export interface IVetWorkSchema {
    id: number;
    work_type: string;
    vetwork_date: string;
    diseases: string[];
    is_primary: boolean;
    clinic: string;
    biomaterial?: string;
    biomaterial_fixation?: string;
    biomaterial_package?: string;
    diagnostic_method?: string;
    companies?: ICompanyCard[];
    animals?: IAnimalInVetwork[];
    doctors: IEmployee[];
    drug?: IDrugInMovement;
}

export interface IAnimalInVetworkIn {
    animal_id: number;
    dosage?: number;
    is_positive?: boolean;
}

export interface IAnimalsInVetworkIn {
    animals?: IAnimalInVetworkIn[]
}

export interface IAnimalInVetwork extends IAnimalInVetworkIn {
    animal_group: string;
    company_id: number;
    species: string;
    gender: string;
    date_of_birth: string;
    nickname: string;
    identification: string;
    is_active: boolean;
}
