import { IBase } from "./BaseInterface";

export interface IAnimal {
    animal_id?: number
    id?: number;
    animal_group: string;
    species: string;
    usage_type?: string;
    gender: string;
    date_of_birth: string;
    nickname: string;
    identification: string;
    is_active: boolean;
    company_id?: number;
    dosage?: number;
    is_positive?: boolean;

}

export interface IAnimalCreate {
    species_id: number;
    usage_type_id: number;
    gender_id: number;
    date_of_birth: string;
    nickname: string;
    identification: string;
}

export interface IAnimalUpdate {
    date_of_birth?: string;
    nickname?: string;
    identification?: string;
}


export interface ITypesOfFeeding {
    types_of_feeding?: IBase[];
}

export interface IAnimalGroups {
    animal_groups?: IBase[];
}

export interface ISpeciesList {
    species?: IBase[];
}

export interface IGenders {
    genders?: IBase[];
}

export interface IUsageTypes {
    usage_types?: IBase[]; 
}
