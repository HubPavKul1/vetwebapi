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
  laboratory_id?: number;
  biomaterial_id?: number;
  biomaterial_package_id?: number;
  biomaterial_fixation_id?: number;
  diagnostic_method_id?: number;
}

export interface IVetwork extends IVetworkCreate {
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
  is_state_assignment: boolean;
  clinic: string;
  biomaterial?: string;
  biomaterial_fixation?: string;
  biomaterial_package?: string;
  diagnostic_method?: string;
  companies?: ICompanyCard[];
  animals?: IAnimalInVetwork[];
  doctors: IEmployee[];
  drug?: IDrugInMovement;
  file_id?: number;
}

export interface IAnimalInVetworkIn {
  animal_id: number;
  dosage?: number;
  is_positive?: boolean;
}

export interface IAnimalsInVetworkIn {
  animals?: IAnimalInVetworkIn[];
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

export interface IAnimalInVetWorkUpdate {
  dosage?: number;
  is_positive?: boolean;
}

export interface IBiomaterials {
  biomaterials: IBase[];
}

export interface IBiomaterialFixations {
  biomaterial_fixations: IBase[];
}

export interface IBiomaterialPackages {
  biomaterial_packages: IBase[];
}

export interface DiagnosticMethods {
  diagnostic_methods: IBase[];
}
