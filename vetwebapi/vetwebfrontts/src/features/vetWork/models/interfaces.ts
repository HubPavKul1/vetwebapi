import { IVetWorkSchema } from "entities/vetWork";

export interface IVetWorkPageContext {
  setShowAct: CallableFunction;
  setShowAnimalsList: CallableFunction;
  setShowReferral: CallableFunction;
  setAnimals: CallableFunction;
  setCompanyId: CallableFunction;
  setShowReferralAnimalList: CallableFunction;
  setShowAccountingAct: CallableFunction;
  setShowVetWorkFile: CallableFunction;
  fullPageTitle: string;
  imgSrc: string;
  data: IVetWorkSchema;
  companyId: string;
  disease: string;
}

export interface VetWorkData {
  data?: IVetWorkSchema;
  isLoading: boolean;
  isError: boolean;
  error: Error;
}

export interface ICompanyVetWorksIn {
  company_id: number;
  date_start: string;
  date_end: string;
}

export interface ICompanyVetWorksReport {
  company: string;
  company_id: number;
  vetwork_date: string;
  vetwork_id: number;
  work_type: string;
  disease: string;
  animals_count: number;
}
