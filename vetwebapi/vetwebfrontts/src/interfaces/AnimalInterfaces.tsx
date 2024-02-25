import { IBase } from "./BaseInterface";

export interface IAnimal {
    id: number;
    animal_group: string;
    species: string;
    usage_type: string;
    gender: string;
    date_of_birth: string;
    nickname: string;
    identification: string;
    is_active: boolean;
}

export interface IAnimalCreate {
    species_id: number;
    usage_type_id: number;
    gender_id: number;
    date_of_birth: string;
    nickname: string;
    identification: string;
}

export interface ITypeOfFeeding extends IBase {}

export interface IAnymalGroup extends IBase {}

export interface ISpecies extends IBase {}

export interface IGender extends IBase {}

export interface IUsageType extends IBase {}

export interface ITypesOfFeeding {
    types_of_feeding?: ITypeOfFeeding[];
}

export interface IAnimalGroups {
    animal_groups?: IAnymalGroup[];
}

export interface ISpeciesList {
    species?: ISpecies[];
}

export interface IGenders {
    genders?: IGender[];
}

export interface IUsageTypes {
    usage_types?: IUsageType[]; 
}
